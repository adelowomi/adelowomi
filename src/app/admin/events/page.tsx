"use client";

import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import EventSearch from "@/components/AdminEvents/EventSearch";
import EventView from "@/components/AdminEvents/EventView";
import CreateEventForm from "@/components/AdminEvents/CreateEventForm";
import { PlusIcon } from "@/icons";
import AdminLayout from "@/components/layouts/AdminLayout";

const page = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-[280px] xl:w-[18%] border-b lg:border-b-0 lg:border-r border-[#FCFCFC33] lg:min-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 m-4 sm:m-6 lg:m-10 flex flex-col gap-6 lg:gap-8">
          <AdminNavbar />
          <EventSearch
            buttonText="Create New Event"
            buttonSvg={<PlusIcon />}
            modalContent={<CreateEventForm />}
          />
          <EventView />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
