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
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <EventSearch
              buttonText="Create New Event"
              buttonSvg={<PlusIcon />}
              modalContent={<CreateEventForm />}
            />

            {/* View Registrants Button */}
            <a
              href="/admin/events/registrants"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66875 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3312 12.5 10 12.5Z" />
              </svg>
              View All Registrants
            </a>
          </div>
          <EventView />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
