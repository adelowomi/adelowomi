"use client";

import React from "react";

interface LoadingSkeletonProps {
  type?: "image" | "video" | "text";
  count?: number;
  className?: string;
}

const LoadingSkeleton = ({
  type = "image",
  count = 8,
  className = "",
}: LoadingSkeletonProps) => {
  const renderSkeleton = (index: number) => {
    const baseClasses =
      "animate-pulse bg-gradient-to-r from-surface via-[#3a2d3f] to-surface rounded-xl";

    switch (type) {
      case "image":
        return (
          <div
            key={index}
            className={`${baseClasses} aspect-square ${className}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="h-full w-full bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl"></div>
          </div>
        );
      case "video":
        return (
          <div
            key={index}
            className={`${baseClasses} aspect-video ${className}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="h-full w-full bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case "text":
        return (
          <div key={index} className={`${baseClasses} h-4 w-full ${className}`}>
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent rounded"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`grid gap-4 lg:gap-6 ${
        type === "image"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : type === "video"
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </div>
  );
};

export default LoadingSkeleton;
