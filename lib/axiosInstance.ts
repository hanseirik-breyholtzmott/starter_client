import axios from "axios";
import { getCookieValue } from "@/lib/cookies";

//Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});

let currentToken: string | null = null;

export const setAuthorizationHeader = async (setAccessToken?: string) => {
  currentToken =
    setAccessToken || (await getCookieValue("accessToken")) || null;
};

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!currentToken) {
      currentToken = (await getCookieValue("accessToken")) || null;
    }
    if (currentToken) {
      config.headers["Authorization"] = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
