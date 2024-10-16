import { AuthProvider } from "./AuthProvider";
import axiosInstance from "../../lib/axiosInstance";
import { setCookie } from "../../lib/cookies";
import { fifteenMinutesFromNow } from "../../lib/date";
import { oneMonthFromNow } from "../../lib/date";

export const emailAuthProvider: AuthProvider = {
  login: async (email?: string, password?: string) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return {
      user: response.data.user,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      status: response.status,
      message: response.data.message || "Login successful",
      success: true,
    };
  },

  register: async (
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ) => {
    const response = await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });

    return {
      user: response.data.user,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      status: response.status,
      message: response.data.message || "Registration successful",
      success: true,
    };
  },
};
