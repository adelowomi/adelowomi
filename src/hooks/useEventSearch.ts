"use client";

import { useState, useEffect, useMemo } from "react";
import { Event, EventStatus } from "@/types/event.types";

interface UseEventSearchProps {
  events: Event[];
}

export const useEventSearch = ({ events }: UseEventSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<EventStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"date" | "title" | "capacity">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedEvents = useMemo(() => {
    // Ensure we have a valid array to work with
    if (!events || !Array.isArray(events)) {
      return [];
    }

    let filtered = events;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.venue.toLowerCase().includes(term) ||
          event.description?.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    // Sort events
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "capacity":
          aValue = a.capacity;
          bValue = b.capacity;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [events, searchTerm, statusFilter, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setSortBy("date");
    setSortOrder("asc");
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredEvents: filteredAndSortedEvents,
    clearFilters,
    hasActiveFilters: searchTerm.trim() !== "" || statusFilter !== "ALL",
  };
};
