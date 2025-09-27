"use client";

import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { AttendanceManager } from "@/components/Attendance/AttendanceManager";

export default function AttendancePage() {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const { events, loading, error } = useEvents({ status: "ACTIVE" });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-xl text-red-600">Error loading events</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Attendance</h1>
          <p className="mt-2 text-gray-600">
            Select an event to manage attendance and add new attendees
          </p>
        </div>

        {!selectedEventId ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Select an Event
              </h2>

              {events.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No active events found</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 transition-all border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-md"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <h3 className="mb-2 font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {event.time}
                        </p>
                        <p>
                          <span className="font-medium">Venue:</span> {event.venue}
                        </p>
                        <p>
                          <span className="font-medium">Registrations:</span>{" "}
                          {event.registrationCount || 0} / {event.capacity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <AttendanceManager
            eventId={selectedEventId}
            onBack={() => setSelectedEventId("")}
          />
        )}
      </div>
    </div>
  );
}
