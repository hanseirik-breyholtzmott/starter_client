import { NextRequest, NextResponse } from "next/server";
import { fifteenMinutesFromNow, oneMonthFromNow } from "@/lib/date";
import { validateStateToken } from "../../../../lib/security";

export async function GET(request: NextRequest) {
  console.log("Vipps callback hit:", request.url);
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const state = searchParams.get("state");

  console.log("Received state:", state);

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Invalid tokens" }, { status: 400 });
  }

  // Validate the state token and get the redirect URL
  const { isValid, redirectUrl } = state
    ? validateStateToken(state)
    : { isValid: false, redirectUrl: null };

  // Validate the redirect URL
  const validPaths = ["/folkekraft", "/folkekraft/invest"];
  const finalRedirectUrl =
    isValid &&
    redirectUrl &&
    (validPaths.includes(redirectUrl) || redirectUrl.startsWith("/folkekraft/"))
      ? redirectUrl
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
