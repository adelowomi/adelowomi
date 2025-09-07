"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ExtendedSession, isAdmin } from "@/lib/utils/auth";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin/dashboard",
      });

      if (result?.error) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      if (result?.ok) {
        return { success: true };
      }
      return {
        success: false,
        error: "Login failed. Please try again.",
      };
    } catch (error) {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/admin/auth");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Logout failed",
      };
    }
  };

  const requireAuth = () => {
    if (status === "loading") {
      return null;
    }

    if (!session) {
      router.push("/admin/auth");
      return null;
    }

    return session as ExtendedSession;
  };

  const requireAdmin = () => {
    if (status === "loading") {
      return null;
    }

    const authSession = requireAuth();

    if (!authSession) {
      return null;
    }

    if (!isAdmin(authSession)) {
      router.push("/admin/auth");
      return null;
    }

    return authSession;
  };

  return {
    session: session as ExtendedSession | null,
    status,
    isAuthenticated: !!session,
    isAdmin: isAdmin(session as ExtendedSession),
    login,
    logout,
    requireAuth,
    requireAdmin,
  };
}
