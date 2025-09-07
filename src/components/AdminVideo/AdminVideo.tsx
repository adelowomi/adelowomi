"use client";

import React, { useState, useEffect } from "react";
import AdminVideoContent from "../shared/AdminVideoContent";
import { VideoCategory } from "@prisma/client";

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

const AdminVideo = () => {
  const [activeView, setActiveView] = useState("content");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [activeView]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const category = activeView === "content" ? "CONTENT" : "EVENT";
      const response = await fetch(
        `/api/admin/videos?category=${category}&limit=6`
      );

      if (response.ok) {
        const data = await response.json();
        setVideos(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <nav className="flex border-b-[0.5px] border-solid border-[#FCFCFC33] pb-2">
        <span
          onClick={() => setActiveView("content")}
          className={`cursor-pointer flex flex-col items-center px-4 font-archivo text-primary text-[20px] ${
            activeView === "content" ? "font-semibold" : "font-normal"
          }`}
        >
          Content
        </span>
        <span
          onClick={() => setActiveView("event")}
          className={`cursor-pointer flex flex-col items-center px-4 font-archivo text-primary text-[20px] ${
            activeView === "event" ? "font-semibold" : "font-normal"
          }`}
        >
          Event
        </span>
      </nav>

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-[356px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] bg-[#0D09000D] animate-pulse"
              >
                <div className="bg-gray-700 w-full h-[350px] rounded-lg"></div>
                <div className="flex flex-col gap-5 py-5 px-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {videos.length > 0 ? (
              videos.map((video) => (
                <AdminVideoContent key={video.id} video={video} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-400">
                No {activeView} videos found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideo;
