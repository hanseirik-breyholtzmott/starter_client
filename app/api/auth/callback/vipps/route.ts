import { NextRequest, NextResponse } from "next/server";
import { setCookie } from "@/lib/cookies";
import { fifteenMinutesFromNow, oneMonthFromNow } from "@/lib/date";

export async function GET(request: NextRequest) {
  console.log("Vipps callback hit:", request.url);
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Invalid tokens" }, { status: 400 });
  }

  const response = NextResponse.redirect(
    new URL("/folkekraft-group", request.url)
  );

  // Set cookies
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: fifteenMinutesFromNow(),
  });

  response.cookies.set("session", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: oneMonthFromNow(),
  });

  return response;
}
