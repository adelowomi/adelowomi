"use client";

import React, { useState } from "react";

interface PerformanceNoticeProps {
  totalImages: number;
  totalVideos: number;
}

const PerformanceNotice = ({
  totalImages,
  totalVideos,
}: PerformanceNoticeProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const totalItems = totalImages + totalVideos;
  const isLargeCollection = totalItems > 100;
  const isVeryLargeCollection = totalItems > 200;

  if (!isLargeCollection || isDismissed) return null;

  return (
    <div
      className={`mb-8 p-6 rounded-2xl border ${
        isVeryLargeCollection
          ? "bg-red-500/10 border-red-500/20"
          : "bg-amber-500/10 border-amber-500/20"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isVeryLargeCollection ? "bg-red-500/20" : "bg-amber-500/20"
          }`}
        >
          <svg
            className={`w-6 h-6 ${
              isVeryLargeCollection ? "text-red-400" : "text-amber-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3
            className={`font-semibold font-besley mb-2 ${
              isVeryLargeCollection ? "text-red-200" : "text-amber-200"
            }`}
          >
            {isVeryLargeCollection
              ? "Very Large Media Collection"
              : "Large Media Collection"}
          </h3>

          <div className="space-y-2 mb-4">
            <p
              className={`text-sm font-archivo ${
                isVeryLargeCollection ? "text-red-200/80" : "text-amber-200/80"
              }`}
            >
              This event contains <strong>{totalItems} media items</strong> (
              {totalImages} photos, {totalVideos} videos).
            </p>

            <div
              className={`text-xs font-archivo space-y-1 ${
                isVeryLargeCollection ? "text-red-200/70" : "text-amber-200/70"
              }`}
            >
              <p>
                • Media is loaded in pages of 20 items for optimal performance
              </p>
              <p>
                • Use pagination or "Load More" to browse through the collection
              </p>
              <p>
                • Bulk downloads are processed in batches to prevent browser
                overload
              </p>
              {isVeryLargeCollection && (
                <p>
                  • Consider using a download manager for very large collections
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 text-xs font-archivo">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span
                  className={
                    isVeryLargeCollection
                      ? "text-red-200/60"
                      : "text-amber-200/60"
                  }
                >
                  Pagination enabled
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span
                  className={
                    isVeryLargeCollection
                      ? "text-red-200/60"
                      : "text-amber-200/60"
                  }
                >
                  Lazy loading active
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isVeryLargeCollection
              ? "hover:bg-red-500/20 text-red-300 hover:text-red-200"
              : "hover:bg-amber-500/20 text-amber-300 hover:text-amber-200"
          }`}
          title="Dismiss notice"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PerformanceNotice;
