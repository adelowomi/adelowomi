"use client";

import React, { useState } from "react";
import { VideoCategory } from "@/types/prisma.types";
import { formatDistanceToNow } from "date-fns";

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

interface AdminVideoCardProps {
  video: Video;
  onVideoDeleted: () => void;
}

const AdminVideoCard: React.FC<AdminVideoCardProps> = ({
  video,
  onVideoDeleted,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getCategoryColor = (category: VideoCategory) => {
    switch (category) {
      case "EVENT":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "CONTENT":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "PROMOTIONAL":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/videos/${video.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      onVideoDeleted();
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleView = () => {
    window.open(video.driveUrl, "_blank");
  };

  return (
    <div
      className="bg-[#0D09000D] border border-[#FCFCFC33] rounded-lg overflow-hidden hover:border-primary/50 transition-colors group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowDeleteConfirm(false);
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}

        <div
          className={`${
            video.thumbnailUrl ? "hidden" : ""
          } text-gray-400 text-center`}
        >
          <div className="text-4xl mb-2">🎥</div>
          <div className="text-sm">Video Thumbnail</div>
        </div>

        {/* Action Overlay */}
        {showActions && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleView}
              className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors"
            >
              View
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showDeleteConfirm
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
              }`}
            >
              {isDeleting ? "..." : showDeleteConfirm ? "Confirm" : "Delete"}
            </button>
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
          <span
            className={`px-2 py-1 rounded text-xs border ${getCategoryColor(
              video.category
            )}`}
          >
            {video.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(video.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {video.event && (
          <div className="text-xs text-gray-400 bg-gray-800/50 rounded px-2 py-1">
            Event: {video.event.title}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideoCard;
