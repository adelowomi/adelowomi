"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { status, isAuthenticated } = useAuth();

  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthenticated) {
      // Redirect will be handled by useAuth hooks
      return;
    }
  }, [status, isAuthenticated]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h1>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
