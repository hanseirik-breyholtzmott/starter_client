"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { verifyToken, AccessTokenPayload } from "./jwt";

export async function setCookie(name: string, value: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
    expires: expiresAt, // Sets the expiration date of the cookie
    sameSite: "lax", // Controls where the cookie can be sent from {strict, lax, none}
    path: "/", // The path on the server in which the cookie will be sent to
  });
}

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}

export async function deleteCookie(name: string) {
  console.log("Deleting cookie:", name);
  return (await cookies()).delete("name");
}

export async function checkCookieExists(name: string) {
  const cookieStore = await cookies();
  return cookieStore.has(name);
}

export async function getAllCookies() {
  return (await cookies()).getAll();
}

export async function getCookieValue(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

interface JwtPayload {
  userId: string;
  sessionId: string;
  exp: number;
  iat: number;
}

export async function validateSessionCookie(sessionCookie: string) {
  console.log("Validating session cookie:", sessionCookie);

  if (!sessionCookie) {
    console.log("No session cookie provided");
    return null;
  }

  try {
    const { payload, error } = verifyToken<AccessTokenPayload>(sessionCookie);

    if (error) {
      console.log("Session cookie validation failed:", error);
      return null;
    }
    return payload;
  } catch (error) {
    console.error("Session cookie validation failed:", error);
    return null;
  }
}

export async function getUserId(): Promise<string | null> {
  // Retrieve the session cookie value
  const accessTokenCookie = await getCookieValue("accessToken");

  if (!accessTokenCookie) {
    console.log("No session cookie found");
    return null;
  }

  const decodedToken = jwt.decode(accessTokenCookie);

  // Extract the userId from the decoded token
  const { userId } = decodedToken as AccessTokenPayload;

  if (!userId) {
    console.log("No userId found in the session");
    return null;
  }

  return userId;
}
