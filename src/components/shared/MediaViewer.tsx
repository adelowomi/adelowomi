"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface MediaViewerProps {
  media: {
    id: string;
    title: string;
    description?: string;
    driveUrl: string;
    thumbnailUrl?: string;
    imageUrl?: string;
  };
  type: "image" | "video";
  onClose: () => void;
  onDownload: () => void;
}

const MediaViewer = ({
  media,
  type,
  onClose,
  onDownload,
}: MediaViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMediaLoad = () => {
    setIsLoading(false);
    setError(null);
    setDebugInfo((prev) => [...prev, `${type} loaded successfully`]);
  };

  const handleMediaError = (errorMsg?: string) => {
    setIsLoading(false);
    const message = errorMsg || "Failed to load media";
    setError(message);
    setDebugInfo((prev) => [...prev, `Error: ${message}`]);
  };

  // Convert Google Drive URL to direct access URL for better viewing
  const getDirectUrl = (driveUrl: string, mediaType: "image" | "video") => {
    if (driveUrl.includes("drive.google.com")) {
      const fileId =
        driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
        driveUrl.match(/id=([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        if (mediaType === "video") {
          // For videos, try multiple URL formats for better compatibility
          // First try the direct streaming URL
          return `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
        } else {
          // For images, use the view URL
          return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
      }
    }
    return driveUrl;
  };

  const directUrl = getDirectUrl(media.driveUrl, type);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-7xl max-h-full w-full h-full flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-black/60 backdrop-blur-md rounded-t-2xl border border-white/10">
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-xl font-semibold font-besley truncate mb-1">
              {media.title}
            </h2>
            {media.description && (
              <p className="text-white/70 text-sm font-archivo line-clamp-2 leading-relaxed">
                {media.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 ml-6 flex-shrink-0">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 font-archivo font-medium"
              title="Download media"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download
            </button>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 hover:scale-105"
              title="Close viewer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Media Content */}
        <div className="flex-1 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-b-2xl relative border-x border-b border-white/10 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-white text-lg font-archivo">
                Loading {type}...
              </div>
              <div className="text-white/60 text-sm font-archivo mt-1">
                Please wait
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-400"
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
                <div className="text-red-400 text-lg font-besley mb-2">
                  Failed to load {type}
                </div>
                <p className="text-white/60 text-sm font-archivo mb-4">
                  There was an error loading this media file
                </p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-archivo font-medium hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {type === "image" ? (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={media.imageUrl || directUrl}
                alt={media.title}
                fill
                className="object-contain drop-shadow-2xl"
                onLoad={handleMediaLoad}
                onError={handleMediaError}
                priority
              />
            </div>
          ) : (
            <VideoPlayer
              src={directUrl}
              fallbackSrc={media.driveUrl}
              title={media.title}
              onLoad={handleMediaLoad}
              onError={(msg) => handleMediaError(msg)}
            />
          )}
        </div>

        {/* Navigation hints */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="flex items-center gap-2 text-white/70 text-sm font-archivo">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
              ESC
            </kbd>
            <span>Close</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2 text-white/70 text-sm font-archivo">
            <span>Click outside to close</span>
          </div>
        </div>

        {/* Debug Panel for Development */}
        {process.env.NODE_ENV === "development" && type === "video" && (
          <div className="absolute top-20 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 max-w-xs">
            <h4 className="text-white text-xs font-semibold mb-2">
              Debug Info
            </h4>
            <div className="text-white/70 text-xs space-y-1">
              <p>Original URL: {media.driveUrl.substring(0, 50)}...</p>
              <p>Direct URL: {directUrl.substring(0, 50)}...</p>
              <p>Type: {type}</p>
              {debugInfo.map((info, i) => (
                <p key={i} className="text-green-400">
                  {info}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface VideoPlayerProps {
  src: string;
  fallbackSrc: string;
  title: string;
  onLoad: () => void;
  onError: (message?: string) => void;
}

const VideoPlayer = ({
  src,
  fallbackSrc,
  title,
  onLoad,
  onError,
}: VideoPlayerProps) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [hasTriedFallback, setHasTriedFallback] = React.useState(false);
  const [showEmbedFallback, setShowEmbedFallback] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.log("Video error:", e);
    if (!hasTriedFallback && fallbackSrc !== src) {
      console.log("Trying fallback source:", fallbackSrc);
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else if (!showEmbedFallback && fallbackSrc.includes("drive.google.com")) {
      console.log("Switching to embed player");
      setShowEmbedFallback(true);
    } else {
      console.log("All video sources failed");
      onError("All video sources failed to load");
    }
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
    onLoad();
  };

  const getEmbedUrl = (driveUrl: string) => {
    const fileId =
      driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
      driveUrl.match(/id=([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return driveUrl;
  };

  // If it's a Google Drive URL, try the embed player first for better compatibility
  if (showEmbedFallback && fallbackSrc.includes("drive.google.com")) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full max-w-4xl max-h-[80vh] bg-black rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={getEmbedUrl(fallbackSrc)}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            onLoad={onLoad}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              setShowEmbedFallback(false);
              setHasTriedFallback(false);
              setCurrentSrc(src);
            }}
            className="px-3 py-2 bg-black/60 backdrop-blur-sm text-white rounded-lg text-sm font-archivo hover:bg-black/80 transition-colors"
          >
            Try Direct Player
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <video
        key={currentSrc} // Force re-render when src changes
        controls
        className="max-w-full max-h-full rounded-xl shadow-2xl"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={() => console.log("Video can play")}
        preload="metadata"
        style={{ maxHeight: "calc(100vh - 200px)" }}
        controlsList="nodownload"
        playsInline
        muted={false}
      >
        <source src={currentSrc} type="video/mp4" />
        <source
          src={currentSrc.replace(/\.[^/.]+$/, ".webm")}
          type="video/webm"
        />
        <source
          src={currentSrc.replace(/\.[^/.]+$/, ".ogg")}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>

      {/* Fallback options */}
      {!videoLoaded && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white/90 text-sm font-archivo mb-3">
              Having trouble playing the video?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {fallbackSrc.includes("drive.google.com") && (
                <button
                  onClick={() => setShowEmbedFallback(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-archivo transition-colors"
                >
                  Try Google Drive Player
                </button>
              )}
              <button
                onClick={() => window.open(currentSrc, "_blank")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-archivo transition-colors"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;
