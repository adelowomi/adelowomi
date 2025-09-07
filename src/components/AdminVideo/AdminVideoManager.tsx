"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "@/icons";
import Button from "@/components/ui/Button";
import AdminVideoUpload from "./AdminVideoUpload";

interface Video {
  id: string;
  title: string;
  description?: string;
  category: string;
  driveUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  event?: {
    id: string;
    title: string;
    date: string;
  };
}

const AdminVideoManager = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/videos?limit=12");
      if (!response.ok) throw new Error("Failed to fetch videos");

      const data = await response.json();
      setVideos(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary font-besley">
            Video Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your video content and uploads
          </p>
        </div>
        <Button
          text="Upload Video"
          svg={<PlusIcon />}
          onClick={() => setShowUploadModal(true)}
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchVideos}
            className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
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
          ))
        ) : videos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No videos found</div>
            <p className="text-gray-500">
              Upload your first video to get started
            </p>
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="bg-[#0D09000D] border border-[#FCFCFC33] rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🎥</div>
                    <div className="text-sm">Video Thumbnail</div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-primary font-medium text-sm line-clamp-2 leading-tight">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 rounded text-xs border bg-primary/20 text-primary border-primary/30">
                    {video.category}
                  </span>
                  <button
                    onClick={() => window.open(video.driveUrl, "_blank")}
                    className="px-3 py-1 bg-primary text-black rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    View
                  </button>
                </div>

                {video.event && (
                  <div className="text-xs text-gray-400 bg-gray-800/50 rounded px-2 py-1">
                    Event: {video.event.title}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <AdminVideoUpload
          onClose={() => setShowUploadModal(false)}
          onVideoUploaded={() => {
            setShowUploadModal(false);
            fetchVideos(); // Refresh the video list
          }}
        />
      )}
    </div>
  );
};

export default AdminVideoManager;
