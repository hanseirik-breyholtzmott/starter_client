import { AuthProvider } from "./AuthProvider";

import axiosInstance from "../../lib/axiosInstance";

export const vippsAuthProvider: AuthProvider = {
  login: async () => {
    const response = await axiosInstance.get("/auth/vipps/login");
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
    // For Vipps, login and register are typically the same process
    return vippsAuthProvider.login();
  },
};
