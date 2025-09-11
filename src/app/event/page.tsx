import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import EventsList from "@/components/Event/EventsList";

export const metadata: Metadata = {
  title: "Events | Adelowo Ajibola",
  description: "Discover upcoming and past events organized by Adelowo Ajibola. Join tech meetups, workshops, and community gatherings.",
  openGraph: {
    title: "Events | Adelowo Ajibola",
    description: "Discover upcoming and past events organized by Adelowo Ajibola. Join tech meetups, workshops, and community gatherings.",
  },
};

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
