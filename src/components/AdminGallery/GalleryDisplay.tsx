// This component is deprecated - use GalleryManagement instead
import React from "react";
import AdminGalleryCard from "../ui/AdminGalleryCard";

const GalleryDisplay = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <AdminGalleryCard />
      <AdminGalleryCard />
      <AdminGalleryCard />
      <AdminGalleryCard />
      <AdminGalleryCard />
      <AdminGalleryCard />
    </div>
  );
};

export default GalleryDisplay;
