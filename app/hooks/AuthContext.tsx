"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

//Nextjs
import { useRouter, usePathname } from "next/navigation";

//Auth Providers
import AuthProviderFactory from "@/app/providers/AuthProviderFactory";
import { AuthProvider } from "@/app/providers/AuthProvider";

//Utils
import {
  setCookie,
  deleteCookie,
  getCookieValue,
  setAuthCookies,
} from "@/lib/cookies";
import { fifteenMinutesFromNow, oneMonthFromNow } from "@/lib/date";
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

//Shadcn
import { useToast } from "@/components/ui/use-toast";

//Loading
import LoadingPage from "@/app/loading";

// Enhanced interfaces with more robust typing
interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  redirectUrl?: string;
  status: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: {
    name: string;
    permissions: string[];
  }[];
  permissions: string[];
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
  const pathname = usePathname();

  const getProviderInstance = (providerType: string): AuthProvider => {
    return AuthProviderFactory(providerType);
  };

  const cleanup = async () => {
    console.log("[AuthContext] Starting cleanup");
    setUser(null);
    setIsAuthenticated(false);
    setAccessToken(null);
    setAuthorizationHeader("");
    await Promise.all([deleteCookie("session"), deleteCookie("accessToken")]);
    console.log("[AuthContext] Cleanup completed");
  };

  const checkAuth = async () => {
    try {
      console.log("[AuthContext] Starting checkAuth");

      // Check if we're already authenticated with a user and accessToken
      if (isAuthenticated && user && accessToken) {
        console.log("[AuthContext] Already authenticated, skipping check");
        setLoading(false);
        return;
      }

      const [sessionCookie, accessTokenCookie] = await Promise.all([
        getCookieValue("session"),
        getCookieValue("accessToken"),
      ]);

      console.log("[AuthContext] Cookies found:", {
        hasSession: !!sessionCookie,
        hasAccessToken: !!accessTokenCookie,
      });

      // Check if current path is public first
      const publicPaths = [
        "/",
        "/about",
        "/contact",
        "/coming-soon",
        "/bestill",
      ];
      const currentPath = window.location.pathname;

      // For public paths, don't check authentication
      if (publicPaths.includes(currentPath)) {
        console.log(
          "[AuthContext] Current path is public, skipping auth check"
        );
        setLoading(false);
        return;
      }

      // If we have both cookies and no auth state, try to validate
      if (sessionCookie && accessTokenCookie && !isAuthenticated) {
        console.log("[AuthContext] Found cookies, validating...");
        try {
          // Try using the access token first
          setAuthorizationHeader(accessTokenCookie);
          const { data } = await axiosInstance.get("/auth/validate");

          if (data.success) {
            console.log("[AuthContext] Access token validation successful");
            setUser(data.user);
            setIsAuthenticated(true);
            setAccessToken(accessTokenCookie);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log(
            "[AuthContext] Access token validation failed, trying refresh"
          );
          try {
            const { data } = await axiosInstance.post("/auth/refresh", {
              refreshToken: sessionCookie,
            });

            if (data.success) {
              console.log("[AuthContext] Refresh successful");
              setUser(data.user);
              setIsAuthenticated(true);
              setAccessToken(data.accessToken);
              setAuthorizationHeader(data.accessToken);

              await setAuthCookies(
                data.accessToken,
                sessionCookie // Keep existing session cookie
              );
              setLoading(false);
              return;
            }
          } catch (refreshError) {
            console.log("[AuthContext] Refresh failed:", refreshError);
            await cleanup();
          }
        }
      }

      if (!sessionCookie || !accessTokenCookie) {
        console.log("[AuthContext] Missing required cookies");
        await cleanup();
      }
    } catch (error) {
      console.error("[AuthContext] Authentication check failed:", error);
      await cleanup();
    } finally {
      setLoading(false);
    }
  };

  // Check auth on mount and when path changes
  useEffect(() => {
    console.log(
      "[AuthContext] Running checkAuth effect for pathname:",
      pathname
    );
    checkAuth();
  }, [pathname]);

  // Add a periodic check effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAuthenticated) {
      interval = setInterval(checkAuth, 2 * 60 * 1000); // Check every 2 minutes
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated]);

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
      const publicPaths = ["/folkekraft"];
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
      setUser(response.user as User);
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
      let finalRedirectUrl = "/folkekraft"; // Default fallback
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
    console.log(
      "[AuthContext] Starting signUp process for provider:",
      provider
    );
    setLoading(true);
    try {
      const authProvider = getProviderInstance(provider);
      console.log(
        "[AuthContext] Got auth provider, making registration request"
      );

      const response = await authProvider.register(
        firstName,
        lastName,
        email,
        password
      );

      console.log("[AuthContext] Registration response received:", {
        success: response.success,
        status: response.status,
        hasUser: !!response.user,
        hasAccessToken: !!response.accessToken,
        hasRefreshToken: !!response.refreshToken,
      });

      // For SSO providers
      if (response.redirectUrl) {
        console.log(
          "[AuthContext] SSO redirect detected:",
          response.redirectUrl
        );
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirectUrl");
        if (redirectUrl) {
          localStorage.setItem("postLoginRedirect", redirectUrl);
        }
        router.push(response.redirectUrl);
        return response;
      }

      if (response.success) {
        console.log(
          "[AuthContext] Registration successful, setting up session",
          {
            hasAccessToken: !!response.accessToken,
            hasRefreshToken: !!response.refreshToken,
            user: response.user,
          }
        );

        try {
          setUser(response.user as User);
          setIsAuthenticated(true);
          setAccessToken(response.accessToken);
          setAuthorizationHeader(response.accessToken as string);

          console.log("[AuthContext] Attempting to set cookies");
          const cookieResult = await setAuthCookies(
            response.accessToken as string,
            response.refreshToken as string
          );

          if (!cookieResult.success) {
            console.error(
              "[AuthContext] Cookie setting failed:",
              cookieResult.error
            );
            throw new Error("Failed to set cookies");
          }

          console.log("[AuthContext] Cookies set successfully");

          // Handle redirect logic
          let finalRedirectUrl = "/folkekraft";
          const storedRedirect = localStorage.getItem("postLoginRedirect");
          if (storedRedirect) {
            finalRedirectUrl = storedRedirect;
            localStorage.removeItem("postLoginRedirect");
          }

          console.log("[AuthContext] Redirecting to:", finalRedirectUrl);
          router.push(finalRedirectUrl);

          return response;
        } catch (error) {
          console.error(
            "[AuthContext] Error during post-registration setup:",
            error
          );
          toast({
            title: "Warning",
            description:
              "Account created but session setup failed. Please try logging in.",
            variant: "destructive",
          });
          return response;
        }
      }

      if (!response.success) {
        console.log("[AuthContext] Registration failed:", response.message);
        toast({
          title: "Registration Failed",
          description:
            response.message || "An error occurred during registration",
          variant: "destructive",
        });
        return response;
      }

      console.log("[AuthContext] Registration successful, setting up session");
      setUser(response.user as User);
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

      // Handle redirect logic
      let finalRedirectUrl = "/folkekraft";
      const storedRedirect = localStorage.getItem("postLoginRedirect");
      if (storedRedirect) {
        finalRedirectUrl = storedRedirect;
        localStorage.removeItem("postLoginRedirect");
      }

      console.log("[AuthContext] Redirecting to:", finalRedirectUrl);
      router.push(finalRedirectUrl);

      console.log("[AuthContext] Returning successful response");
      return response;
    } catch (error: any) {
      console.error("[AuthContext] Sign up error:", {
        message: error.message,
        stack: error.stack,
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return {
        success: false,
        message: "An unexpected error occurred",
        status: 500,
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    } finally {
      setLoading(false);
      console.log("[AuthContext] Sign up process completed");
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

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        console.log("[AuthContext] Attempting to refresh access token");
        const response = await axiosInstance.post("/auth/refresh");
        console.log("[AuthContext] Refresh token response:", {
          success: !!response.data.accessToken,
          accessToken: response.data.accessToken ? "exists" : "missing",
          hasUser: !!response.data.user,
          status: response.data.status,
        });

        if (response.data.success) {
          // Update all relevant state with the refresh response
          setAccessToken(response.data.accessToken);
          setAuthorizationHeader(response.data.accessToken);
          setUser(response.data.user as User);

          // Update cookies with new tokens
          await Promise.all([
            setCookie(
              "accessToken",
              response.data.accessToken,
              fifteenMinutesFromNow()
            ),
            setCookie("session", response.data.refreshToken, oneMonthFromNow()),
          ]);

          console.log(
            "[AuthContext] Successfully refreshed tokens and updated user data"
          );
        } else {
          throw new Error("Refresh token response was not successful");
        }
      } catch (error) {
        console.log("[AuthContext] Failed to refresh access token:", error);
        signOut();
      }
    };

    const axiosInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("[AuthContext] Intercepted error response:", {
          status: error.response?.status,
          isRetry: !!originalRequest._retry,
          path: originalRequest.url,
        });

        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log("[AuthContext] Attempting to retry with token refresh");
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
