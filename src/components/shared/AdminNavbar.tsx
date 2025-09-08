"use client";

import React from "react";

import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathname = usePathname();

  const getPageTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    const adminIndex = parts.indexOf("admin");
    if (adminIndex === -1) return "Dashboard";
    const subPaths = parts.slice(adminIndex + 1);
    return subPaths
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" / ");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[#FCFCFC80] text-sm sm:text-[16px] font-archivo font-normal">
        Admin Profile
      </h2>
      <h2 className="text-primary font-archivo font-bold text-xl sm:text-2xl lg:text-3xl">
        {getPageTitle()}
      </h2>
    </div>
  );
};

export default AdminNavbar;
