import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import DasboardView from "@/components/Dashboard/DasboardView";
import AdminLayout from "@/components/layouts/AdminLayout";

const page = () => {
  return (
    <AdminLayout>
      <div className="flex flex-row min-h-screen">
        <div className="w-[280px] lg:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 m-6 lg:m-10 flex flex-col gap-8">
          <AdminNavbar />
          {/* {process.env.NODE_ENV === "development" && <AuthDebug />} */}
          <DasboardView />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
