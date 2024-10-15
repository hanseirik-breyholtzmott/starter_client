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
      message: response.data.message || "Vipps login successful",
      success: true,
      redirectUrl: response.data.redirectUrl,
    };
  },

  register: async () => {
    const response = await axiosInstance.get("/auth/vipps/login");
    return {
      user: response.data.user,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      status: response.status,
      message: response.data.message || "Login successful",
      success: true,
    };
  },
};
