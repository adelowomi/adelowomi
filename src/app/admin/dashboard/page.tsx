import React from "react";
import DashboardView from "@/components/Dashboard/DashboardView";
import AdminLayout from "@/components/layouts/AdminLayout";

const page = () => {
  return (
    <AdminLayout>
      <DashboardView />
    </AdminLayout>
  );
};

export default page;
