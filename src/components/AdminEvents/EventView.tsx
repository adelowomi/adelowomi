"use client";

import React, { useState } from "react";
import EventCard from "../ui/EventCard";
import { useAdminEvents } from "@/hooks/useAdmin";
import { useEventSearch } from "@/hooks/useEventSearch";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Event, EventStatus } from "@/types/event.types";
import EditEventForm from "./EditEventForm";
import { CloseIcon } from "@/icons";
import { getGoogleDriveImageUrl } from "@/lib/utils/file-helpers";

interface EventViewProps {
  searchTerm?: string;
  statusFilter?: EventStatus | "ALL";
}

const EventView: React.FC<EventViewProps> = ({
  searchTerm = "",
  statusFilter = "ALL",
}) => {
  const { events, loading, error } = useAdminEvents();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  console.log(
    "EventView - Loading:",
    loading,
    "Error:",
    error,
    "Events:",
    events
  );

  const { filteredEvents, setSearchTerm, setStatusFilter } = useEventSearch({
    events,
  });

  // Update search filters when props change
  React.useEffect(() => {
    setSearchTerm(searchTerm);
    setStatusFilter(statusFilter);
  }, [searchTerm, statusFilter, setSearchTerm, setStatusFilter]);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleView = (event: Event) => {
    setViewingEvent(event);
  };

  const handleCloseEdit = () => {
    setEditingEvent(null);
  };

  const handleCloseView = () => {
    setViewingEvent(null);
  };

  const handleEditSuccess = () => {
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <p>Error loading events</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-gray-400">
          <p className="text-lg">No events found</p>
          <p className="text-sm mt-2">Create your first event to get started</p>
        </div>
      </div>
    );
  }

  if (filteredEvents.length === 0 && events.length > 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-gray-400">
          <p className="text-lg">No events match your search criteria</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEdit}
            onView={handleView}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg w-full max-w-[886px] py-4 px-4 sm:px-8 lg:px-16 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between my-2">
              <div></div>
              <div onClick={handleCloseEdit} className="cursor-pointer">
                <CloseIcon />
              </div>
            </div>
            <EditEventForm
              event={editingEvent}
              onSuccess={handleEditSuccess}
              onCancel={handleCloseEdit}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg w-full max-w-[886px] py-4 px-4 sm:px-8 lg:px-16 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between my-2">
              <div></div>
              <div onClick={handleCloseView} className="cursor-pointer">
                <CloseIcon />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 text-primary">
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-primary text-xl sm:text-2xl lg:text-[32px] font-semibold font-besley text-center">
                  {viewingEvent.title}
                </h2>
                <hr className="horizontal-line" />
              </div>

              {viewingEvent.flyerUrl && (
                <div className="flex justify-center">
                  <img
                    src={getGoogleDriveImageUrl(viewingEvent.flyerUrl)}
                    alt={viewingEvent.title}
                    className="max-w-full max-h-48 sm:max-h-64 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    Event Details
                  </h3>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(viewingEvent.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {viewingEvent.time}
                    </p>
                    <p>
                      <strong>Venue:</strong> {viewingEvent.venue}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {viewingEvent.capacity}
                    </p>
                    <p>
                      <strong>Status:</strong> {viewingEvent.status}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    Registration Stats
                  </h3>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p>
                      <strong>Registered:</strong>{" "}
                      {viewingEvent.registrationCount || 0}
                    </p>
                    <p>
                      <strong>Available:</strong>{" "}
                      {viewingEvent.availableSpots || viewingEvent.capacity}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(viewingEvent.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Updated:</strong>{" "}
                      {new Date(viewingEvent.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* View Registrants Button */}
                  <div className="mt-4">
                    <a
                      href="/admin/events/registrants"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66875 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3312 12.5 10 12.5Z" />
                      </svg>
                      View All Registrants
                    </a>
                  </div>
                </div>
              </div>

              {viewingEvent.description && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    Description
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {viewingEvent.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventView;
