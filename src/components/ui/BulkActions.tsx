"use client";

import React, { useState } from "react";

interface BulkActionsProps {
  totalItems: number;
  type: "image" | "video";
  onBulkDownload: () => void;
  className?: string;
}

const BulkActions = ({
  totalItems,
  type,
  onBulkDownload,
  className = "",
}: BulkActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBulkDownload = async () => {
    if (totalItems > 50) {
      const confirmed = window.confirm(
        `You're about to download ${totalItems} ${type}s. This may take a while and use significant bandwidth. Continue?`
      );
      if (!confirmed) return;
    }

    setIsDownloading(true);
    try {
      await onBulkDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  if (totalItems < 5) return null; // Only show for collections with 5+ items

  return (
    <div
      className={`bg-surface rounded-xl border border-[#FCFCFC1A] p-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-primary font-semibold font-besley mb-1">
            Bulk Actions
          </h3>
          <p className="text-secondary text-sm font-archivo">
            Manage all {totalItems} {type}s at once
          </p>
        </div>

        <div className="flex items-center gap-3">
          {totalItems > 100 && (
            <div className="flex items-center gap-2 text-amber-400 text-sm font-archivo">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Large collection
            </div>
          )}

          <button
            onClick={handleBulkDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 purple-gradient text-white rounded-lg font-archivo font-medium hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download All {type === "image" ? "Photos" : "Videos"}
              </>
            )}
          </button>
        </div>
      </div>

      {totalItems > 50 && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-amber-200 text-sm font-archivo font-medium mb-1">
                Performance Notice
              </p>
              <p className="text-amber-200/80 text-xs font-archivo leading-relaxed">
                This collection contains {totalItems} items. Bulk downloads may
                take time and use significant bandwidth. Consider downloading in
                smaller batches for better performance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
