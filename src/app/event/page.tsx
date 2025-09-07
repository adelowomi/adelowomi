import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import EventsList from "@/components/Event/EventsList";
import EventHero from "@/components/Event/EventHero";

const EventsPage = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      {/* <EventHero /> */}
      <EventsList />
      <Contact />
      <Footer />
    </div>
  );
};

export default EventsPage;
