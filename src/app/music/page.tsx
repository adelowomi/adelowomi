import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Unplugged from "@/components/Music/Unplugged";
import VideoView from "@/components/Music/VideoView";
import MusicHero from "@/components/Music/MusicHero";

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
