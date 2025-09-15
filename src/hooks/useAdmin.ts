"use client";

import { useState, useEffect, useCallback } from "react";

export interface DashboardStats {
  events: {
    total: number;
    active: number;
    completed: number;
    inactive: number;
  };
  registrations: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
  media: {
    totalImages: number;
    totalVideos: number;
    recentUploads: number;
  };
  recentActivity: {
    recentEvents: Array<{
      id: string;
      title: string;
      date: Date;
      registrationCount: number;
    }>;
    recentRegistrations: Array<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      eventTitle: string;
      registeredAt: Date;
    }>;
  };
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching dashboard stats from /api/admin/dashboard/stats");
      const response = await fetch("/api/admin/dashboard/stats", {
        credentials: "include",
      });

      console.log("Dashboard stats response status:", response.status);
      console.log("Dashboard stats response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Dashboard stats API Error Response:", errorText);
        throw new Error("Failed to fetch dashboard stats");
      }

      const responseData = await response.json();
      console.log("Dashboard stats API Response:", responseData);

      // Extract data from the success response format
      const statsData = responseData.data || responseData;
      console.log("Dashboard stats data:", statsData);
      setStats(statsData);
    } catch (err) {
      console.error("Dashboard stats fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export const useAdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching events from /api/admin/events");
      const response = await fetch("/api/admin/events", {
        credentials: "include",
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `Failed to fetch admin events: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      console.log("API Response data:", data);

      // Handle different response structures
      const eventsArray = data.data || data.events || data;
      console.log("Events array:", eventsArray);
      setEvents(eventsArray);
    } catch (err) {
      console.error("Fetch events error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const result = await response.json();
      const newEvent = result.data || result;
      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    } catch (error) {
      throw error;
    }
  };

  const createEventWithFile = async (formData: FormData) => {
    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        credentials: "include",
        body: formData, // Don't set Content-Type header for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const result = await response.json();
      const newEvent = result.data || result;
      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    } catch (error) {
      throw error;
    }
  };

  const updateEvent = async (eventId: string, eventData: any) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update event");
      }

      const updatedEvent = await response.json();
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? updatedEvent : event))
      );
      return updatedEvent;
    } catch (error) {
      throw error;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event");
      }

      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    createEventWithFile,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};

export const useAdminRegistrations = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/admin/registrations${
        queryParams ? `?${queryParams}` : ""
      }`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch registrations: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      const registrationsArray = data.data || data.registrations || data;
      setRegistrations(registrationsArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const exportRegistrations = async (
    eventId: string,
    format: string = "csv"
  ) => {
    try {
      const response = await fetch("/api/admin/registrations/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ eventId, format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to export registrations");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteRegistration = async (registrationId: string) => {
    try {
      const response = await fetch(
        `/api/admin/registrations/${registrationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete registration");
      }

      const result = await response.json();

      // Update local state by removing the deleted registration
      setRegistrations((prev) =>
        prev.filter((reg) => reg.id !== registrationId)
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return {
    registrations,
    loading,
    error,
    exportRegistrations,
    deleteRegistration,
    refetch: fetchRegistrations,
  };
};

export const useAdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/admin/gallery${queryParams ? `?${queryParams}` : ""}`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch gallery images: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      const imagesArray = data.data || data.images || data;
      setImages(imagesArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      const newImage = await response.json();
      setImages((prev) => [newImage, ...prev]);
      return newImage;
    } catch (error) {
      throw error;
    }
  };

  const updateImage = async (imageId: string, imageData: any) => {
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update image");
      }

      const updatedImage = await response.json();
      setImages((prev) =>
        prev.map((image) => (image.id === imageId ? updatedImage : image))
      );
      return updatedImage;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete image");
      }

      setImages((prev) => prev.filter((image) => image.id !== imageId));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    uploadImage,
    updateImage,
    deleteImage,
    refetch: fetchImages,
  };
};

export const useAdminVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/admin/videos${queryParams ? `?${queryParams}` : ""}`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch videos: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      const videosArray = data.data || data.videos || data;
      setVideos(videosArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const uploadVideo = async (formData: FormData) => {
    try {
      const response = await fetch("/api/admin/videos", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload video");
      }

      const newVideo = await response.json();
      setVideos((prev) => [newVideo, ...prev]);
      return newVideo;
    } catch (error) {
      throw error;
    }
  };

  const updateVideo = async (videoId: string, videoData: any) => {
    try {
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video");
      }

      const updatedVideo = await response.json();
      setVideos((prev) =>
        prev.map((video) => (video.id === videoId ? updatedVideo : video))
      );
      return updatedVideo;
    } catch (error) {
      throw error;
    }
  };

  const deleteVideo = async (videoId: string) => {
    try {
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete video");
      }

      setVideos((prev) => prev.filter((video) => video.id !== videoId));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    uploadVideo,
    updateVideo,
    deleteVideo,
    refetch: fetchVideos,
  };
};
