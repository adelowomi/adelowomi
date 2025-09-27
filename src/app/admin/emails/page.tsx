"use client";

import React, { useEffect, useState } from "react";
import EmailManagement from "@/components/Email/EmailManagement";
import { useAuth } from "@/hooks/useAuth";

interface CustomSessionData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  permissions: {
    isAdmin: boolean;
    canAccessAdmin: boolean;
  };
}

const AdminEmailsPage: React.FC = () => {
  const { session, status, isAuthenticated, isAdmin } = useAuth();
  const [customSession, setCustomSession] = useState<CustomSessionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch custom session data
  useEffect(() => {
    const fetchCustomSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setCustomSession(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch custom session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomSession();
  }, []);

  // Debug logging
  console.log("Email Page Debug:", {
    status,
    isAuthenticated,
    isAdmin,
    session,
    customSession,
    userRole: session?.user?.role
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check admin access using custom session
  if (!customSession?.permissions?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You need admin privileges to access this page.
          </p>
          <div className="p-4 mt-4 text-sm text-gray-300 bg-gray-800 rounded">
            <p>Debug Info:</p>
            <p>NextAuth Status: {status}</p>
            <p>NextAuth Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
            <p>NextAuth Admin: {isAdmin ? 'Yes' : 'No'}</p>
            <p>Custom Session Admin: {customSession?.permissions?.isAdmin ? 'Yes' : 'No'}</p>
            <p>User Role: {customSession?.user?.role || session?.user?.role || 'Not set'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-primary">
            Email Management
          </h1>
          <p className="text-gray-400">
            Send bulk emails to event attendees and volunteers, or send individual emails
          </p>
          {/* Debug info */}
          <div className="p-4 mt-4 text-sm text-gray-300 bg-gray-800 rounded">
            <p>Debug Info:</p>
            <p>NextAuth Status: {status}</p>
            <p>NextAuth Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
            <p>NextAuth Admin: {isAdmin ? 'Yes' : 'No'}</p>
            <p>Custom Session Admin: {customSession?.permissions?.isAdmin ? 'Yes' : 'No'}</p>
            <p>User Role: {customSession?.user?.role || session?.user?.role || 'Not set'}</p>
          </div>
        </div>

        <EmailManagement />
      </div>
    </div>
  );
};

export default AdminEmailsPage;
