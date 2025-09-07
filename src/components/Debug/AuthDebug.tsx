"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";

export default function AuthDebug() {
  const { session, status, isAuthenticated, isAdmin } = useAuth();
  const { data: rawSession, status: rawStatus } = useSession();

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-black text-sm">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Raw Status:</strong> {rawStatus}
        </p>
        <p>
          <strong>Is Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Admin:</strong> {isAdmin ? "Yes" : "No"}
        </p>
        <p>
          <strong>Session:</strong>
        </p>
        <pre className="bg-gray-200 p-2 rounded text-xs overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
        <p>
          <strong>Raw Session:</strong>
        </p>
        <pre className="bg-gray-200 p-2 rounded text-xs overflow-auto">
          {JSON.stringify(rawSession, null, 2)}
        </pre>
      </div>
    </div>
  );
}
