"use client";

import { useState, useEffect } from "react";
import {
  EventWithStats,
  EventListResponse,
} from "@/lib/services/event.service";

export interface UseEventsOptions {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const [events, setEvents] = useState<EventWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (options.page) queryParams.append("page", options.page.toString());
      if (options.limit) queryParams.append("limit", options.limit.toString());
      if (options.status) queryParams.append("status", options.status);
      if (options.search) queryParams.append("search", options.search);

      const response = await fetch(`/api/events?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const apiResponse = await response.json();

      if (apiResponse.success) {
        const data: EventListResponse = apiResponse.data;
        setEvents(data?.events || []);
        setPagination(
          data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 }
        );
      } else {
        throw new Error(apiResponse.error?.message || "Failed to fetch events");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [options.page, options.limit, options.status, options.search]);

  return {
    events,
    loading,
    error,
    pagination,
    refetch: fetchEvents,
  };
};

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<EventWithStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/events/${eventId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      const apiResponse = await response.json();

      if (apiResponse.success) {
        const data: EventWithStats = apiResponse.data;
        setEvent(data || null);
      } else {
        throw new Error(apiResponse.error?.message || "Failed to fetch event");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
};

export const useUpcomingEvents = (limit: number = 5) => {
  const [events, setEvents] = useState<EventWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/events?status=ACTIVE&limit=${limit}&sortBy=date&sortOrder=asc`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming events");
      }

      const apiResponse = await response.json();

      if (apiResponse.success) {
        const data: EventListResponse = apiResponse.data;
        // Filter for future events - ensure events array exists
        const allEvents = data?.events || [];
        const upcomingEvents = allEvents.filter(
          (event) => new Date(event.date) >= new Date()
        );
        setEvents(upcomingEvents);
      } else {
        throw new Error(
          apiResponse.error?.message || "Failed to fetch upcoming events"
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, [limit]);

  return {
    events,
    loading,
    error,
    refetch: fetchUpcomingEvents,
  };
};
