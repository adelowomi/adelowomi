"use client";

import { useState, useEffect } from "react";
import { useEvent } from "@/hooks/useEvents";
import { AttendeeList } from "./AttendeeList";
import { AddAttendeeForm } from "./AddAttendeeForm";
import { AttendanceStats } from "./AttendanceStats";

interface AttendanceManagerProps {
  eventId: string;
  onBack: () => void;
}

export function AttendanceManager({ eventId, onBack }: AttendanceManagerProps) {
  const { event, loading, error } = useEvent(eventId);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAttendees = async () => {
    try {
      setLoadingAttendees(true);
      const response = await fetch(`/api/events/${eventId}/attendees`);
      if (response.ok) {
        const data = await response.json();
        setAttendees(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching attendees:", error);
    } finally {
      setLoadingAttendees(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchAttendees();
    }
  }, [eventId]);

  const handleMarkAttendance = async (registrationId: string, attended: boolean) => {
    try {
      const response = await fetch(`/api/attendance/${registrationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attended }),
      });

      if (response.ok) {
        // Refresh attendees list
        fetchAttendees();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleAddAttendee = async (attendeeData: any) => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendeeData),
      });

      if (response.ok) {
        // Refresh attendees list and close form
        fetchAttendees();
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  const filteredAttendees = attendees.filter((attendee) =>
    `${attendee.firstName} ${attendee.lastName} ${attendee.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-xl text-red-600">Error loading event</div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center mb-2 text-blue-600 hover:text-blue-800"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-600">
            {new Date(event.date).toLocaleDateString()} at {event.time} • {event.venue}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Attendee
        </button>
      </div>

      {/* Stats */}
      <AttendanceStats attendees={attendees} loading={loadingAttendees} />

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search attendees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Attendees List */}
      <AttendeeList
        attendees={filteredAttendees}
        loading={loadingAttendees}
        onMarkAttendance={handleMarkAttendance}
      />

      {/* Add Attendee Modal */}
      {showAddForm && (
        <AddAttendeeForm
          eventId={eventId}
          existingAttendees={attendees}
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddAttendee}
        />
      )}
    </div>
  );
}
