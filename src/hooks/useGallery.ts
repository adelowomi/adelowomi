"use client";

import { useState, useEffect } from "react";

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  driveUrl: string;
  thumbnailUrl?: string;
  eventId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UseGalleryOptions {
  eventId?: string;
  page?: number;
  limit?: number;
}

export const useGallery = (options: UseGalleryOptions = {}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "/api/gallery";

      if (options.eventId) {
        url = `/api/gallery/event/${options.eventId}`;
      }

      const queryParams = new URLSearchParams();
      if (options.page) queryParams.append("page", options.page.toString());
      if (options.limit) queryParams.append("limit", options.limit.toString());

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch gallery images");
      }

      const data = await response.json();

      // Handle different API response structures
      let images = [];
      if (data.success && data.data) {
        // Event-specific endpoint: {success: true, data: {event: {...}, images: [...]}}
        images = data.data.images || [];
      } else {
        // General endpoint: {images: [...]} or direct array
        images = data.images || data || [];
      }

      // Transform the images to include imageUrl for backward compatibility
      const transformedImages = Array.isArray(images)
        ? images.map((image: any) => ({
            ...image,
            imageUrl: image.imageUrl || image.driveUrl || image.thumbnailUrl,
          }))
        : [];

      setImages(transformedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [options.eventId, options.page, options.limit]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
  };
};

export const useVideos = (category?: string) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "/api/videos";

      if (category) {
        url = `/api/videos/category/${category}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();

      // Handle the API response structure
      let videos = [];
      if (data.success && data.data) {
        videos = data.data.videos || data.data || [];
      } else {
        videos = data.videos || data || [];
      }

      setVideos(Array.isArray(videos) ? videos : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
  };
};
