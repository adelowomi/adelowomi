import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
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

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  try {
    const event = await EventService.getEventById(params.id);

    if (!event) {
      return {
        title: "Event Not Found | Adelowo Ajibola",
        description: "The requested event could not be found.",
      };
    }

    return {
      title: `${event.title} | Adelowo Ajibola`,
      description: event.description || `Join us for ${event.title}. An exciting event by Adelowo Ajibola.`,
      openGraph: {
        title: `${event.title} | Adelowo Ajibola`,
        description: event.description || `Join us for ${event.title}. An exciting event by Adelowo Ajibola.`,
        images: event.flyerUrl ? [event.flyerUrl] : [],
      },
    };
  } catch {
    return {
      title: "Event | Adelowo Ajibola",
      description: "Event details by Adelowo Ajibola.",
    };
  }
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
