import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Allow access to auth page without authentication
      if (req.nextUrl.pathname === "/admin/auth") {
        return NextResponse.next();
      }

      // Check if user is authenticated and has admin role
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/admin/auth", req.url));
      }

      if (req.nextauth.token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin/auth", req.url));
      }
    }

    // Check if user is trying to access admin API routes
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      if (!req.nextauth.token || req.nextauth.token.role !== "ADMIN") {
        return NextResponse.json(
          {
            success: false,
            error: { code: "UNAUTHORIZED", message: "Admin access required" },
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all requests to pass through to the middleware function
        // The actual authorization logic is handled in the middleware function above
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
