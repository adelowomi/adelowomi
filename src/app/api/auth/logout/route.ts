import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/utils/auth";
import {
  createSuccessResponse,
  createUnauthorizedResponse,
  withErrorHandling,
} from "@/lib/utils/response";

export const POST = withErrorHandling(async (req: NextRequest) => {
  // Check if user has an active session
  const session = await getServerSession(authOptions);

  if (!session) {
    return createUnauthorizedResponse("No active session found");
  }

  // Log the logout action for audit purposes
  console.log(
    `User ${session.user.email} (${
      session.user.id
    }) logged out at ${new Date().toISOString()}`
  );

  // Return success response (NextAuth.js signOut method handles actual session cleanup)
  return createSuccessResponse({
    message: "Logout successful",
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
    redirectUrl: "/admin/auth",
  });
});
