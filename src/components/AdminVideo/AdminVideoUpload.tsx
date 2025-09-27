"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Event {
  id: string;
  title: string;
  date: string;
}

interface AdminVideoUploadProps {
  onClose: () => void;
  onVideoUploaded: () => void;
}

const UploadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
      fill="currentColor"
    />
    <path
      d="M8 15.01L9.41 16.42L11 14.84V19H13V14.84L14.59 16.43L16 15.01L12 11.01L8 15.01Z"
      fill="currentColor"
    />
  </svg>
);

const AdminVideoUpload: React.FC<AdminVideoUploadProps> = ({
  onClose,
  onVideoUploaded,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "EVENT",
    eventId: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

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
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const validateFile = (file: File): string | null => {
    const validTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo", // AVI
      "video/webm",
    ];

    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Please select MP4, MPEG, MOV, AVI, or WebM files.";
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return "File size must be less than 100MB";
    }

    return null;
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Auto-fill title from filename if empty
      if (!formData.title) {
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        setFormData((prev) => ({ ...prev, title: fileName }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length > 0) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFiles[0]); // Only take first file
        input.files = dataTransfer.files;
        handleFileChange({
          target: input,
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a video file");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a video title");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUploadProgress(0);

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("title", formData.title.trim());

      if (formData.description.trim()) {
        uploadFormData.append("description", formData.description.trim());
      }

      uploadFormData.append("category", formData.category);

      if (formData.eventId) {
        uploadFormData.append("eventId", formData.eventId);
      }

      // Simulate upload progress (since we can't track real progress easily)
      let progressValue = 0;
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) return prev;
          progressValue += 8; // Consistent increment instead of random
          return Math.min(progressValue, 90);
        });
      }, 500);

      const response = await fetch("/api/admin/videos", {
        method: "POST",
        body: uploadFormData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload video");
      }

      const data = await response.json();
      if (data.success) {
        onVideoUploaded();
      } else {
        throw new Error(data.message || "Failed to upload video");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload video");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-black border border-[#FCFCFC33] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-primary font-besley">
            Upload Video
          </h2>
          <button
            onClick={onClose}
            className="transition-colors text-primary/60 hover:text-primary"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div>
            <label className="block mb-2 text-sm font-medium font-archivo text-primary">
              Video File *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                file
                  ? "border-primary/50"
                  : "border-[#FCFCFC33] hover:border-primary/30"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="space-y-4">
                <UploadIcon />
                <div>
                  {file ? (
                    <div className="text-primary">
                      <p className="mb-2 font-medium font-archivo">
                        {file.name}
                      </p>
                      <p className="text-sm text-primary/60 font-archivo">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2 text-primary font-archivo">
                        Drag and drop a video here, or click to select
                      </p>
                      <p className="text-sm text-primary/60 font-archivo">
                        Supports: MP4, MPEG, MOV, AVI, WebM (max 100MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 mt-4 transition-colors rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
              >
                {file ? "Change Video" : "Select Video"}
              </button>
            </div>
          </div>

          {/* Upload Progress */}
          {loading && (
            <div>
              <div className="flex justify-between mb-2 text-sm text-primary">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 transition-all duration-300 rounded-full bg-primary"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium font-archivo text-primary">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary placeholder-primary/50 focus:outline-none focus:border-primary/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium font-archivo text-primary">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter video description (optional)"
              rows={3}
              className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary placeholder-primary/50 focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium font-archivo text-primary">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary focus:outline-none focus:border-primary/50"
              required
            >
              <option value="EVENT">Event Video</option>
              <option value="CONTENT">Content Video</option>
              <option value="PROMOTIONAL">Promotional Video</option>
            </select>
          </div>

          {/* Event Association */}
          {formData.category === "EVENT" && (
            <div>
              <label className="block mb-2 text-sm font-medium font-archivo text-primary">
                Associate with Event
              </label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleInputChange}
                disabled={loadingEvents}
                className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary focus:outline-none focus:border-primary/50"
              >
                <option value="">No Event (General)</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 text-sm text-red-400 border rounded-lg bg-red-900/20 border-red-500/30">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              text="Cancel"
              onClick={onClose}
              disabled={loading}
              textStyle="text-primary/60 font-archivo"
              padding="px-6 py-3"
              variant="outline"
            />
            <Button
              type="submit"
              text={loading ? "Uploading..." : "Upload Video"}
              disabled={loading || !file || !formData.title.trim()}
              svg={loading ? <LoadingSpinner /> : <UploadIcon />}
              textStyle="text-primary font-archivo"
              padding="px-6 py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVideoUpload;
