"use client";

import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import DashboardView from "@/components/Dashboard/DashboardView";
import AdminLayout from "@/components/layouts/AdminLayout";

const page = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col min-h-screen lg:flex-row">
        <div className="w-full lg:w-[280px] xl:w-[18%] border-b lg:border-b-0 lg:border-r border-[#FCFCFC33] lg:min-h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 gap-6 m-4 sm:m-6 lg:m-10 lg:gap-8">
          <AdminNavbar />
          <DashboardView />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
