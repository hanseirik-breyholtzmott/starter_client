"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string, expiresAt: Date) {
  cookies().set(name, value, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    expires: expiresAt, // Sets the expiration date of the cookie
    sameSite: "lax", // Controls where the cookie can be sent from {strict, lax, none}
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
