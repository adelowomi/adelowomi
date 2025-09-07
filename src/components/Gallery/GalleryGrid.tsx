"use client";

import React, { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import { useEvents } from "@/hooks/useEvents";
import Image from "next/image";
import Button from "../ui/Button";
import MediaViewer from "../shared/MediaViewer";

const GalleryGrid = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const { events } = useEvents({ status: "COMPLETED", limit: 100 });
  const { images, loading, error } = useGallery({
    eventId: selectedEventId || undefined,
    page: currentPage,
    limit: 12,
  });

  const handleEventFilter = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setSelectedEventId("");
    setCurrentPage(1);
  };

  const openMediaViewer = (image: any) => {
    setSelectedMedia(image);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };

  const downloadMedia = async (media: any) => {
    try {
      const response = await fetch(media.driveUrl || media.imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${media.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  if (loading && images.length === 0) {
    return (
      <div className="px-28 py-24">
        <div className="flex justify-center items-center h-64">
          <p className="text-primary text-xl">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-28 py-24">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-primary font-semibold text-[48px] uppercase font-besley mb-4">
            Event Gallery
          </h1>
          <p className="text-primary font-archivo text-lg max-w-2xl mx-auto">
            Explore moments captured from our past events and meetups
          </p>
        </div>

        {/* Event Filter */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            text="All Events"
            onClick={clearFilter}
            width="w-auto"
            padding="px-6 py-2"
            textStyle={`text-sm font-medium font-archivo ${
              !selectedEventId ? "text-secondary" : "text-primary"
            }`}
          />
          {events.map((event) => (
            <Button
              key={event.id}
              text={event.title}
              onClick={() => handleEventFilter(event.id)}
              width="w-auto"
              padding="px-6 py-2"
              textStyle={`text-sm font-medium font-archivo ${
                selectedEventId === event.id ? "text-secondary" : "text-primary"
              }`}
            />
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 text-lg">
              Error loading gallery: {error}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-lg overflow-hidden bg-[#8f8c8c] hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openMediaViewer(image)}
              >
                <Image
                  src={image.imageUrl || image.driveUrl || image.thumbnailUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold font-archivo mb-1">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-white/80 text-sm font-archivo line-clamp-2 mb-2">
                        {image.description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMediaViewer(image);
                        }}
                        className="text-white text-xs bg-black/50 px-2 py-1 rounded hover:bg-black/70 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadMedia(image);
                        }}
                        className="text-white text-xs bg-black/50 px-2 py-1 rounded hover:bg-black/70 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <p className="text-primary text-lg mb-4">
                {selectedEventId
                  ? "No images found for this event."
                  : "No gallery images available yet."}
              </p>
              {selectedEventId && (
                <Button text="View All Images" onClick={clearFilter} />
              )}
            </div>
          )
        )}

        {/* Loading indicator */}
        {loading && images.length > 0 && (
          <div className="text-center">
            <p className="text-primary text-sm">Loading more images...</p>
          </div>
        )}

        {/* Media Viewer Modal */}
        {selectedMedia && (
          <MediaViewer
            media={selectedMedia}
            type="image"
            onClose={closeMediaViewer}
            onDownload={() => downloadMedia(selectedMedia)}
          />
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
