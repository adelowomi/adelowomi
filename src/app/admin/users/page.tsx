"use client";

import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import AdminUsersView from "@/components/AdminUsers/AdminUsersView";

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-row min-h-screen">
        <div className="w-[280px] lg:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 m-6 lg:m-10 flex flex-col gap-8">
          <AdminNavbar />
          <AdminUsersView />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
