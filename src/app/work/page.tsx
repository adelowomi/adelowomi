import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Testimonial from "@/components/Work/Testimonial";
import Portfolio from "@/components/Work/Portfolio";
import Expertise from "@/components/Work/Expertise";
import WorkHome from "@/components/Work/WorkHome";

export const metadata: Metadata = {
  title: "Work & Portfolio | Adelowo Ajibola",
  description: "Explore the professional work, projects, and expertise of Adelowo Ajibola. View portfolio, testimonials, and technical skills.",
  openGraph: {
    title: "Work & Portfolio | Adelowo Ajibola",
    description: "Explore the professional work, projects, and expertise of Adelowo Ajibola. View portfolio, testimonials, and technical skills.",
  },
};

const Home = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto overflow-x-hidden">
      <Navbar />
      <WorkHome />
      <Expertise />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
