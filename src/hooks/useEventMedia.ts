"use client";

import { useState, useEffect } from "react";

export interface EventMedia {
  id: string;
  title: string;
  description?: string;
  type: "image" | "video";
  driveUrl: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface EventMediaResponse {
  media: EventMedia[];
  counts: {
    images: number;
    videos: number;
    total: number;
  };
}

export const useEventMedia = (eventId: string) => {
  const [media, setMedia] = useState<EventMedia[]>([]);
  const [images, setImages] = useState<EventMedia[]>([]);
  const [videos, setVideos] = useState<EventMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    images: 0,
    videos: 0,
    total: 0,
  });

  const fetchEventMedia = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/events/${eventId}/media`);

      if (!response.ok) {
        throw new Error("Failed to fetch event media");
      }

      const data = await response.json();

      if (data.success && data.data) {
        const { media: mediaList, counts: mediaCounts } = data.data;

        setMedia(mediaList || []);
        setCounts(mediaCounts || { images: 0, videos: 0, total: 0 });

        // Separate images and videos
        const imageList = mediaList.filter(
          (item: EventMedia) => item.type === "image"
        );
        const videoList = mediaList.filter(
          (item: EventMedia) => item.type === "video"
        );

        setImages(imageList);
        setVideos(videoList);
      } else {
        throw new Error(data.error?.message || "Failed to fetch event media");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMedia([]);
      setImages([]);
      setVideos([]);
      setCounts({ images: 0, videos: 0, total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventMedia();
    }
  }, [eventId]);

  return {
    media,
    images,
    videos,
    counts,
    loading,
    error,
    refetch: fetchEventMedia,
  };
};
