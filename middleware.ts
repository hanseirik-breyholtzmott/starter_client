import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Define public routes that do not require authentication
  const publicRoutes = ["/about", "/contact", "/coming-soon"]; // Add more public routes as needed
  // Define authentication-related routes
  const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/verification",
    "/forgot-password",
    "/reset-password",
  ];

  const uploadthingRoutes = ["/api/uploadthing"];

  // Get the session cookie
  const sessionCookie = req.cookies.get("session");

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
  const dashboardUrl = new URL("/dashboard", req.url);

  // Redirect logic
  if (sessionCookie) {
    // If authenticated and trying to access an auth route, redirect to the dashboard
    if (isAuthRoute) {
      if (req.nextUrl.pathname !== dashboardUrl.pathname) {
        return NextResponse.redirect(dashboardUrl);
      }
    }
    // Allow access to the dashboard if authenticated
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }
  } else {
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