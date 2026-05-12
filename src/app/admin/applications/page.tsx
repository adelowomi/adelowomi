import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import CorperApplicationsView from "@/components/AdminCorpers/CorperApplicationsView";

const ApplicationsPage = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[18%] border-r border-[#FCFCFC33] h-[873px]">
        <Sidebar />
      </div>
      <div className="flex-grow m-10 flex flex-col gap-12">
        <AdminNavbar />
        <CorperApplicationsView />
      </div>
    </div>
  );
};

export default ApplicationsPage;
