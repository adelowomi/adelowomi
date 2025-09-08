"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "@/icons";
import Button from "@/components/ui/Button";
import GalleryGrid from "./GalleryGrid";
import UploadImageModal from "./UploadImageModal";
import GalleryFilters from "./GalleryFilters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { GalleryImage } from "@/types/event.types";

interface GalleryFiltersState {
  search: string;
  eventId: string;
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<GalleryFiltersState>({
    search: "",
    eventId: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch gallery images
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      if (filters.search) queryParams.append("search", filters.search);
      if (filters.eventId) queryParams.append("eventId", filters.eventId);

      const response = await fetch(`/api/admin/gallery?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch gallery images");
      }

      const data = await response.json();

      if (data.success) {
        setImages(data.data);
        if (data.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: data.pagination.total,
            totalPages: data.pagination.totalPages,
          }));
        }
      } else {
        throw new Error(data.message || "Failed to fetch images");
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload success
  const handleUploadSuccess = (newImages: GalleryImage[]) => {
    setImages((prev) => [...newImages, ...prev]);
    setShowUploadModal(false);
    // Update pagination total
    setPagination((prev) => ({
      ...prev,
      total: prev.total + newImages.length,
    }));
  };

  // Handle image deletion
  const handleImageDelete = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      // Remove image from state
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
      }));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError(err instanceof Error ? err.message : "Failed to delete image");
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: Partial<GalleryFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Fetch images when filters or pagination change
  useEffect(() => {
    fetchImages();
  }, [filters, pagination.page]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-primary text-[32px] font-semibold font-besley">
          Gallery Management
        </h1>
        <hr className="horizontal-line" />
      </div>

      {/* Actions and Filters */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-primary font-archivo text-sm sm:text-base">
              {pagination.total} images total
            </span>
          </div>
          <Button
            text="Upload Image"
            svg={<PlusIcon />}
            onClick={() => setShowUploadModal(true)}
            textStyle="text-sm sm:text-[16px] font-normal text-primary font-archivo"
            padding="px-4 sm:px-6 py-2 sm:py-3"
          />
        </div>

        <GalleryFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
          <div className="text-primary/60 font-archivo text-base sm:text-lg mb-4">
            No images found
          </div>
          <Button
            text="Upload First Image"
            svg={<PlusIcon />}
            onClick={() => setShowUploadModal(true)}
            textStyle="text-sm font-normal text-primary font-archivo"
            padding="px-4 py-2"
          />
        </div>
      ) : (
        <>
          <GalleryGrid images={images} onImageDelete={handleImageDelete} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                text="Previous"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                textStyle="text-sm font-normal text-primary font-archivo"
                padding="px-3 sm:px-4 py-2"
              />
              <span className="text-primary font-archivo text-sm sm:text-base">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                text="Next"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                textStyle="text-sm font-normal text-primary font-archivo"
                padding="px-3 sm:px-4 py-2"
              />
            </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadImageModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default GalleryManagement;
