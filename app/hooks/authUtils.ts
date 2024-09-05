"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Only usable on the server

const secretKey = "0mu4PwuXDjEzbzo3dStSWK5DhsxJB6fp";

// Function to encrypt and generate a token
export async function encrypt(payload: any) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Function to decrypt and verify a token
export async function decrypt(token: any) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Returns the decoded payload if the token is valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Returns null if the token is invalid or expired
  }
}

export async function getServerCookie(cookieName: string) {
  const cookieStore = cookies();
  const session = await cookieStore.get(cookieName);
  const token = session ? session?.value : null;
  return token;
}

// Server-side function to set a cookie
export async function setServerCookie(
  name: string,
  payload: any,
  expiresAt: Date
) {
  cookies().set(name, payload, { expires: expiresAt, httpOnly: true });
}

export async function deleteServerCookie(name: string) {
  cookies().delete(name);
}
