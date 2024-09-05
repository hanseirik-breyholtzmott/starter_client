"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

//Utils
import {
  setServerCookie,
  getServerCookie,
  deleteServerCookie,
} from "./authUtils";
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

//Shadcn
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// User interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// AuthContext interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  const handleApiError = useCallback(
    (error: any, message: string) => {
      console.error(message, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    },
    [toast]
  ); // Memoize handleApiError and add dependencies

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const session = await getServerCookie("session");

      if (session) {
        const response = await axiosInstance.post("/api/refresh-token", {
          refreshToken: session,
          withCredentials: true,
        });

        const { accessToken, user, success } = response.data;

        if (!success) {
          deleteServerCookie("session");
          setUser(null);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
          return router.push("/sign-in");
        }

        if (accessToken && user) {
          setAccessToken(accessToken);
          setUser(user);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      handleApiError(error, "Error checking authentication");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [handleApiError, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      // API call to server for login
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      const { refreshToken, accessToken, user, message, success } =
        response.data;
      console.log(response.data);

      if (!success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: (
            <Link href={"/sign-up"}>
              <ToastAction altText="Sign up">Sign up</ToastAction>
            </Link>
          ),
        });
        return;
      }

      const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      setServerCookie("session", refreshToken, expiresAt);

      setAccessToken(accessToken);
      setUser(user);

      return router.push("/dashboard");
    } catch (error) {
      handleApiError(error, "Login Failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      // API call to server for registration
      const response = await axiosInstance.post("/api/register", {
        firstName,
        lastName,
        email,
        password,
      });

      const {
        refreshToken,
        accessToken,
        user,
        message,
        verificationToken,
        success,
      } = response.data;

      // Check if email is already taken
      if (response.data.emailTaken) {
        toast({
          title: "Uh oh! Looks like you already have a user.",
          description: "Try to login with your email.",
          action: (
            <Link href={"/sign-in"}>
              <ToastAction altText="Sign-in">Sign In</ToastAction>
            </Link>
          ),
        });
        return;
      }

      // Handle other error messages
      if (message !== "Success") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>, //Add an action here
        });
        return;
      }

      // Set the user and tokens in context/state
      setUser(user);
      setAccessToken(accessToken);

      toast({
        title: "Congrats! You are a new user.",
        description: "You will be redirected to verify your email.",
      });

      // Redirect to verification page
      setTimeout(() => {
        router.push("/verification");
      }, 1000);
    } catch (error) {
      handleApiError(error, "Registration failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    deleteServerCookie("session");
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    router.push("/sign-in");
  };

  const verifyEmail = async (token: string) => {
    try {
      // API call to server for verifyEmail
      const response = await axiosInstance.post("/api/verifyEmail", {
        verificationToken: token,
      });

      const { success, message, refreshToken, accessToken } = response.data;

      if (!success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      setAccessToken(accessToken);
      await setServerCookie("session", refreshToken, expiresAt);

      router.push("/dashboard");
    } catch (error) {
      handleApiError(error, "Error verifying email");
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      //api call to reset password
      const response = await axiosInstance.post("/api/forgotpassword", {
        email,
      });

      const { success, message } = response.data;

      if (!success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      toast({
        title: "Check your email to reset your password",
        description: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      //api call to reset password
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api/resetpassword/" + token,
        {
          password: password,
        }
      );

      const { success, message } = response.data;

      if (!success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      toast({
        title: "You have changed your password",
        description: message,
        action: (
          <Link href={"/sign-in"}>
            <ToastAction altText="Sign in">Sign in</ToastAction>
          </Link>
        ),
      });

      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthWrapper");
  }
  return context;
}
