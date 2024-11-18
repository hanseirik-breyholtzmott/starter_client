import { NextRequest, NextResponse } from "next/server";

import { validateSessionCookie } from "./lib/cookies";

export async function middleware(req: NextRequest) {
  // --- IP-based Maintenance Logic ---

  // --- Existing Middleware Logic ---

  // Define public routes that do not require authentication
  const routeConfig = {
    public: [
      "/",
      "/about",
      "/contact",
      "/coming-soon",
      "/bestill",
      "/test",
      "/api/auth/callback/vipps",
      "/folkekraft",
      "/folkekraft-group",
    ],
    auth: [
      "/sign-in",
      "/sign-up",
      "/verification",
      "/forgot-password",
      "/reset-password",
    ],
    api: ["/api/uploadthing"],
  };

  const currentPath = req.nextUrl.pathname;

  // Skip middleware for public routes
  if (routeConfig.public.includes(currentPath)) {
    console.log("Public route detected, skipping middleware:", currentPath);
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get("session");
  const isAuthRoute = routeConfig.auth.includes(currentPath);
  const isApiRoute = currentPath.startsWith("/api/uploadthing");

  console.log({
    method: req.method,
    path: currentPath,
    isAuth: isAuthRoute,
    isApi: isApiRoute,
    hasSession: !!sessionCookie,
  });

  // Handle non-public routes
  if (!sessionCookie) {
    // Allow access to auth routes without session
    if (isAuthRoute || isApiRoute) {
      return NextResponse.next();
    }
    // Redirect to login for protected routes
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Handle authenticated users
  if (isAuthRoute) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL("/folkekraft", req.url));
  }

  return NextResponse.next();
}

// Define the paths where the middleware should be applied
export const config = {
  matcher: [
    // Match all paths excluding static files and Next.js internals
    //"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    //"/(api|trpc)(.*)",
    //"/dashboard/:path*",
    //"/api/auth/callback/vipps",
    "/folkekraft/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",

    // Auth routes
    "/sign-in",
    "/sign-up",
    "/verification",
    "/forgot-password",
    "/reset-password",

    // API routes (except public ones)
    "/api/:path*",
  ],
};
