"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BulkEmailForm from "./BulkEmailForm";
import IndividualEmailForm from "./IndividualEmailForm";

const EmailManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bulk" | "individual">("bulk");
  const searchParams = useSearchParams();
  const preSelectedEventId = searchParams.get("eventId");

  useEffect(() => {
    // If there's a pre-selected event, default to bulk email tab
    if (preSelectedEventId) {
      setActiveTab("bulk");
    }
  }, [preSelectedEventId]);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex p-1 space-x-1 bg-gray-800 rounded-lg">
        <button
          onClick={() => setActiveTab("bulk")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "bulk"
              ? "bg-[#732383] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          Bulk Email
        </button>
        <button
          onClick={() => setActiveTab("individual")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "individual"
              ? "bg-[#732383] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          Individual Email
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-lg bg-surface">
        {activeTab === "bulk" && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-primary">
              Send Bulk Email
            </h2>
            <p className="mb-6 text-gray-400">
              Send emails to all attendees, volunteers, or both for a specific event.
            </p>
            <BulkEmailForm />
          </div>
        )}

        {activeTab === "individual" && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-primary">
              Send Individual Email
            </h2>
            <p className="mb-6 text-gray-400">
              Send a personalized email to a specific recipient.
            </p>
            <IndividualEmailForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailManagement;
