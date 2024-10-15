import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "../../../../lib/axiosInstance";
import jwt from "jsonwebtoken";

export default async function callbackHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //create a cookie with the refreshToken
  if (req.method === "GET") {
    // Handle GET request
    try {
      // Assume you received the Vipps callback parameters here (like auth tokens)
      const { code } = req.query; // for example
      console.log("GET request received, code:", code);

      // Perform your logic here to validate the response
      // After validation, you can redirect to the dashboard

      res.redirect(302, "/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error in GET request:", error);
      res.status(500).json({ success: false, message: "GET request failed" });
    }
  } else if (req.method === "POST") {
    // Handle POST request
    try {
      const { code } = req.body;
      console.log("POST request received, code:", code);

      // Validate the response from Vipps here (authentication, token exchange, etc.)

      res.redirect(302, "/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error in POST request:", error);
      res.status(500).json({ success: false, message: "POST request failed" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
