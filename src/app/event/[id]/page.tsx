import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import EventDetailView from "@/components/Event/EventDetailView";
import { EventService } from "@/lib/services/event.service";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

const EventDetailPage = async ({ params }: EventDetailPageProps) => {
  try {
    const event = await EventService.getEventById(params.id);

    if (!event) {
      notFound();
    }

    return (
      <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <EventDetailView event={event} />
        <Contact />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
};

export default EventDetailPage;
