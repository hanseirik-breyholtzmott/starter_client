import { NextRequest, NextResponse } from "next/server";
import { fifteenMinutesFromNow, oneMonthFromNow } from "@/lib/date";

export async function GET(request: NextRequest) {
  console.log("Vipps callback hit:", request.url);
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const state = searchParams.get("state");

  console.log("Received state (redirect URL):", state);

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Invalid tokens" }, { status: 400 });
  }

  // Validate the redirect URL
  const validPaths = ["/folkekraft", "/folkekraft-group", "/folkekraft/invest"];
  const finalRedirectUrl =
    state && (validPaths.includes(state) || state.startsWith("/folkekraft/"))
      ? state
      : "/folkekraft";

  console.log("Final redirect URL:", finalRedirectUrl);

  // Create the response with the redirect URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.url;
  const response = NextResponse.redirect(new URL(finalRedirectUrl, baseUrl));

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
