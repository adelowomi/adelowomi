"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";

interface AdminGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { status, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthenticated || !isAdmin) {
      // Redirect will be handled by useAuth hooks
      return;
    }
  }, [status, isAuthenticated, isAdmin]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              You need admin privileges to access this page.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
