import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession, isAdmin } from "@/lib/utils/auth";
import {
  createSuccessResponse,
  createUnauthorizedResponse,
  withErrorHandling,
} from "@/lib/utils/response";

export const GET = withErrorHandling(async (req: NextRequest) => {
  // Get current session
  const session = await getServerSession(authOptions);

  if (!session) {
    return createUnauthorizedResponse("No active session");
  }

  // Calculate session expiry information
  const now = new Date();
  const expiresAt = new Date(session.expires);
  const isExpired = now >= expiresAt;
  const timeUntilExpiry = expiresAt.getTime() - now.getTime();
  const minutesUntilExpiry = Math.floor(timeUntilExpiry / (1000 * 60));

  // Return comprehensive session information
  return createSuccessResponse({
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
    },
    session: {
      expires: session.expires,
      isExpired,
      minutesUntilExpiry: isExpired ? 0 : minutesUntilExpiry,
    },
    permissions: {
      isAdmin: isAdmin(session as ExtendedSession),
      canAccessAdmin: isAdmin(session as ExtendedSession),
    },
  });
});
