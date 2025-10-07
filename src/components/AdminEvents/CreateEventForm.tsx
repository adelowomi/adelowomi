"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { ArrowIcon } from "@/icons";
import { useAdminEvents } from "@/hooks/useAdmin";
import { EventStatus } from "@/types/event.types";

interface CreateEventFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { createEventWithFile } = useAdminEvents();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    status: EventStatus.ACTIVE,
  });
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setFieldErrors((prev) => ({
          ...prev,
          flyerFile: "Only JPEG, PNG, WebP, and GIF images are allowed",
        }));
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setFieldErrors((prev) => ({
          ...prev,
          flyerFile: "File size must be less than 10MB",
        }));
        return;
      }

      setFlyerFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFlyerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setFieldErrors((prev) => ({
        ...prev,
        flyerFile: "",
      }));
    }
  };

  const removeFlyerFile = () => {
    setFlyerFile(null);
    setFlyerPreview(null);
    // Reset the file input
    const fileInput = document.getElementById("flyerFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      const errors: Record<string, string> = {};

      if (!formData.title.trim()) {
        errors.title = "Event title is required";
      }
      if (!formData.date) {
        errors.date = "Event date is required";
      }
      if (!formData.time) {
        errors.time = "Event time is required";
      }
      if (!formData.venue.trim()) {
        errors.venue = "Event venue is required";
      }
      if (!formData.capacity || parseInt(formData.capacity) < 1) {
        errors.capacity = "Valid capacity is required";
      }

      // Check if date is in the past
      if (formData.date && formData.time) {
        const eventDate = new Date(formData.date + "T" + formData.time);
        if (eventDate < new Date()) {
          errors.date = "Event date cannot be in the past";
        }
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        throw new Error("Please fix the errors above");
      }

      // Create ISO date string
      const eventDate = new Date(formData.date + "T" + formData.time);

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title.trim());
      if (formData.description.trim()) {
        submitFormData.append("description", formData.description.trim());
      }
      submitFormData.append("date", eventDate.toISOString());
      submitFormData.append("time", formData.time);
      submitFormData.append("venue", formData.venue.trim());
      submitFormData.append("capacity", formData.capacity);
      submitFormData.append("status", formData.status);

      if (flyerFile) {
        submitFormData.append("flyerFile", flyerFile);
      }

      await createEventWithFile(submitFormData);

      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        capacity: "",
        status: EventStatus.ACTIVE,
      });
      setFlyerFile(null);
      setFlyerPreview(null);
      setFieldErrors({});
      setSuccess(true);

      // Show success message briefly before closing
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="px-4 py-3 mb-6 text-red-500 border border-red-500 rounded-lg bg-red-500/10">
          {error}
        </div>
      )}

      {success && (
        <div className="px-4 py-3 mb-6 text-green-500 border border-green-500 rounded-lg bg-green-500/10">
          Event created successfully! Closing modal...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
              fieldErrors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
            }`}
            required
          />
          {fieldErrors.title && (
            <p className="text-sm text-red-500">{fieldErrors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows={4}
            className="w-full rounded-lg bg-black/50 border border-[#FCFCFC33] px-4 py-3 text-primary placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors resize-none"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Date *
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary focus:outline-none focus:ring-1 transition-colors date-input ${
                  fieldErrors.date
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
                }`}
                style={{
                  colorScheme: "dark",
                }}
                required
              />
            </div>
            {fieldErrors.date && (
              <p className="text-sm text-red-500">{fieldErrors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Time *
            </label>
            <div className="relative">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary focus:outline-none focus:ring-1 transition-colors time-input ${
                  fieldErrors.time
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
                }`}
                style={{
                  colorScheme: "dark",
                }}
                required
              />
            </div>
            {fieldErrors.time && (
              <p className="text-sm text-red-500">{fieldErrors.time}</p>
            )}
          </div>
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Event Venue *
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            placeholder="Enter event venue"
            className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
              fieldErrors.venue
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
            }`}
            required
          />
          {fieldErrors.venue && (
            <p className="text-sm text-red-500">{fieldErrors.venue}</p>
          )}
        </div>

        {/* Capacity and Flyer URL */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
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
              className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                fieldErrors.capacity
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
              }`}
              required
            />
            {fieldErrors.capacity && (
              <p className="text-sm text-red-500">{fieldErrors.capacity}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Event Flyer
            </label>
            <div className="space-y-3">
              <input
                id="flyerFile"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className={`w-full rounded-lg bg-black/50 border px-4 py-3 text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-black hover:file:bg-secondary/80 focus:outline-none focus:ring-1 transition-colors ${
                  fieldErrors.flyerFile
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#FCFCFC33] focus:border-secondary focus:ring-secondary"
                }`}
              />
              {flyerPreview && (
                <div className="relative inline-block">
                  <img
                    src={flyerPreview}
                    alt="Flyer preview"
                    className="w-32 h-32 object-cover rounded-lg border border-[#FCFCFC33]"
                  />
                  <button
                    type="button"
                    onClick={removeFlyerFile}
                    className="absolute flex items-center justify-center w-6 h-6 text-sm text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-400">
                Supported formats: JPEG, PNG, WebP, GIF (max 10MB)
              </p>
            </div>
            {fieldErrors.flyerFile && (
              <p className="text-sm text-red-500">{fieldErrors.flyerFile}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full md:w-1/2 rounded-lg bg-black/50 border border-[#FCFCFC33] px-4 py-3 text-primary focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
          >
            <option value={EventStatus.ACTIVE}>Active</option>
            <option value={EventStatus.INACTIVE}>Inactive</option>
            <option value={EventStatus.COMPLETED}>Completed</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#FCFCFC1A]">
          {onCancel && (
            <Button
              text="Cancel"
              variant="outline"
              width="w-full sm:w-auto"
              onClick={onCancel}
              type="button"
            />
          )}
          <Button
            text={loading ? "Creating..." : "Create Event"}
            svg={!loading ? <ArrowIcon /> : undefined}
            width="w-full sm:w-auto"
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
