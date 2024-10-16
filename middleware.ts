import { NextRequest, NextResponse } from "next/server";

import { validateSessionCookie } from "./lib/cookies";

export async function middleware(req: NextRequest) {
  // --- IP-based Maintenance Logic ---

  const maintenanceUrl = new URL("/maintenance", req.url);

  // --- Maintenance Mode Logic ---
  const maintenanceMode = true; // Check if maintenance mode is enabled
  const allowedIp = process.env.ALLOWED_IP; // Get the allowed IP from environment variable
  const clientIp = req.headers.get("x-forwarded-for") || req.ip; // Get the client's IP address

  // Debugging: log the client's IP and maintenance mode
  console.log("Client IP:", clientIp);
  console.log("Maintenance Mode:", maintenanceMode);

  // If maintenance mode is enabled and the current request is not from the allowed IP
  if (maintenanceMode && clientIp !== allowedIp) {
    // Redirect to maintenance page for all routes except the maintenance page itself
    if (req.nextUrl.pathname !== "/maintenance") {
      return NextResponse.redirect(maintenanceUrl);
    }
    // Allow access to the maintenance page
    return NextResponse.next();
  }

  // --- Existing Middleware Logic ---

  // Define public routes that do not require authentication
  const publicRoutes = ["/about", "/contact", "/coming-soon", "/bestill"]; // Add more public routes as needed
  // Define authentication-related routes
  const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/verification",
    "/forgot-password",
    "/reset-password",
  ];

  const uploadthingRoutes = ["/api/uploadthing"];

  // Check if the current request path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the current request path is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the current request path is an Uploadthing route
  const isUploadthingRoute = uploadthingRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Define the login page URL
  const loginUrl = new URL("/sign-in", req.url);

  // Define the dashboard URL
  const dashboardUrl = new URL("/folkekraft", req.url);

  // Redirect logic
  const sessionCookie = req.cookies.get("session");
  const isSessionPresent = !!sessionCookie;
  console.log("Session present:", isSessionPresent);

  // Redirect logic
  if (isSessionPresent) {
    console.log("Session is present, user should be authenticated");
    // If authenticated and trying to access an auth route, redirect to the dashboard
    if (isAuthRoute) {
      console.log("Authenticated user on auth route, redirecting to dashboard");
      if (req.nextUrl.pathname !== dashboardUrl.pathname) {
        return NextResponse.redirect(dashboardUrl);
      }
    }
    // Allow access to the dashboard if authenticated
    if (req.nextUrl.pathname.startsWith("/folkekraft")) {
      console.log("Allowing access to folkekraft");
      return NextResponse.next();
    }
  } else {
    console.log("No session present, user is not authenticated");
    // If not authenticated and trying to access a protected route, redirect to login
    if (!isPublicRoute && !isAuthRoute && !isUploadthingRoute) {
      if (req.nextUrl.pathname !== loginUrl.pathname) {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Allow the request to proceed for public routes and other cases
  return NextResponse.next();
}

// Define the paths where the middleware should be applied
export const config = {
  matcher: [
    // Match all paths excluding static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Custom pages where authentication is required
    "/dashboard/:path*",
  ],
};
