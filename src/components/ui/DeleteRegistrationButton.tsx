"use client";

import React, { useState } from "react";
import { useRegistration } from "@/hooks/useRegistration";

interface DeleteRegistrationButtonProps {
  registrationId: string;
  registrationName?: string;
  onDeleted?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button";
}

const DeleteRegistrationButton: React.FC<DeleteRegistrationButtonProps> = ({
  registrationId,
  registrationName,
  onDeleted,
  className = "",
  size = "md",
  variant = "icon",
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteRegistration, loading } = useRegistration();

  const handleDelete = async () => {
    try {
      await deleteRegistration(registrationId);
      setShowConfirm(false);
      onDeleted?.();
    } catch (error) {
      console.error("Failed to delete registration:", error);
      alert("Failed to delete registration. Please try again.");
    }
  };

  const sizeClasses = {
    sm: "p-1 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  if (variant === "button") {
    return (
      <>
        <button
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className={`
            ${sizeClasses[size]}
            bg-red-600 hover:bg-red-700 text-white rounded-lg 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
        >
          {loading ? "Deleting..." : "Delete Registration"}
        </button>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-primary text-xl font-semibold mb-4">
                Confirm Delete
              </h3>
              <p className="text-secondary mb-6">
                Are you sure you want to delete{" "}
                {registrationName ? `${registrationName}'s` : "this"}{" "}
                registration? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className={`
          ${sizeClasses[size]}
          text-red-400 hover:text-red-300 hover:bg-red-400/10 
          rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        title="Delete registration"
      >
        {loading ? (
          <div
            className={`${iconSizes[size]} border-2 border-red-400 border-t-transparent rounded-full animate-spin`}
          ></div>
        ) : (
          <svg
            className={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        )}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] border border-[#FCFCFC33] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-primary text-xl font-semibold mb-4">
              Confirm Delete
            </h3>
            <p className="text-secondary mb-6">
              Are you sure you want to delete{" "}
              {registrationName ? `${registrationName}'s` : "this"}{" "}
              registration? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-[#FCFCFC33] rounded-lg text-primary hover:bg-[#FCFCFC0D] transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteRegistrationButton;
