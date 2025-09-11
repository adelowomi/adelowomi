import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import GalleryGrid from "@/components/Gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Adelowo Ajibola",
  description: "Explore photos and memories from events, workshops, and tech meetups organized by Adelowo Ajibola.",
  openGraph: {
    title: "Gallery | Adelowo Ajibola",
    description: "Explore photos and memories from events, workshops, and tech meetups organized by Adelowo Ajibola.",
  },
};

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
