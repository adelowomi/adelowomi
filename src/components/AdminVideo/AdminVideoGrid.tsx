"use client";

import React, { useState } from "react";
import AdminVideoCard from "./AdminVideoCard";
import AdminVideoPagination from "./AdminVideoPagination";
import { VideoCategory } from "@/types/prisma.types";

interface Video {
  id: string;
  title: string;
  description?: string;
  category: VideoCategory;
  driveUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  event?: {
    id: string;
    title: string;
    date: string;
  };
}

interface AdminVideoGridProps {
  videos: Video[];
  loading: boolean;
  onVideoDeleted: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AdminVideoGrid: React.FC<AdminVideoGridProps> = ({
  videos,
  loading,
  onVideoDeleted,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#0D09000D] border border-[#FCFCFC33] rounded-lg overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-gray-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-8 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No videos found</div>
        <p className="text-gray-500">
          Upload your first video or adjust your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <AdminVideoCard
            key={video.id}
            video={video}
            onVideoDeleted={onVideoDeleted}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <AdminVideoPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default AdminVideoGrid;
