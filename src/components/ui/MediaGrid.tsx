"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  driveUrl: string;
}

interface MediaGridProps {
  items: MediaItem[];
  type: "image" | "video";
  onItemClick: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
  loading?: boolean;
}

const ITEMS_PER_PAGE = 20;
const ITEMS_PER_LOAD = 12; // For "Load More" functionality

const MediaGrid = ({
  items,
  type,
  onItemClick,
  onDownload,
  loading = false,
}: MediaGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"paginated" | "loadMore">(
    "paginated"
  );
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_LOAD);

  // Pagination logic
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    if (viewMode === "paginated") {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    } else {
      return items.slice(0, loadedItems);
    }
  }, [items, currentPage, viewMode, loadedItems]);

  const handleLoadMore = () => {
    setLoadedItems((prev) => Math.min(prev + ITEMS_PER_LOAD, items.length));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of media section
    document.getElementById(`${type}-section`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderPaginationControls = () => {
    if (items.length <= ITEMS_PER_PAGE) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#FCFCFC1A]">
        <div className="text-sm text-secondary font-archivo">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, items.length)} of{" "}
          {items.length} {type}s
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-surface border border-[#FCFCFC1A] text-primary hover:bg-[#FCFCFC0A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-4 h-4"
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
          </button>

          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-secondary">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 rounded-lg transition-colors font-archivo ${
                      currentPage === page
                        ? "purple-gradient text-white shadow-lg"
                        : "bg-surface border border-[#FCFCFC1A] text-primary hover:bg-[#FCFCFC0A]"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-surface border border-[#FCFCFC1A] text-primary hover:bg-[#FCFCFC0A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-4 h-4"
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
          </button>
        </div>
      </div>
    );
  };

  const renderLoadMoreControls = () => {
    if (loadedItems >= items.length) return null;

    return (
      <div className="text-center mt-8 pt-6 border-t border-[#FCFCFC1A]">
        <div className="text-sm text-secondary font-archivo mb-4">
          Showing {loadedItems} of {items.length} {type}s
        </div>
        <button
          onClick={handleLoadMore}
          className="px-6 py-3 purple-gradient text-white rounded-xl font-archivo font-medium hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
        >
          Load More {type === "image" ? "Photos" : "Videos"} (
          {Math.min(ITEMS_PER_LOAD, items.length - loadedItems)} more)
        </button>
      </div>
    );
  };

  const renderViewModeToggle = () => {
    if (items.length <= ITEMS_PER_PAGE) return null;

    return (
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-secondary font-archivo">View:</span>
        <div className="flex bg-surface rounded-lg border border-[#FCFCFC1A] p-1">
          <button
            onClick={() => {
              setViewMode("paginated");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded text-sm font-archivo transition-colors ${
              viewMode === "paginated"
                ? "purple-gradient text-white"
                : "text-secondary hover:text-primary"
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => {
              setViewMode("loadMore");
              setLoadedItems(ITEMS_PER_LOAD);
            }}
            className={`px-3 py-1.5 rounded text-sm font-archivo transition-colors ${
              viewMode === "loadMore"
                ? "purple-gradient text-white"
                : "text-secondary hover:text-primary"
            }`}
          >
            Load More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div id={`${type}-section`}>
      {renderViewModeToggle()}

      <div
        className={`grid gap-4 lg:gap-6 ${
          type === "image"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {paginatedItems.map((item, index) => (
          <MediaGridItem
            key={item.id}
            item={item}
            type={type}
            index={index}
            onItemClick={onItemClick}
            onDownload={onDownload}
          />
        ))}
      </div>

      {viewMode === "paginated"
        ? renderPaginationControls()
        : renderLoadMoreControls()}
    </div>
  );
};

interface MediaGridItemProps {
  item: MediaItem;
  type: "image" | "video";
  index: number;
  onItemClick: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
}

const MediaGridItem = ({
  item,
  type,
  index,
  onItemClick,
  onDownload,
}: MediaGridItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectRatio = type === "image" ? "aspect-square" : "aspect-video";

  return (
    <div
      className={`group relative ${aspectRatio} rounded-xl overflow-hidden bg-surface border border-[#FCFCFC1A] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20`}
      onClick={() => onItemClick(item)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {type === "image" ? (
        <>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {imageError ? (
            <div className="flex items-center justify-center h-full bg-surface">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-red-400 text-xs font-archivo">
                  Failed to load
                </p>
              </div>
            </div>
          ) : (
            <Image
              src={item.thumbnailUrl || item.imageUrl || item.driveUrl}
              alt={item.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </>
      ) : (
        <>
          {item.thumbnailUrl ? (
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full surface-gradient">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 purple-gradient rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l8-5-8-5z" />
                  </svg>
                </div>
                <p className="text-primary text-sm font-archivo font-medium">
                  Video Content
                </p>
              </div>
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-purple-600/80 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-sm font-semibold font-archivo mb-2 line-clamp-2">
            {item.title}
          </h3>
          {item.description && type === "video" && (
            <p className="text-white/80 text-xs font-archivo line-clamp-2 mb-3">
              {item.description}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(item);
              }}
              className="flex items-center gap-1 text-white text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/20"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                {type === "image" ? (
                  <>
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </>
                ) : (
                  <path d="M8 5v10l8-5-8-5z" />
                )}
              </svg>
              {type === "image" ? "View" : "Play"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(item);
              }}
              className="flex items-center gap-1 text-white text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/20"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Media type indicator */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {type === "image" ? (
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          ) : (
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          )}
        </svg>
      </div>
    </div>
  );
};

export default MediaGrid;
