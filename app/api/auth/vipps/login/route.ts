import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axiosInstance";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl");

  console.log("[Vipps Login] Received redirectUrl:", redirectUrl);

  // Get the Vipps login URL from your backend
  const response = await axiosInstance.get("/auth/vipps/login", {
    params: { redirectUrl }, // Pass redirectUrl to backend
  });

  // Append the redirectUrl to the Vipps auth URL
  const vippsAuthUrl = new URL(response.data.redirectUrl);
  vippsAuthUrl.searchParams.set("state", redirectUrl || "");

  console.log("[Vipps Login] Final URL:", vippsAuthUrl.toString());

  return NextResponse.json({
    redirectUrl: vippsAuthUrl.toString(),
    message: "Redirecting to Vipps login",
  });
}
