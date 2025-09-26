"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdminRegistrations, useAdminEvents } from "@/hooks/useAdmin";
import { formatPhoneNumber } from "@/lib/validations/registration.validation";

const RegistrantPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [exportFormat, setExportFormat] = useState<"csv" | "xlsx" | "json">("csv");
  const [isExporting, setIsExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const itemsPerPage = 20;

  const { registrations, loading, error, deleteRegistration, refetch, exportRegistrations } =
    useAdminRegistrations();
  const { events } = useAdminEvents();

  // Memoize the refetch call to prevent unnecessary re-renders
  const fetchCurrentPage = useCallback(() => {
    refetch({ page: currentPage, limit: itemsPerPage });
  }, [currentPage, itemsPerPage, refetch]);

  useEffect(() => {
    fetchCurrentPage();
  }, [fetchCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (registrationId: string) => {
    setShowDeleteConfirm(registrationId);
  };

  const handleDeleteConfirm = async (registrationId: string) => {
    try {
      setDeletingId(registrationId);
      await deleteRegistration(registrationId);
      setShowDeleteConfirm(null);
      // No need to refetch - deleteRegistration already updates local state
    } catch (error) {
      console.error("Failed to delete registration:", error);
      alert("Failed to delete registration. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null);
  };

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const handleExportCancel = () => {
    setShowExportModal(false);
  };

  const handleExportConfirm = async () => {
    if (selectedEventId === "all") {
      alert("Please select a specific event to export registrations.");
      return;
    }

    try {
      setIsExporting(true);
      const result = await exportRegistrations(selectedEventId, exportFormat);

      // Create and download the file
      const blob = new Blob([JSON.stringify(result.data, null, 2)], {
        type: exportFormat === "json" ? "application/json" : "text/csv",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const eventTitle = events.find(e => e.id === selectedEventId)?.title || "Event";
      const timestamp = new Date().toISOString().split('T')[0];
      link.download = `${eventTitle}_registrations_${timestamp}.${exportFormat}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setShowExportModal(false);
      alert("Export completed successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Filter registrations by selected event
  const filteredRegistrations = selectedEventId === "all"
    ? registrations
    : registrations.filter(reg => reg.eventId === selectedEventId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-primary">Loading registrations...</div>
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

  const totalRegistrations = filteredRegistrations.length;
  const totalPages = Math.ceil(totalRegistrations / itemsPerPage);

  // Get current page registrations from filtered results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRegistrations = filteredRegistrations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="mb-4 text-xl font-semibold text-primary">
              Export Registrations
            </h3>

            <div className="mb-6 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Select Event
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#FCFCFC33] rounded-lg text-primary focus:outline-none focus:border-[#732383]"
                >
                  <option value="all">All Events</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as "csv" | "xlsx" | "json")}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#FCFCFC33] rounded-lg text-primary focus:outline-none focus:border-[#732383]"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleExportCancel}
                className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
                disabled={isExporting}
              >
                Cancel
              </button>
              <button
                onClick={handleExportConfirm}
                className="px-4 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={isExporting || selectedEventId === "all"}
              >
                {isExporting ? "Exporting..." : "Export"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="mb-4 text-xl font-semibold text-primary">
              Confirm Delete
            </h3>
            <p className="mb-6 text-secondary">
              Are you sure you want to delete this registration? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
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

      {/* Filter and Export Controls */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div>
            <label className="block mb-2 text-sm font-medium text-primary">
              Filter by Event
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
              className="px-3 py-2 bg-[#0A0A0A] border border-[#FCFCFC33] rounded-lg text-primary focus:outline-none focus:border-[#732383] min-w-[200px]"
            >
              <option value="all">All Events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-primary">
            Showing {totalRegistrations} registration{totalRegistrations !== 1 ? 's' : ''}
          </div>
        </div>

        <button
          onClick={handleExportClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
          Export Registrations
        </button>
      </div>

      <div className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between bg-[#FCFCFC0D]">
        <h1 className="w-[120px] text-[16px] font-archivo font-semibold text-[#fff]">
          Name
        </h1>
        <h1 className="w-[150px] text-[16px] font-archivo font-semibold text-[#fff]">
          Email
        </h1>
        <h1 className="w-[120px] text-[16px] font-archivo font-semibold text-[#fff]">
          Phone
        </h1>
        <h1 className="w-[100px] text-[16px] font-archivo font-semibold text-[#fff]">
          Status
        </h1>
        <h1 className="w-[120px] text-[16px] font-archivo font-semibold text-[#fff]">
          Course
        </h1>
        <h1 className="w-[120px] text-[16px] font-archivo font-semibold text-[#fff]">
          Area of Interest
        </h1>
        <h1 className="w-[100px] text-[16px] font-archivo font-semibold text-[#fff]">
          Event
        </h1>
        <h1 className="w-[80px] text-[16px] font-archivo font-semibold text-[#fff]">
          Actions
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {currentRegistrations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-secondary">
              {selectedEventId === "all" ? "No registrations found." : "No registrations found for selected event."}
            </p>
          </div>
        ) : (
          currentRegistrations.map((registration) => (
            <div
              key={registration.id}
              className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between"
            >
              <h1 className="w-[120px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                {registration.firstName} {registration.lastName}
              </h1>
              <h1 className="w-[150px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                {registration.email}
              </h1>
              <h1 className="w-[120px] text-[16px] font-archivo font-normal text-[#fff]">
                {formatPhoneNumber(registration.phone)}
              </h1>
              <h1 className="w-[100px] text-[16px] font-archivo font-normal text-[#fff]">
                {registration.status}
              </h1>
              <h1 className="w-[120px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                {registration.course || "N/A"}
              </h1>
              <h1 className="w-[120px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                {registration.areaOfInterest}
              </h1>
              <h1 className="w-[100px] text-[16px] font-archivo font-normal text-[#fff] truncate">
                {registration.event?.title || "N/A"}
              </h1>
              <div className="w-[80px] flex justify-center">
                <button
                  onClick={() => handleDeleteClick(registration.id)}
                  className="p-2 text-red-400 transition-colors rounded-lg hover:text-red-300 hover:bg-red-400/10"
                  title="Delete registration"
                  disabled={deletingId === registration.id}
                >
                  {deletingId === registration.id ? (
                    <div className="w-4 h-4 border-2 border-red-400 rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalRegistrations > 0 && (
        <div className="flex justify-end mt-4 space-x-4">
          <h2 className="text-[#fff] text-[16px] font-archivo font-light">
            {Math.min(itemsPerPage, totalRegistrations)} out of{" "}
            {totalRegistrations}
          </h2>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                fill="#732383"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
                fill="#732383"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrantPage;
