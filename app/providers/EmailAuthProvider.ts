import { AuthProvider } from "./AuthProvider";
import axiosInstance from "../../lib/axiosInstance";
import { setCookie } from "../../lib/cookies";
import { fifteenMinutesFromNow } from "../../lib/date";
import { oneMonthFromNow } from "../../lib/date";

export const emailAuthProvider: AuthProvider = {
  login: async (email?: string, password?: string) => {
    console.log("[EmailAuthProvider] Starting login attempt for email:", email);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("[EmailAuthProvider] Login response:", {
        status: response.status,
        success: response.data.success,
        hasUser: !!response.data.user,
        hasAccessToken: !!response.data.accessToken,
        hasRefreshToken: !!response.data.refreshToken,
      });

      // Check if the response indicates success
      if (!response.data.success) {
        console.log("[EmailAuthProvider] Login failed:", response.data.message);
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          status: response.status,
          message: response.data.message || "Invalid credentials",
          success: false,
        };
      }

      console.log("[EmailAuthProvider] Login successful");
      return {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        status: response.status,
        message: response.data.message || "Login successful",
        success: true,
      };
    } catch (error: any) {
      console.error("[EmailAuthProvider] Login error:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error.message,
      });
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Login failed",
        success: false,
      };
    }
  },

  register: async (
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => {
    console.log(
      "[EmailAuthProvider] Starting registration attempt for email:",
      email
    );
    try {
      const response = await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(
        "[EmailAuthProvider] Raw registration response:",
        response.data
      );

      // Check if the response indicates success
      if (!response.data.success) {
        console.log(
          "[EmailAuthProvider] Registration failed:",
          response.data.message
        );
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          status: response.status,
          message: response.data.message || "Registration failed",
          success: false,
        };
      }

      const result = {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        status: response.status,
        message: response.data.message || "Registration successful",
        success: true,
      };

      console.log("[EmailAuthProvider] Formatted response:", result);
      return result;
    } catch (error: any) {
      console.error("[EmailAuthProvider] Registration error:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error.message,
      });
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Registration failed",
        success: false,
      };
    }
  },
};
