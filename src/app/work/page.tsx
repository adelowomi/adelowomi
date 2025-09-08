import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import Testimonial from "@/components/Work/Testimonial";
import Portfolio from "@/components/Work/Portfolio";
import Expertise from "@/components/Work/Expertise";
import WorkHome from "@/components/Work/WorkHome";

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
