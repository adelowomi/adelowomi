"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface VolunteerForm {
  id: string;
  title: string;
  description?: string;
}

interface VolunteerOpportunitiesProps {
  eventId: string;
}

const VolunteerOpportunities: React.FC<VolunteerOpportunitiesProps> = ({
  eventId,
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

  if (loading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (volunteerForms.length === 0) {
    return null; // Don't show anything if no volunteer opportunities
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-purple-600"
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
        Volunteer Opportunities
      </h3>

      <p className="text-gray-600 mb-4">
        Join us as a volunteer and help make this event amazing! We have several
        volunteer positions available.
      </p>

      <div className="space-y-3">
        {volunteerForms.map((form) => (
          <div
            key={form.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <h4 className="font-semibold text-gray-800 mb-2">{form.title}</h4>
            {form.description && (
              <p className="text-gray-600 text-sm mb-3">{form.description}</p>
            )}
            <Link
              href={`/volunteer/${form.id}`}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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
    </div>
  );
};

export default VolunteerOpportunities;
