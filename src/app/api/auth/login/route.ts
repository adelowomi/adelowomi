import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/utils/auth";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createUnauthorizedResponse,
  createInternalErrorResponse,
  withErrorHandling,
} from "@/lib/utils/response";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Login request validation schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  // Parse and validate request body
  const body = await req.json();
  const validation = LoginSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return createValidationErrorResponse(errors);
  }

  const { email, password } = validation.data;

  // Check if user exists and validate password
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
    },
  });

  if (!user) {
    return createUnauthorizedResponse("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return createUnauthorizedResponse("Invalid email or password");
  }

  // Check if user already has an active session
  const existingSession = await getServerSession(authOptions);
  if (existingSession) {
    return createSuccessResponse({
      message: "Already authenticated",
      user: {
        id: existingSession.user.id,
        email: existingSession.user.email,
        name: existingSession.user.name,
        role: existingSession.user.role,
      },
      redirectUrl: "/admin/dashboard",
    });
  }

  // Return success response with user data (NextAuth handles session creation)
  return createSuccessResponse({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    redirectUrl: "/admin/dashboard",
  });
});
