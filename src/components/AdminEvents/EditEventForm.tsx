"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { ArrowIcon } from "@/icons";
import { useAdminEvents } from "@/hooks/useAdmin";
import { Event, EventStatus } from "@/types/event.types";

interface EditEventFormProps {
  event: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EditEventForm: React.FC<EditEventFormProps> = ({
  event,
  onSuccess,
  onCancel,
}) => {
  const { updateEvent } = useAdminEvents();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    flyerUrl: "",
    status: EventStatus.ACTIVE,
  });

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      const dateString = eventDate.toISOString().split("T")[0];

      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: dateString,
        time: event.time || "",
        venue: event.venue || "",
        capacity: event.capacity?.toString() || "",
        flyerUrl: event.flyerUrl || "",
        status: event.status || EventStatus.ACTIVE,
      });
    }
  }, [event]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.date ||
        !formData.time ||
        !formData.venue ||
        !formData.capacity
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Create ISO date string
      const eventDate = new Date(formData.date + "T" + formData.time);

      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        date: eventDate.toISOString(),
        time: formData.time,
        venue: formData.venue.trim(),
        capacity: parseInt(formData.capacity),
        flyerUrl: formData.flyerUrl.trim() || undefined,
        status: formData.status,
      };

      await updateEvent(event.id, eventData);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-primary text-[32px] font-semibold font-besley">
          Edit Event
        </h2>
        <hr className="horizontal-line" />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center"
      >
        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium font-archivo text-primary">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium font-archivo text-primary">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows={4}
            className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary resize-none"
          />
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium font-archivo text-primary">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium font-archivo text-primary">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium font-archivo text-primary">
            Event Venue *
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            placeholder="Enter event venue"
            className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
            required
          />
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium font-archivo text-primary">
              Capacity *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Number of seats"
              min="1"
              max="10000"
              className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium font-archivo text-primary">
              Flyer URL
            </label>
            <input
              type="url"
              name="flyerUrl"
              value={formData.flyerUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/flyer.jpg"
              className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium font-archivo text-primary">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary"
          >
            <option value={EventStatus.ACTIVE}>Active</option>
            <option value={EventStatus.INACTIVE}>Inactive</option>
            <option value={EventStatus.COMPLETED}>Completed</option>
          </select>
        </div>

        <div className="my-4 flex gap-4">
          {onCancel && (
            <Button
              text="Cancel"
              width="w-[300px]"
              onClick={onCancel}
              type="button"
              className="bg-gray-600 hover:bg-gray-700"
            />
          )}
          <Button
            text={loading ? "Updating..." : "Update Event"}
            svg={!loading ? <ArrowIcon /> : undefined}
            width="w-[300px]"
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;
