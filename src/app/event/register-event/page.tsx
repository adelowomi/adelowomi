"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUpcomingEvents } from "@/hooks/useEvents";

const RegisterEventRedirect = () => {
  const router = useRouter();
  const { events, loading } = useUpcomingEvents(1);

  useEffect(() => {
    if (!loading) {
      if (events.length > 0) {
        // Redirect to the first upcoming event's registration page
        router.replace(`/event/${events[0].id}/register`);
      } else {
        // No upcoming events, redirect to events page
        router.replace("/event");
      }
    }
  }, [events, loading, router]);

  return (
    <div className="max-w-[1440px] my-0 mx-auto flex justify-center items-center min-h-screen">
      <p className="text-primary text-xl">
        Redirecting to event registration...
      </p>
    </div>
  );
};

export default RegisterEventRedirect;
