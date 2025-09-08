"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";

interface AdminLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export default function AdminLayout({
  children,
  showNavigation = true,
}: AdminLayoutProps) {
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
      <div className="min-h-screen flex items-center justify-center bg-black">
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
      <div className="min-h-screen bg-black text-white p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Warning: User is authenticated but not admin. Role:{" "}
          {session?.user?.role || "undefined"}
        </div>
        {children}
      </div>
    );
  }

  // All good, show content with navigation if requested
  console.log("All checks passed, showing admin content");

  if (!showNavigation) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[280px] xl:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 sm:p-6 lg:p-10 flex flex-col gap-6 lg:gap-8 flex-1">
          <AdminNavbar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
