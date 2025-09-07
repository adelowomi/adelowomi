"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EventWithStats } from "@/lib/services/event.service";
import { useEventMedia } from "@/hooks/useEventMedia";
import MediaViewer from "@/components/shared/MediaViewer";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import MediaGrid from "@/components/ui/MediaGrid";
import BulkActions from "@/components/ui/BulkActions";
import PerformanceNotice from "@/components/ui/PerformanceNotice";
import { formatDate } from "@/lib/utils/date-helpers";

interface EventDetailViewProps {
  event: EventWithStats;
}

const EventDetailView = ({ event }: EventDetailViewProps) => {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const { images, videos, counts, loading, error } = useEventMedia(event.id);

  // Debug logging (can be removed in production)
  if (process.env.NODE_ENV === "development") {
    console.log("Event ID:", event.id);
    console.log("Images:", images);
    console.log("Videos:", videos);
    console.log("Counts:", counts);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }

  const openMediaViewer = (media: any, type: "image" | "video") => {
    setSelectedMedia(media);
    setMediaType(type);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
    setMediaType(null);
  };

  const downloadMedia = async (media: any, type: "image" | "video") => {
    try {
      const response = await fetch(media.driveUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${media.title}.${type === "image" ? "jpg" : "mp4"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading media:", error);
      alert("Failed to download media. Please try again.");
    }
  };

  const bulkDownloadMedia = async (
    mediaItems: any[],
    type: "image" | "video"
  ) => {
    const batchSize = 5; // Download 5 items at a time to avoid overwhelming the browser
    const totalBatches = Math.ceil(mediaItems.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const batch = mediaItems.slice(i * batchSize, (i + 1) * batchSize);

      // Download batch in parallel
      const downloadPromises = batch.map(async (media, index) => {
        try {
          // Add delay to prevent rate limiting
          await new Promise((resolve) => setTimeout(resolve, index * 200));
          await downloadMedia(media, type);
        } catch (error) {
          console.error(`Failed to download ${media.title}:`, error);
        }
      });

      await Promise.allSettled(downloadPromises);

      // Add delay between batches
      if (i < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-28 py-12 md:py-16 lg:py-24 min-h-screen gradient-mesh">
      {/* Back Navigation */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 font-archivo font-medium group"
        >
          <svg
            className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Events
        </button>
      </div>

      {/* Event Header */}
      <div className="mb-16 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-primary font-semibold text-3xl md:text-4xl lg:text-[48px] font-besley mb-2 leading-tight">
                {event.title}
              </h1>
              <div className="horizontal-line mb-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-surface rounded-xl p-4 border border-[#FCFCFC1A] card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg purple-gradient flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-secondary font-archivo text-sm font-medium uppercase tracking-wide">
                    Date
                  </span>
                </div>
                <p className="text-primary font-archivo text-lg font-semibold">
                  {formatDate(event.date)}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-4 border border-[#FCFCFC1A] card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg purple-gradient flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-secondary font-archivo text-sm font-medium uppercase tracking-wide">
                    Time
                  </span>
                </div>
                <p className="text-primary font-archivo text-lg font-semibold">
                  {event.time}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-4 border border-[#FCFCFC1A] card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg purple-gradient flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-secondary font-archivo text-sm font-medium uppercase tracking-wide">
                    Venue
                  </span>
                </div>
                <p className="text-primary font-archivo text-lg font-semibold">
                  {event.venue}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-4 border border-[#FCFCFC1A] card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg purple-gradient flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <span className="text-secondary font-archivo text-sm font-medium uppercase tracking-wide">
                    Capacity
                  </span>
                </div>
                <p className="text-primary font-archivo text-lg font-semibold">
                  {event.capacity} attendees
                </p>
              </div>
            </div>

            {event.description && (
              <div className="bg-surface rounded-xl p-6 border border-[#FCFCFC1A]">
                <h3 className="text-secondary font-archivo text-sm font-medium uppercase tracking-wide mb-3">
                  About This Event
                </h3>
                <p className="text-primary font-archivo text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}
          </div>

          {event.flyerUrl && (
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface border border-[#FCFCFC1A] card-hover group">
              <Image
                src={event.flyerUrl}
                alt={`${event.title} flyer`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
        </div>
      </div>

      {/* Media Stats Summary */}
      {(images.length > 0 || videos.length > 0) && !loading && (
        <div className="mb-12">
          <div className="bg-surface rounded-2xl border border-[#FCFCFC1A] p-6 lg:p-8">
            <h3 className="text-primary font-semibold text-xl font-besley mb-6">
              Media Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 purple-gradient rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-primary font-besley">
                  {images.length}
                </div>
                <div className="text-sm text-secondary font-archivo">
                  Photos
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 purple-gradient rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-primary font-besley">
                  {videos.length}
                </div>
                <div className="text-sm text-secondary font-archivo">
                  Videos
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 purple-gradient rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-primary font-besley">
                  {images.length + videos.length}
                </div>
                <div className="text-sm text-secondary font-archivo">
                  Total Items
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 purple-gradient rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-primary font-besley">
                  Live
                </div>
                <div className="text-sm text-secondary font-archivo">
                  Status
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Notice for Large Collections */}
      {!loading && (
        <PerformanceNotice
          totalImages={images.length}
          totalVideos={videos.length}
        />
      )}

      {/* Event Media Section */}
      <div className="space-y-16">
        {/* Images Section */}
        {images.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-primary font-semibold text-2xl md:text-3xl lg:text-[32px] font-besley mb-2">
                  Event Photos
                </h2>
                <div className="horizontal-line"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-secondary text-primary px-4 py-2 rounded-full font-archivo font-medium">
                  {images.length} photo{images.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {loading ? (
              <LoadingSkeleton type="image" count={8} />
            ) : (
              <>
                <BulkActions
                  totalItems={images.length}
                  type="image"
                  onBulkDownload={() => bulkDownloadMedia(images, "image")}
                  className="mb-6"
                />
                <MediaGrid
                  items={images}
                  type="image"
                  onItemClick={(image) => openMediaViewer(image, "image")}
                  onDownload={(image) => downloadMedia(image, "image")}
                />
              </>
            )}
          </div>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-primary font-semibold text-2xl md:text-3xl lg:text-[32px] font-besley mb-2">
                  Event Videos
                </h2>
                <div className="horizontal-line"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-secondary text-primary px-4 py-2 rounded-full font-archivo font-medium">
                  {videos.length} video{videos.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {loading ? (
              <LoadingSkeleton type="video" count={6} />
            ) : (
              <>
                <BulkActions
                  totalItems={videos.length}
                  type="video"
                  onBulkDownload={() => bulkDownloadMedia(videos, "video")}
                  className="mb-6"
                />
                <MediaGrid
                  items={videos}
                  type="video"
                  onItemClick={(video) => openMediaViewer(video, "video")}
                  onDownload={(video) => downloadMedia(video, "video")}
                />
              </>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 lg:py-20">
            <div className="bg-surface rounded-2xl border border-red-500/20 p-12 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-red-400 text-xl font-semibold font-besley mb-3">
                Error Loading Media
              </h3>
              <div className="horizontal-line mx-auto mb-4 bg-red-500/30"></div>
              <p className="text-primary/80 font-archivo leading-relaxed mb-6">
                We encountered an issue loading the event media. Please try
                refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 font-archivo font-medium hover:scale-105"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && images.length === 0 && videos.length === 0 && !loading && (
          <div className="text-center py-16 lg:py-20">
            <div className="bg-surface rounded-2xl border border-[#FCFCFC1A] p-12 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 purple-gradient rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-primary text-xl font-semibold font-besley mb-3">
                No Media Available
              </h3>
              <div className="horizontal-line mx-auto mb-4"></div>
              <p className="text-primary/80 font-archivo leading-relaxed">
                Photos and videos from this event will appear here once they're
                uploaded. Check back soon for amazing memories!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia && mediaType && (
        <MediaViewer
          media={selectedMedia}
          type={mediaType}
          onClose={closeMediaViewer}
          onDownload={() => downloadMedia(selectedMedia, mediaType)}
        />
      )}
    </div>
  );
};

export default EventDetailView;
