"use client";

import React, { useState, useEffect } from "react";
import { Event } from "@/types/event.types";

interface GalleryFiltersProps {
  filters: {
    search: string;
    eventId: string;
    sortBy: "createdAt" | "title";
    sortOrder: "asc" | "desc";
  };
  onFiltersChange: (filters: Partial<GalleryFiltersProps["filters"]>) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Fetch events for filter dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch("/api/events");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.events) {
            setEvents(data.data.events);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ search: e.target.value });
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ eventId: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split("-") as [
      "createdAt" | "title",
      "asc" | "desc"
    ];
    onFiltersChange({ sortBy, sortOrder });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      eventId: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-6 border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg bg-black/20">
      {/* Search */}
      <div className="flex-1">
        <label className="block text-sm font-medium font-archivo text-primary mb-2">
          Search Images
        </label>
        <input
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary placeholder-primary/50 focus:outline-none focus:border-primary/50"
        />
      </div>

      {/* Event Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium font-archivo text-primary mb-2">
          Filter by Event
        </label>
        <select
          value={filters.eventId}
          onChange={handleEventChange}
          disabled={loadingEvents}
          className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary focus:outline-none focus:border-primary/50"
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex-1">
        <label className="block text-sm font-medium font-archivo text-primary mb-2">
          Sort By
        </label>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={handleSortChange}
          className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary focus:outline-none focus:border-primary/50"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>

      {/* Clear Filters */}
      <div className="flex items-end">
        <button
          onClick={clearFilters}
          className="px-4 py-3 text-sm font-archivo text-primary/70 hover:text-primary border border-[#FCFCFC33] hover:border-primary/50 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default GalleryFilters;
