import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import GalleryGrid from "@/components/Gallery/GalleryGrid";

const GalleryPage = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      <GalleryGrid />
      <Contact />
      <Footer />
    </div>
  );
};

export default GalleryPage;
