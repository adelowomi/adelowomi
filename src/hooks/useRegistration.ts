"use client";

import { useState } from "react";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: "STUDENT" | "GRADUATE";
  course?: string;
  areaOfInterest: string;
  expectations?: string;
}

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerForEvent = async (eventId: string, data: RegistrationData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Full error data:", errorData);
        if (errorData.details) {
          console.log("Validation details:", errorData.details);
        }
        throw new Error(errorData.message || "Registration failed");
      }

      setSuccess(true);
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (registrationId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/admin/registrations/${registrationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete registration");
      }

      return await response.json();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete registration"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    registerForEvent,
    deleteRegistration,
    loading,
    error,
    success,
    resetState,
  };
};
