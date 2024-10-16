"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { verifyToken, AccessTokenPayload } from "./jwt";

export async function setCookie(name: string, value: string, expiresAt: Date) {
  cookies().set(name, value, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
    expires: expiresAt, // Sets the expiration date of the cookie
    sameSite: "none", // Controls where the cookie can be sent from {strict, lax, none}
    path: "/", // The path on the server in which the cookie will be sent to
  });
}

export async function getCookie(name: string) {
  return cookies().get(name);
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function checkCookieExists(name: string) {
  return cookies().has(name);
}

export async function getAllCookies() {
  return cookies().getAll();
}

export async function getCookieValue(name: string) {
  return cookies().get(name)?.value;
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

  // Validate the session cookie
  //const decodedToken = await validateSessionCookie(accessTokenCookie);

  /*if (!decodedToken) {
    console.log("Session cookie validation failed");
    return null;
  }*/

  const decodedToken = jwt.decode(accessTokenCookie);

  // Extract the userId from the decoded token
  const { userId } = decodedToken as AccessTokenPayload;

  if (!userId) {
    console.log("No userId found in the session");
    return null;
  }

  return userId;
}
