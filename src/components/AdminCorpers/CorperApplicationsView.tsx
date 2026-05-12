"use client";

import React, { useState, useEffect, useCallback } from "react";

interface CorperApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceState: string;
  batch: string;
  primaryRole: string;
  otherRole: string | null;
  portfolio: string | null;
  experience: string | null;
  why: string;
  availability: string | null;
  submittedAt: string;
}

const CorperApplicationsView = () => {
  const [applications, setApplications] = useState<CorperApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingApp, setViewingApp] = useState<CorperApplication | null>(null);
  const itemsPerPage = 20;

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      } else {
        setError(data.error || "Failed to fetch applications");
      }
    } catch {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDeleteConfirm = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        setShowDeleteConfirm(null);
      } else {
        alert("Failed to delete application.");
      }
    } catch {
      alert("Failed to delete application. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-primary">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-red-400">Error: {error}</div>
      </div>
    );
  }

  const totalApplications = applications.length;
  const totalPages = Math.ceil(totalApplications / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplications = applications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      {/* View Detail Modal */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary">{viewingApp.fullName}</h3>
              <button
                onClick={() => setViewingApp(null)}
                className="p-1 rounded-lg text-primary hover:bg-[#FCFCFC0D]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <DetailRow label="Email" value={viewingApp.email} />
              <DetailRow label="Phone" value={viewingApp.phone} />
              <DetailRow label="State" value={viewingApp.serviceState} />
              <DetailRow label="NYSC Batch" value={viewingApp.batch} />
              <DetailRow label="Primary Skill" value={viewingApp.primaryRole === "Other" ? viewingApp.otherRole || "Other" : viewingApp.primaryRole} />
              {viewingApp.portfolio && <DetailRow label="Portfolio" value={viewingApp.portfolio} isLink />}
              {viewingApp.experience && <DetailRow label="Experience" value={viewingApp.experience} />}
              <DetailRow label="Why" value={viewingApp.why} />
              {viewingApp.availability && <DetailRow label="Availability" value={viewingApp.availability} />}
              <DetailRow label="Submitted" value={new Date(viewingApp.submittedAt).toLocaleDateString("en-NG", { dateStyle: "medium" })} />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewingApp(null)}
                className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="mb-4 text-xl font-semibold text-primary">Confirm Delete</h3>
            <p className="mb-6 text-secondary">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
                disabled={deletingId === showDeleteConfirm}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(showDeleteConfirm)}
                className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={deletingId === showDeleteConfirm}
              >
                {deletingId === showDeleteConfirm ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-primary">
          {totalApplications} application{totalApplications !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Table Header */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between bg-[#FCFCFC0D]">
            <h1 className="w-[140px] text-[16px] font-archivo font-semibold text-[#fff]">Name</h1>
            <h1 className="w-[160px] text-[16px] font-archivo font-semibold text-[#fff]">Email</h1>
            <h1 className="w-[120px] text-[16px] font-archivo font-semibold text-[#fff]">Phone</h1>
            <h1 className="w-[100px] text-[16px] font-archivo font-semibold text-[#fff]">State</h1>
            <h1 className="w-[100px] text-[16px] font-archivo font-semibold text-[#fff]">Batch</h1>
            <h1 className="w-[140px] text-[16px] font-archivo font-semibold text-[#fff]">Skill</h1>
            <h1 className="w-[100px] text-[16px] font-archivo font-semibold text-[#fff]">Date</h1>
            <h1 className="w-[80px] text-[16px] font-archivo font-semibold text-[#fff]">Actions</h1>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-6 mt-6">
            {currentApplications.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-secondary">No applications yet.</p>
              </div>
            ) : (
              currentApplications.map((app) => (
                <div
                  key={app.id}
                  className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-[#FCFCFC08] transition-colors"
                  onClick={() => setViewingApp(app)}
                >
                  <h1 className="w-[140px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                    {app.fullName}
                  </h1>
                  <h1 className="w-[160px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                    {app.email}
                  </h1>
                  <h1 className="w-[120px] text-[16px] font-archivo font-normal text-[#fff]">
                    {app.phone}
                  </h1>
                  <h1 className="w-[100px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                    {app.serviceState}
                  </h1>
                  <h1 className="w-[100px] text-[16px] font-archivo font-normal text-[#fff]">
                    {app.batch}
                  </h1>
                  <h1 className="w-[140px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                    {app.primaryRole === "Other" ? app.otherRole : app.primaryRole}
                  </h1>
                  <h1 className="w-[100px] text-[16px] font-archivo font-normal text-[#fff]">
                    {new Date(app.submittedAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })}
                  </h1>
                  <div className="w-[80px] flex justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(app.id);
                      }}
                      className="p-2 text-red-400 transition-colors rounded-lg hover:text-red-300 hover:bg-red-400/10"
                      title="Delete application"
                      disabled={deletingId === app.id}
                    >
                      {deletingId === app.id ? (
                        <div className="w-4 h-4 border-2 border-red-400 rounded-full border-t-transparent animate-spin" />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalApplications > 0 && (
        <div className="flex justify-end mt-4 space-x-4">
          <h2 className="text-[#fff] text-[16px] font-archivo font-light">
            {Math.min(itemsPerPage, totalApplications)} out of {totalApplications}
          </h2>
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#732383" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z" fill="#732383" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

function DetailRow({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="flex flex-col gap-1 py-2 border-b border-[#FCFCFC1A] last:border-0">
      <span className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</span>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#732383] hover:underline break-all">
          {value}
        </a>
      ) : (
        <span className="text-primary">{value}</span>
      )}
    </div>
  );
}

export default CorperApplicationsView;
