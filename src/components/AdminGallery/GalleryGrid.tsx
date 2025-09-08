"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types/event.types";
import Button from "@/components/ui/Button";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageDelete: (imageId: string) => void;
}

const DeleteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z"
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z"
      fill="currentColor"
    />
  </svg>
);

const ViewIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
      fill="currentColor"
    />
  </svg>
);

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageDelete }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.driveUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${image.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDelete = (imageId: string) => {
    if (deleteConfirm === imageId) {
      onImageDelete(imageId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(imageId);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg overflow-hidden bg-black/20 hover:bg-black/40 transition-colors"
          >
            {/* Image */}
            <div className="relative aspect-square bg-[#8F8C8C] overflow-hidden">
              <Image
                src={image.thumbnailUrl || image.driveUrl}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedImage(image)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title="View full size"
                >
                  <ViewIcon />
                </button>
                <button
                  onClick={() => handleDownload(image)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title="Download"
                >
                  <DownloadIcon />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className={`p-2 rounded-full text-white transition-colors ${
                    deleteConfirm === image.id
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-white/20 hover:bg-red-500/50"
                  }`}
                  title={
                    deleteConfirm === image.id
                      ? "Click again to confirm"
                      : "Delete"
                  }
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>

            {/* Image Info */}
            <div className="p-3 sm:p-4">
              <h3 className="text-primary font-archivo font-medium text-xs sm:text-sm mb-2 truncate">
                {image.title}
              </h3>
              <div className="flex flex-col gap-1 text-xs text-primary/60 font-archivo">
                <span>Uploaded: {formatDate(image.createdAt)}</span>
                {image.event && (
                  <span className="text-primary/80 truncate">
                    Event: {image.event.title}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Size Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage.driveUrl}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
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
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded">
              <h3 className="font-medium mb-1">{selectedImage.title}</h3>
              <p className="text-sm opacity-80">
                Uploaded: {formatDate(selectedImage.createdAt)}
                {selectedImage.event &&
                  ` • Event: ${selectedImage.event.title}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
