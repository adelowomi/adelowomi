import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("NextAuth authorize called with:", {
          email: credentials?.email,
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          console.log(
            "User found:",
            user ? { id: user.id, email: user.email, role: user.role } : null
          );

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("Authentication successful");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - user:", user, "token:", token);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(
        "Session callback - session before:",
        session,
        "token:",
        token
      );
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      console.log("Session callback - session after:", session);
      return session;
    },
  },
  pages: {
    signIn: "/admin/auth",
    error: "/admin/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Session management utilities
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ExtendedSession {
  user: SessionUser;
  expires: string;
}

// Utility function to validate admin role
export const isAdmin = (session: ExtendedSession | null): boolean => {
  const hasSession = !!session;
  const hasUser = !!session?.user;
  const hasRole = !!session?.user?.role;
  const role = session?.user?.role;

  console.log("Auth Debug Info", {
    hasSession,
    hasUser,
    hasRole,
    role,
    isAdmin: role === "ADMIN",
  });

  // Return false if session is null or user is undefined
  if (!session?.user) {
    console.log("❌ No session or user");
    return false;
  }

  // Return false if role is undefined (session not fully loaded)
  if (!session.user.role) {
    console.log("❌ No role defined - session may still be loading");
    return false;
  }

  const result = session.user.role === "ADMIN";
  console.log(result ? "✅ Admin access granted" : "❌ Not an admin");
  return result;
};

// Utility function to get user from session
export const getSessionUser = (
  session: ExtendedSession | null
): SessionUser | null => {
  return session?.user || null;
};
// Server-side session utilities
import { getServerSession } from "next-auth/next";

export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};

export const requireAuth = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
};

export const requireAdmin = async () => {
  const session = await requireAuth();
  if (!isAdmin(session as ExtendedSession)) {
    throw new Error("Admin access required");
  }
  return session;
};
