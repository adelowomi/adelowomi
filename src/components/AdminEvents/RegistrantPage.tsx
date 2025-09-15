"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdminRegistrations } from "@/hooks/useAdmin";
import { formatPhoneNumber } from "@/lib/validations/registration.validation";

const RegistrantPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const itemsPerPage = 20;

  const { registrations, loading, error, deleteRegistration, refetch } =
    useAdminRegistrations();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-primary text-lg">Loading registrations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    );
  }

  const totalRegistrations = registrations.length;
  const totalPages = Math.ceil(totalRegistrations / itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-primary text-xl font-semibold mb-4">
              Confirm Delete
            </h3>
            <p className="text-secondary mb-6">
              Are you sure you want to delete this registration? This action
              cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
                disabled={deletingId === showDeleteConfirm}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={deletingId === showDeleteConfirm}
              >
                {deletingId === showDeleteConfirm ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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
        {registrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No registrations found.</p>
          </div>
        ) : (
          registrations.map((registration) => (
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
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Delete registration"
                  disabled={deletingId === registration.id}
                >
                  {deletingId === registration.id ? (
                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
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

      {registrations.length > 0 && (
        <div className="flex justify-end space-x-4 mt-4">
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
