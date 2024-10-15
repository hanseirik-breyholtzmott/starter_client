"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

//Nextjs
import { useRouter } from "next/navigation";

//Auth Providers
import AuthProviderFactory from "@/app/providers/AuthProviderFactory";
import { AuthProvider } from "@/app/providers/AuthProvider";

//Utils
import { setCookie, deleteCookie } from "@/lib/cookies";
import { fifteenMinutesFromNow, oneMonthFromNow } from "@/lib/date";
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

//Shadcn
import { useToast } from "@/components/ui/use-toast";

//Loading
import LoadingPage from "@/app/loading";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (
    provider: string,
    email?: string,
    password?: string
  ) => Promise<void>;
  signUp: (
    provider: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (code: string, email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, code: string) => Promise<void>;
  accessToken: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  const router = useRouter();

  const getProviderInstance = (providerType: string): AuthProvider => {
    return AuthProviderFactory(providerType);
  };

  // Check if the user is authenticated when the app loads
  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/refresh");

        const { user, accessToken, refreshToken, status, message, success } =
          response.data;

        // Check user authentication status

        if (success) {
          // Set user and authentication state
          setUser(user);
          setIsAuthenticated(true);

          // Store the accessToken in state
          setAccessToken(accessToken);

          // Set the accessToken in the Authorization header
          setAuthorizationHeader(accessToken);

          //create a cookie with the refreshToken
          await setCookie(
            "accessToken",
            accessToken as string,
            fifteenMinutesFromNow()
          );
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setAccessToken(null);
          setAuthorizationHeader("");
          await deleteCookie("session");
          await deleteCookie("accessToken");
          return;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (
    provider: string,
    email?: string,
    password?: string
  ) => {
    setLoading(true);
    try {
      const authProvider = getProviderInstance(provider);

      const response = await authProvider.login(email, password);

      const { user, accessToken, refreshToken, message, success } = response;

      console.log(response.redirectUrl);

      if (response.redirectUrl) {
        console.log("Redirecting to:", response.redirectUrl);
        router.push(response.redirectUrl);
        return;
      }

      if (success) {
        setUser(response.user);
        setIsAuthenticated(true);
        setAccessToken(response.accessToken);
        setAuthorizationHeader(response.accessToken as string);

        //create a cookie with the refreshToken
        await setCookie(
          "accessToken",
          response.accessToken as string,
          fifteenMinutesFromNow()
        );

        await setCookie(
          "session",
          response.accessToken as string,
          oneMonthFromNow()
        );

        console.log("Redirect initiated");
        //Redirect to dashboard or home page

        // Redirect to the dashboard
        router.push("/folkekraft");
        console.log("Refreshing page");
        // Force a full page reload to trigger middleware
        window.location.reload();
        return;
      } else {
        // Handle login failure
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    provider: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => {
    setLoading(true);
    try {
      const authProvider = getProviderInstance(provider);

      const { user, accessToken, message, success, refreshToken } =
        await authProvider.register(firstName, lastName, email, password);

      setUser(user);
      setIsAuthenticated(true);
      setAccessToken(accessToken);
      setAuthorizationHeader(accessToken as string);

      //create a cookie with the refreshToken
      await setCookie(
        "accessToken",
        accessToken as string,
        fifteenMinutesFromNow()
      );

      await setCookie("session", refreshToken as string, oneMonthFromNow());
      //Redirect to login page
      return router.push("/folkekraft");
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/logout");

      setUser(null);
      setIsAuthenticated(false);
      setAccessToken(null);
      setAuthorizationHeader("");
      await deleteCookie("session");
      await deleteCookie("accessToken");

      return router.push("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code: string, email: string) => {
    try {
      const response = await axiosInstance.post("/email/verify/" + code, {
        email: email,
      });
    } catch (error) {
      console.error("Verify email failed:", error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axiosInstance.post("/auth/password/forgot", {
        email: email,
      });

      toast({
        title: "Email sent",
        description: "Please check your email for a password reset link.",
      });
      return;
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  };

  const resetPassword = async (password: string, code: string) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        password: password,
        token: code,
      });

      toast({
        title: "Password reset",
        description: "Your password has been reset.",
      });

      return router.push("/sign-in");
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  /*
    User Makes a Request: 
    A request is made using the axiosInstance with the current accessToken.

    401 Unauthorized Error: 
    If the accessToken has expired, the server responds with a 401 Unauthorized error.

    Refresh the Token: 
    The interceptor detects the 401 Unauthorized error and triggers the refreshAccessToken function 
    to request a new accessToken from the /api/auth/refresh endpoint using the refreshToken.

    Retry the Request: 
    Once the new accessToken is obtained, the original request that failed is retried automatically 
    with the updated Authorization header.

    Logout on Failure: 
    If refreshing the token fails (e.g., if the refreshToken has expired), the user is logged out, 
    and no retry is attempted.
*/
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axiosInstance.post("/api/auth/refresh");
        setAccessToken(response.data.accessToken); // Store new access token
        setAuthorizationHeader(response.data.accessToken); // Set Authorization header with new token
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        signOut(); // Log out if refreshing fails
      }
    };

    const axiosInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshAccessToken(); // Refresh token before retrying the request
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(axiosInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        verifyEmail,
        forgotPassword,
        resetPassword,
        loading,
        accessToken,
      }}
    >
      {!loading ? children : <LoadingPage />}
    </AuthContext.Provider>
  );
}
