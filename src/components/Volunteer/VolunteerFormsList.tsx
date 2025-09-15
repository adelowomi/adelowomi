"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import EditVolunteerFormModal from "./EditVolunteerFormModal";
import ErrorNotification from "@/components/ui/ErrorNotification";
import SuccessNotification from "@/components/ui/SuccessNotification";

interface VolunteerForm {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  eventId: string;
  event: {
    id: string;
    title: string;
  };
  questions?: Array<{
    id: string;
    question: string;
    type: string;
    required: boolean;
    options?: string[];
    order: number;
  }>;
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
  const [editingForm, setEditingForm] = useState<VolunteerForm | null>(null);
  const [deletingFormId, setDeletingFormId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleEditForm = async (formId: string) => {
    try {
      const response = await fetch(`/api/admin/volunteer-forms/${formId}`);
      if (response.ok) {
        const formData = await response.json();
        setEditingForm(formData);
      }
    } catch (error) {
      console.error("Error fetching form details:", error);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this volunteer form? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeletingFormId(formId);
    try {
      const response = await fetch(`/api/admin/volunteer-forms/${formId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchVolunteerForms();
        setSuccess("Volunteer form deleted successfully!");
      } else {
        setError("Failed to delete the volunteer form. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setError("Failed to delete the volunteer form. Please try again.");
    } finally {
      setDeletingFormId(null);
    }
  };

  const handleFormUpdated = () => {
    setEditingForm(null);
    fetchVolunteerForms();
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
      <div className="text-center py-8 sm:py-12">
        <div className="text-gray-400 text-base sm:text-lg mb-4">
          No volunteer forms created yet
        </div>
        <div className="text-gray-500 text-sm sm:text-base">
          Create your first volunteer form to get started
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <ErrorNotification
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      {success && (
        <SuccessNotification
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}
      <div className="grid gap-4">
        {volunteerForms.map((form) => (
          <div
            key={form.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {form.title}
                </h3>
                <p className="text-gray-300 mb-2 text-sm sm:text-base">
                  Event: {form.event.title}
                </p>
                {form.description && (
                  <p className="text-gray-400 text-sm mb-3">
                    {form.description}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <span>Submissions: {form._count.submissions}</span>
                  <span>
                    Created: {new Date(form.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs self-start ${
                      form.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleEditForm(form.id)}
                  className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs sm:text-sm hover:bg-blue-500/30 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteForm(form.id)}
                  disabled={deletingFormId === form.id}
                  className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  {deletingFormId === form.id ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => toggleFormStatus(form.id, form.isActive)}
                  className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                    form.isActive
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  }`}
                >
                  {form.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/volunteer/${form.id}`;
                    navigator.clipboard.writeText(url);
                    setSuccess("Volunteer form URL copied to clipboard!");
                  }}
                  className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-xs sm:text-sm hover:bg-purple-500/30 transition-colors"
                >
                  Copy Link
                </button>
                <Link
                  href={`/admin/volunteers/${form.id}/submissions`}
                  className="bg-secondary/20 text-secondary px-3 py-1 rounded text-xs sm:text-sm hover:bg-secondary/30 transition-colors text-center"
                >
                  View Submissions
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingForm && (
        <EditVolunteerFormModal
          form={editingForm}
          onClose={() => setEditingForm(null)}
          onFormUpdated={handleFormUpdated}
        />
      )}
    </>
  );
};

export default VolunteerFormsList;
