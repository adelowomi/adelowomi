/* eslint-disable react/no-unknown-property */
"use client";

import React, { useEffect, useState } from "react";
import { ArrowIcon, HeroDecorativeIcon } from "@/icons";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useUpcomingEvents } from "@/hooks/useEvents";
import Image from "next/image";
import { getGoogleDriveImageUrl } from "@/lib/utils/file-helpers";

const EventHero = () => {
  const router = useRouter();
  const { events, loading, error } = useUpcomingEvents(1);
  const [timeLeft, setTimeLeft] = useState("");

  const redirectUser = (eventId?: string) => {
    if (eventId) {
      router.push(`/event/${eventId}/register`);
    } else {
      router.push("/event/register-event");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  const calculateTimeLeft = (eventDate: string) => {
    const now = new Date().getTime();
    const eventTime = new Date(eventDate).getTime();
    const difference = eventTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}d ${hours}h ${minutes}m`;
    }
    return "Event has started";
  };

  useEffect(() => {
    if (events && events.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(events[0].date));
      }, 60000); // Update every minute

      // Initial calculation
      setTimeLeft(calculateTimeLeft(events[0].date));

      return () => clearInterval(timer);
    }
  }, [events]);

  if (loading) {
    return (
      <div className="flex flex-col gap-20 px-28 py-24">
        <div className="flex flex-row justify-between">
          <div>
            <HeroDecorativeIcon />
          </div>
          <h2 className="text-primary text-[64px] font-besley font-semibold mt-8">
            EVENTS
          </h2>
        </div>
        <div className="flex justify-center items-center h-[554px]">
          <p className="text-primary text-xl">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !events || events.length === 0) {
    return (
      <div className="flex flex-col gap-20 px-28 py-24">
        <div className="flex flex-row justify-between">
          <div>
            <HeroDecorativeIcon />
          </div>
          <h2 className="text-primary text-[64px] font-besley font-semibold mt-8">
            EVENTS
          </h2>
        </div>
        <div className="flex justify-center items-center h-[554px]">
          <div className="text-center">
            <p className="text-primary text-xl mb-4">
              {error ? `Error: ${error}` : "No upcoming events available"}
            </p>
            <Button
              text="View All Events"
              svg={<ArrowIcon />}
              onClick={() => router.push("/event")}
            />
          </div>
        </div>
      </div>
    );
  }

  const upcomingEvent = events[0];

  return (
    <div className="flex flex-col gap-20 px-28 py-24">
      <div className="flex flex-row justify-between">
        <div>
          <HeroDecorativeIcon />
        </div>
        <h2 className="text-primary text-[64px] font-besley font-semibold mt-8">
          {upcomingEvent.title.toUpperCase()}
        </h2>
      </div>
      <div className="flex ">
        <div className="w-[580px] h-[554px] bg-primary p-8">
          <div className="w-[516px] h-[490px] rounded-lg bg-[#d9d9d9] flex justify-center items-center overflow-hidden">
            {upcomingEvent.flyerUrl ? (
              <Image
                src={getGoogleDriveImageUrl(upcomingEvent.flyerUrl)}
                alt={upcomingEvent.title}
                width={516}
                height={490}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <h2 className="text-center text-[48px] font-medium text-[#000] font-archivo">
                Event Flyer
              </h2>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[620px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] my-12 gap-10">
          <div className="flex justify-between">
            <div></div>
            <div className="py-3 px-6 rounded-bl-lg rounded-br-lg bg-[#FCFCFC1A]">
              <h1 className="text-primary text-lg font-medium font-archivo">
                Registration Ends in {timeLeft}
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-10 px-16">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-primary font-besley">
                {upcomingEvent.title}
              </h1>
              <hr className="horizontal-line" />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px] text-primary font-normal font-archivo">
                Date: {formatDate(upcomingEvent.date)}
              </h2>
              <h2 className="text-[20px] text-primary font-normal font-archivo">
                Time: {upcomingEvent.time}
              </h2>
              <h2 className="text-[20px] text-primary font-normal font-archivo">
                Venue: {upcomingEvent.venue}
              </h2>
            </div>
            <Button
              text="Register Now"
              svg={<ArrowIcon />}
              onClick={() => redirectUser(upcomingEvent.id)}
            />
          </div>

          <div className="flex justify-between">
            <div></div>
            <div className="px-6 py-4 rounded-lg bg-[#FCFCFC1A]">
              <h2 className="text-[20px] font-medium text-secondary font-archivo">
                {upcomingEvent.availableSpots} tickets left
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
