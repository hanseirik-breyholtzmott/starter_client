"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

//Nextjs
import { useRouter } from "next/navigation";

//Auth Providers
import AuthProviderFactory from "@/app/providers/AuthProviderFactory";
import { AuthProvider } from "@/app/providers/AuthProvider";

//Utils
import { setCookie, deleteCookie, getCookieValue } from "@/lib/cookies";
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
  signIn: (provider: string, email?: string, password?: string) => Promise<any>;
  signUp: (
    provider: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => Promise<any>;
  signOut: () => Promise<void>;
  verifyEmail: (code: string, email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, code: string) => Promise<void>;
  accessToken: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  verifyEmail: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  accessToken: null,
  loading: true,
});

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

  const checkAuth = async () => {
    try {
      // Check if current path is public first
      const publicPaths = [
        "/",
        "/about",
        "/contact",
        "/coming-soon",
        "/bestill",
        "/test",
      ];
      const currentPath = window.location.pathname;

      // For public paths, don't check authentication
      if (publicPaths.includes(currentPath)) {
        setLoading(false);
        return;
      }

      const [sessionCookie, accessTokenCookie] = await Promise.all([
        getCookieValue("session"),
        getCookieValue("accessToken"),
      ]);

      if (!sessionCookie) {
        console.log("No session cookie found");
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
        setAuthorizationHeader("");
        await deleteCookie("accessToken");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.post("/auth/refresh", {
          refreshToken: sessionCookie,
        });

        const { user, accessToken, success } = data;

        if (success) {
          setUser(user);
          setIsAuthenticated(true);
          setAccessToken(accessToken);
          setAuthorizationHeader(accessToken);

          await setCookie(
            "accessToken",
            accessToken as string,
            fifteenMinutesFromNow()
          );
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.log("Token refresh failed:");
        // Clean up on authentication failure
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
        setAuthorizationHeader("");
        await Promise.all([
          deleteCookie("session"),
          deleteCookie("accessToken"),
        ]);
      }

      // Check user authentication status
    } catch (error) {
      console.log("Authentication check failed");
      // Clean up cookies on authentication failure
      await Promise.all([deleteCookie("session"), deleteCookie("accessToken")]);
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
      setAuthorizationHeader("");
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (
    provider: string,
    email?: string,
    password?: string
  ) => {
    console.log(
      "[AuthContext] Starting signIn process for provider:",
      provider
    );
    setLoading(true);
    try {
      const authProvider = getProviderInstance(provider);
      console.log("[AuthContext] Got auth provider, making login request");

      // Store current path if it's a public route before initiating login
      const currentPath = window.location.pathname;
      const publicPaths = ["/folkekraft", "/folkekraft-group"];
      if (publicPaths.includes(currentPath)) {
        localStorage.setItem("postLoginRedirect", currentPath);
      }

      const response = await authProvider.login(email, password);
      console.log("[AuthContext] Login response:", {
        success: response.success,
        hasUser: !!response.user,
        hasAccessToken: !!response.accessToken,
        status: response.status,
      });

      // Handle SSO providers first
      if (response.redirectUrl) {
        console.log(
          "[AuthContext] SSO redirect detected:",
          response.redirectUrl
        );
        router.push(response.redirectUrl);
        return response;
      }

      // Check for failed login before proceeding
      if (!response.success) {
        console.log("[AuthContext] Login failed:", response.message);
        return response;
      }

      console.log("[AuthContext] Login successful, setting up session");
      setUser(response.user);
      setIsAuthenticated(true);
      setAccessToken(response.accessToken);
      setAuthorizationHeader(response.accessToken as string);

      console.log("[AuthContext] Setting cookies");
      await Promise.all([
        setCookie(
          "accessToken",
          response.accessToken as string,
          fifteenMinutesFromNow()
        ),
        setCookie(
          "session",
          response.refreshToken as string,
          oneMonthFromNow()
        ),
      ]);

      // Handle redirect
      let finalRedirectUrl = "/folkekraft-group"; // Default fallback
      const storedRedirect = localStorage.getItem("postLoginRedirect");
      if (
        storedRedirect &&
        (publicPaths.includes(storedRedirect) ||
          storedRedirect.startsWith("/folkekraft/"))
      ) {
        finalRedirectUrl = storedRedirect;
        localStorage.removeItem("postLoginRedirect");
      }
      console.log("[AuthContext] Redirecting to:", finalRedirectUrl);
      router.push(finalRedirectUrl);

      return response;
    } catch (error: any) {
      console.error("[AuthContext] Sign in error:", {
        message: error.message,
        stack: error.stack,
      });
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
        user: null,
        accessToken: null,
        refreshToken: null,
        status: 500,
      };
    } finally {
      setLoading(false);
      console.log("[AuthContext] Sign in process completed");
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
      const response = await authProvider.register(
        firstName,
        lastName,
        email,
        password
      );

      const { user, accessToken, message, success, refreshToken } = response;

      // For SSO providers
      if (response.redirectUrl) {
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirectUrl");
        if (redirectUrl) {
          localStorage.setItem("postLoginRedirect", redirectUrl);
        }
        router.push(response.redirectUrl);
        return;
      }

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        setAccessToken(response.accessToken);
        setAuthorizationHeader(response.accessToken as string);

        await Promise.all([
          setCookie(
            "accessToken",
            response.accessToken as string,
            fifteenMinutesFromNow()
          ),
          setCookie(
            "session",
            response.refreshToken as string,
            oneMonthFromNow()
          ),
        ]);

        // Handle redirect logic
        let finalRedirectUrl = "/folkekraft-group";
        const storedRedirect = localStorage.getItem("postLoginRedirect");
        if (storedRedirect) {
          finalRedirectUrl = storedRedirect;
          localStorage.removeItem("postLoginRedirect");
        }

        router.push(finalRedirectUrl);
        return;
      }
      toast({
        title: "Registration Failed",
        description:
          response.message || "An error occurred during registration",
        variant: "destructive",
      });
    } catch (error) {
      console.log("Sign in failed:");
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = useCallback(async () => {
    const cleanup = async () => {
      setUser(null);
      setIsAuthenticated(false);
      setAccessToken(null);
      setAuthorizationHeader("");
      await Promise.all([deleteCookie("session"), deleteCookie("accessToken")]);
    };

    setLoading(true);
    try {
      if (accessToken) {
        setAuthorizationHeader(accessToken);
        await axiosInstance.get("/auth/logout");
      }

      await cleanup();
      router.push("/sign-in");
    } catch {
      console.log("Sign out failed");
      // Clean up anyway on failure
      await cleanup();
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  }, [accessToken, router]);

  const verifyEmail = async (code: string, email: string) => {
    try {
      const response = await axiosInstance.post("/email/verify/" + code, {
        email: email,
      });
    } catch (error) {
      console.log("Verify email failed:");
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
      console.log("Forgot password failed:", error);
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
      console.log("Reset password failed:");
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
        setAccessToken(response.data.accessToken);
        setAuthorizationHeader(response.data.accessToken);
      } catch (error) {
        console.log("Failed to refresh access token:");
        signOut();
      }
    };

    const axiosInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshAccessToken();
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(axiosInterceptor);
    };
  }, [accessToken, signOut]);

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
