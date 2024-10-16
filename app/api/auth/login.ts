import { NextApiRequest, NextApiResponse } from "next";

import { setCookie } from "@/lib/cookies";

import axiosInstance from "@/lib/axiosInstance";
import { oneMonthFromNow } from "@/lib/date";
import { fifteenMinutesFromNow } from "@/lib/date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      // Set cookies server-side
      setCookie("accessToken", accessToken, fifteenMinutesFromNow()); // 15 minutes
      setCookie("session", refreshToken, oneMonthFromNow()); // 30 days

      res
        .status(200)
        .json({ user, success: true, message: "Login successful" });
    } catch (error: any) {
      res.status(error.response?.status || 500).json({
        success: false,
        message: error.response?.data?.message || "Login failed",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
