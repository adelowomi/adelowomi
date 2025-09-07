import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession, isAdmin } from "./auth";
import { NextRequest, NextResponse } from "next/server";

// Session validation helper for API routes
export async function validateSession(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      },
      { status: 401 }
    );
  }

  return { session: session as ExtendedSession, response: null };
}

// Admin session validation helper for API routes
export async function validateAdminSession(req: NextRequest) {
  const { session, response } = await validateSession(req);

  if (response) {
    return { session: null, response };
  }

  if (!isAdmin(session)) {
    return {
      session: null,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Admin access required",
          },
        },
        { status: 403 }
      ),
    };
  }

  return { session, response: null };
}

// Client-side session validation hook
export function useAuthGuard() {
  return {
    requireAuth: (session: ExtendedSession | null) => {
      if (!session) {
        throw new Error("Authentication required");
      }
      return session;
    },
    requireAdmin: (session: ExtendedSession | null) => {
      if (!session) {
        throw new Error("Authentication required");
      }
      if (!isAdmin(session)) {
        throw new Error("Admin access required");
      }
      return session;
    },
  };
}

// Utility to check if user is authenticated on server
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session;
}

// Utility to check if user is admin on server
export async function isUserAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return isAdmin(session as ExtendedSession);
}
