import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Testimonial from "@/components/Work/Testimonial";
import Portfolio from "@/components/Work/Portfolio";
import Expertise from "@/components/Work/Expertise";
import Experience from "@/components/Work/Experience";
import WorkHome from "@/components/Work/WorkHome";

export const metadata: Metadata = {
  title: "Work & Portfolio | Adelowo Ajibola - Senior Backend Developer",
  description: "Explore the professional work and expertise of Adelowo Ajibola, Senior Backend Developer at ExamRoom.AI. View portfolio of projects including GAC Motors, Skillbase E-Learning, and enterprise applications built with .NET Core, React.js, and modern technologies.",
  openGraph: {
    title: "Work & Portfolio | Adelowo Ajibola - Senior Backend Developer",
    description: "Explore the professional work and expertise of Adelowo Ajibola, Senior Backend Developer at ExamRoom.AI. View portfolio of projects including GAC Motors, Skillbase E-Learning, and enterprise applications built with .NET Core, React.js, and modern technologies.",
  },
};

const Home = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto overflow-x-hidden">
      <Navbar />
      <WorkHome />
      <Expertise />
      <Experience />
      <Portfolio />
      {/* <Testimonial /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
