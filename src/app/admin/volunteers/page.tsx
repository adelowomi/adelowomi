"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import VolunteerFormsList from "@/components/Volunteer/VolunteerFormsList";
import CreateVolunteerFormModal from "@/components/Volunteer/CreateVolunteerFormModal";

const VolunteersPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormCreated = () => {
    setShowCreateModal(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="flex flex-row min-h-screen">
        <div className="w-[280px] lg:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 m-6 lg:m-10 flex flex-col gap-8">
          <AdminNavbar />
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Volunteer Forms</h1>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Create Volunteer Form
              </button>
            </div>
            <VolunteerFormsList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
      {showCreateModal && (
        <CreateVolunteerFormModal
          onClose={() => setShowCreateModal(false)}
          onFormCreated={handleFormCreated}
        />
      )}
    </AdminLayout>
  );
};

export default VolunteersPage;
