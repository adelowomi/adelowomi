"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { LogoIcon } from "@/icons";
import Button from "@/components/ui/Button";

const AdminHeader = () => {
  const { session, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-surface border-b border-[#8F630233] px-6 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LogoIcon />
          <div className="text-primary">
            <h1 className="text-xl font-besley font-semibold">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-primary text-sm">
            Welcome, <span className="font-medium">{session?.user?.name}</span>
          </div>
          <Button
            text="Logout"
            onClick={handleLogout}
            variant="outline"
            size="sm"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
