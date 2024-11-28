import { AuthProvider } from "./AuthProvider";

import axiosInstance from "../../lib/axiosInstance";

export const vippsAuthProvider: AuthProvider = {
  login: async () => {
    // Get stored redirect URL if it exists
    const redirectUrl =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("redirectUrl")
        : null;

    console.log("[VippsAuthProvider] Redirect URL:", redirectUrl);

    const response = await axiosInstance.get("/auth/vipps/login", {
      params: {
        redirectUrl: redirectUrl,
      },
    });

    // The backend should have already included the redirectUrl in the state parameter
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      status: response.status,
      message: response.data.message || "Redirecting to Vipps login",
      success: true,
      redirectUrl: response.data.redirectUrl,
    };
  },

  register: async () => {
    return vippsAuthProvider.login();
  },
};
