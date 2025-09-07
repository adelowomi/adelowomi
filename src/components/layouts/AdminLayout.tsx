"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { session, status, isAdmin } = useAuth();
  const router = useRouter();

  // Debug logging
  console.log(
    "AdminLayout - Status:",
    status,
    "Session:",
    session,
    "IsAdmin:",
    isAdmin
  );

  // Show loading spinner only if status is loading
  if (status === "loading") {
    console.log("Status is loading, showing spinner");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If no session, redirect to auth
  if (!session) {
    console.log("No session, redirecting to auth");
    router.push("/admin/auth");
    return null;
  }

  // If session exists but not admin, show warning and content (for debugging)
  if (!isAdmin) {
    console.log("Session exists but not admin. Session:", session);
    return (
      <div>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Warning: User is authenticated but not admin. Role:{" "}
          {session?.user?.role || "undefined"}
        </div>
        {children}
      </div>
    );
  }

  // All good, show content
  console.log("All checks passed, showing admin content");
  return <>{children}</>;
}
