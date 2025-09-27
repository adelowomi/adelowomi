"use client";

import React, { useState, useEffect, useRef } from "react";
import { Event, GalleryImage } from "@/types/event.types";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { generateFileId } from "@/lib/utils/id-generator";

interface UploadImageModalProps {
  onClose: () => void;
  onSuccess: (images: GalleryImage[]) => void;
}

interface FileWithPreview {
  file: File;
  preview: string;
  title: string;
  description: string;
  id: string;
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

const RemoveIcon = () => (
  <svg
    width="16"
    height="16"
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
);

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [eventId, setEventId] = useState("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch events for dropdown
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

  // Validate individual file
  const validateFile = (file: File): string | null => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Please select JPEG, PNG, WebP, or GIF files.";
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  // Handle multiple file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const newFiles: FileWithPreview[] = [];
    let hasErrors = false;

    selectedFiles.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        hasErrors = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        const fileName = file.name.replace(/\.[^/.]+$/, "");

        const fileWithPreview: FileWithPreview = {
          file,
          preview,
          title: fileName,
          description: "",
          id: generateFileId(file),
        };

        setFiles((prev) => [...prev, fileWithPreview]);
      };
      reader.readAsDataURL(file);
    });

    if (!hasErrors) {
      setError(null);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length > 0) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        droppedFiles.forEach((file) => dataTransfer.items.add(file));
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

  // Remove a file from the list
  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Update file metadata
  const updateFileMetadata = (
    fileId: string,
    field: "title" | "description",
    value: string
  ) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, [field]: value } : f))
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please select at least one image file");
      return;
    }

    // Validate all files have titles
    const filesWithoutTitles = files.filter((f) => !f.title.trim());
    if (filesWithoutTitles.length > 0) {
      setError("Please provide titles for all images");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUploadProgress({});

      const uploadedImages: GalleryImage[] = [];

      // Upload files one by one to show progress
      for (let i = 0; i < files.length; i++) {
        const fileData = files[i];

        setUploadProgress((prev) => ({ ...prev, [fileData.id]: 0 }));

        const formData = new FormData();
        formData.append("file", fileData.file);
        formData.append("title", fileData.title.trim());
        if (fileData.description.trim()) {
          formData.append("description", fileData.description.trim());
        }
        if (eventId) {
          formData.append("eventId", eventId);
        }

        const response = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Failed to upload ${fileData.title}`);
        }

        if (data.success) {
          uploadedImages.push(data.data);
          setUploadProgress((prev) => ({ ...prev, [fileData.id]: 100 }));
        } else {
          throw new Error(data.message || `Failed to upload ${fileData.title}`);
        }
      }

      onSuccess(uploadedImages);
    } catch (err) {
      console.error("Error uploading images:", err);
      setError(err instanceof Error ? err.message : "Failed to upload images");
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-black border border-[#FCFCFC33] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-primary font-besley">
            Upload Image
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
              Image Files *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                files.length > 0
                  ? "border-primary/50"
                  : "border-[#FCFCFC33] hover:border-primary/30"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="space-y-4">
                <UploadIcon />
                <div>
                  <p className="mb-2 text-primary font-archivo">
                    Drag and drop images here, or click to select multiple files
                  </p>
                  <p className="text-sm text-primary/60 font-archivo">
                    Supports: JPEG, PNG, WebP, GIF (max 10MB each)
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 mt-4 transition-colors rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
              >
                Select Images
              </button>
            </div>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div>
              <label className="block mb-4 text-sm font-medium font-archivo text-primary">
                Selected Images ({files.length})
              </label>
              <div className="space-y-4 overflow-y-auto max-h-96">
                {files.map((fileData) => (
                  <div
                    key={fileData.id}
                    className="border border-[#FCFCFC33] rounded-lg p-4 bg-black/20"
                  >
                    <div className="flex gap-4">
                      {/* Preview */}
                      <div className="flex-shrink-0">
                        <img
                          src={fileData.preview}
                          alt="Preview"
                          className="object-cover w-20 h-20 rounded-lg"
                        />
                      </div>

                      {/* Metadata */}
                      <div className="flex-grow space-y-3">
                        <div>
                          <input
                            type="text"
                            value={fileData.title}
                            onChange={(e) =>
                              updateFileMetadata(
                                fileData.id,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Enter image title"
                            className="w-full rounded-lg bg-black py-2 px-3 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary placeholder-primary/50 focus:outline-none focus:border-primary/50 text-sm"
                          />
                        </div>
                        <div>
                          <textarea
                            value={fileData.description}
                            onChange={(e) =>
                              updateFileMetadata(
                                fileData.id,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Enter description (optional)"
                            rows={2}
                            className="w-full rounded-lg bg-black py-2 px-3 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary placeholder-primary/50 focus:outline-none focus:border-primary/50 resize-none text-sm"
                          />
                        </div>

                        {/* Upload Progress */}
                        {loading &&
                          uploadProgress[fileData.id] !== undefined && (
                            <div className="w-full h-2 bg-gray-700 rounded-full">
                              <div
                                className="h-2 transition-all duration-300 rounded-full bg-primary"
                                style={{
                                  width: `${uploadProgress[fileData.id]}%`,
                                }}
                              />
                            </div>
                          )}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(fileData.id)}
                        disabled={loading}
                        className="flex-shrink-0 p-2 transition-colors text-primary/60 hover:text-red-400 disabled:opacity-50"
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium font-archivo text-primary">
              Associate with Event (applies to all images)
            </label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              disabled={loadingEvents || loading}
              className="w-full rounded-lg bg-black py-3 px-4 border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary focus:outline-none focus:border-primary/50"
            >
              <option value="">No Event (General Gallery)</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

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
              text={
                loading
                  ? `Uploading ${files.length} images...`
                  : `Upload ${files.length} Images`
              }
              disabled={loading || files.length === 0}
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

export default UploadImageModal;
