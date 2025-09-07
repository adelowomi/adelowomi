"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface VolunteerForm {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  event: {
    id: string;
    title: string;
  };
  _count: {
    submissions: number;
  };
}

interface VolunteerFormsListProps {
  refreshTrigger: number;
}

const VolunteerFormsList: React.FC<VolunteerFormsListProps> = ({
  refreshTrigger,
}) => {
  const [volunteerForms, setVolunteerForms] = useState<VolunteerForm[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteerForms = async () => {
    try {
      const response = await fetch("/api/admin/volunteer-forms");
      if (response.ok) {
        const data = await response.json();
        setVolunteerForms(data);
      }
    } catch (error) {
      console.error("Error fetching volunteer forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteerForms();
  }, [refreshTrigger]);

  const toggleFormStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/volunteer-forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchVolunteerForms();
      }
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading volunteer forms...</div>
      </div>
    );
  }

  if (volunteerForms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">
          No volunteer forms created yet
        </div>
        <div className="text-gray-500">
          Create your first volunteer form to get started
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {volunteerForms.map((form) => (
        <div
          key={form.id}
          className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                {form.title}
              </h3>
              <p className="text-gray-300 mb-2">Event: {form.event.title}</p>
              {form.description && (
                <p className="text-gray-400 text-sm mb-3">{form.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Submissions: {form._count.submissions}</span>
                <span>
                  Created: {new Date(form.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    form.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {form.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFormStatus(form.id, form.isActive)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  form.isActive
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                }`}
              >
                {form.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/volunteer/${form.id}`;
                  navigator.clipboard.writeText(url);
                  alert("Volunteer form URL copied to clipboard!");
                }}
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm hover:bg-blue-500/30 transition-colors mr-2"
              >
                Copy Link
              </button>
              <Link
                href={`/admin/volunteers/${form.id}/submissions`}
                className="bg-secondary/20 text-secondary px-3 py-1 rounded text-sm hover:bg-secondary/30 transition-colors"
              >
                View Submissions
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerFormsList;
