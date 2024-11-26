import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Events from "@/components/Home/Events";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";

export default function Home() {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}
