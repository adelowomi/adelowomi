import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Unplugged from "@/components/Music/Unplugged";
import VideoView from "@/components/Music/VideoView";
import MusicHero from "@/components/Music/MusicHero";

export const metadata: Metadata = {
  title: "Music | Adelowo Ajibola",
  description: "Discover music videos, performances, and creative content by Adelowo Ajibola. Explore the artistic side of tech.",
  openGraph: {
    title: "Music | Adelowo Ajibola",
    description: "Discover music videos, performances, and creative content by Adelowo Ajibola. Explore the artistic side of tech.",
  },
};

const Home = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto overflow-x-hidden">
      <Navbar />
      <MusicHero />
      <VideoView />
      <Unplugged />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
