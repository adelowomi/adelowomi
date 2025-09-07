"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface VolunteerForm {
  id: string;
  title: string;
  description?: string;
}

interface EventVolunteerSectionProps {
  eventId: string;
  eventTitle: string;
}

const EventVolunteerSection: React.FC<EventVolunteerSectionProps> = ({
  eventId,
  eventTitle,
}) => {
  const [volunteerForms, setVolunteerForms] = useState<VolunteerForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteerForms();
  }, [eventId]);

  const fetchVolunteerForms = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/volunteer-forms`);
      if (response.ok) {
        const data = await response.json();
        setVolunteerForms(data);
      }
    } catch (error) {
      console.error("Error fetching volunteer forms:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || volunteerForms.length === 0) {
    return null; // Don't show anything if loading or no forms
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="bg-white/20 p-3 rounded-full mr-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Join Our Team!</h3>
          <p className="text-white/90">
            Help make {eventTitle} an amazing experience for everyone
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {volunteerForms.map((form) => (
          <div
            key={form.id}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
          >
            <h4 className="font-semibold text-lg mb-2">{form.title}</h4>
            {form.description && (
              <p className="text-white/80 text-sm mb-3">{form.description}</p>
            )}
            <Link
              href={`/volunteer/${form.id}`}
              className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Apply to Volunteer
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <p className="text-white/80 text-sm">
          💡 <strong>Why volunteer?</strong> Gain experience, meet new people,
          and contribute to your community while supporting amazing events!
        </p>
      </div>
    </div>
  );
};

export default EventVolunteerSection;
