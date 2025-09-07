/* eslint-disable react/no-unknown-property */
"use client";

import React, { useEffect } from "react";
import Login from "@/components/Auth/Login";
import { LogoIcon } from "@/icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AuthDebug from "@/components/Debug/AuthDebug";

const page = () => {
  const { session, status, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [session, status, isAdmin, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (session && isAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-[1440px] flex flex-col gap-16 my-10 mx-auto">
      <div>
        <LogoIcon />
      </div>
      <Login />
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8">
          <AuthDebug />
        </div>
      )}
    </div>
  );
};

export default page;
