import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET_KEY;

export async function encrypt(payload: any) {
  if (!secretKey) throw new Error("Secret key is not defined");
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function decrypt(token: string) {
  try {
    if (!secretKey) throw new Error("Secret key is not defined");
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Returns the decoded payload if the token is valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Returns null if the token is invalid or expired
  }
}
