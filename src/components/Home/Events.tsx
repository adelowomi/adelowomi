/* eslint-disable react/no-unknown-property */
"use client";

import React from "react";
import Button from "../ui/Button";
import { ArrowIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { useUpcomingEvents } from "@/hooks/useEvents";
import Image from "next/image";

const Events = () => {
  const router = useRouter();
  const { events, loading, error } = useUpcomingEvents(1);

  const redirectUser = (eventId?: string) => {
    if (eventId) {
      router.push(`/event/${eventId}/register`);
    } else {
      router.push("/event");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  if (loading) {
    return (
      <div className="px-28 py-24 flex flex-col gap-20">
        <h1 className="text-primary text-center font-semibold text-[48px] uppercase font-besley">
          Upcoming Event
        </h1>
        <div className="flex justify-center items-center h-[554px]">
          <p className="text-primary text-xl">Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-28 py-24 flex flex-col gap-20">
        <h1 className="text-primary text-center font-semibold text-[48px] uppercase font-besley">
          Upcoming Event
        </h1>
        <div className="flex justify-center items-center h-[554px]">
          <p className="text-red-500 text-xl">Error loading events: {error}</p>
        </div>
      </div>
    );
  }

  const upcomingEvent = events[0];

  if (!upcomingEvent) {
    return (
      <div className="px-28 py-24 flex flex-col gap-20">
        <h1 className="text-primary text-center font-semibold text-[48px] uppercase font-besley">
          Upcoming Event
        </h1>
        <div className="flex justify-center items-center h-[554px]">
          <div className="text-center">
            <p className="text-primary text-xl mb-4">
              No upcoming events at the moment
            </p>
            <Button
              text="View All Events"
              svg={<ArrowIcon />}
              onClick={() => redirectUser()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-28 py-24 flex flex-col gap-20">
      <h1 className="text-primary text-center font-semibold text-[48px] uppercase font-besley">
        Upcoming Event
      </h1>
      <div className="flex ">
        <div className="w-[580px] h-[554px] bg-primary p-8">
          <div className="w-[516px] h-[490px] rounded-lg bg-[#d9d9d9] flex justify-center items-center overflow-hidden">
            {upcomingEvent.flyerUrl ? (
              <Image
                src={upcomingEvent.flyerUrl}
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
        <div className="flex flex-col w-[620px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] px-28 pt-12 pb-16 my-10">
          <h1 className="text-3xl font-semibold text-primary mb-4 font-besley">
            {upcomingEvent.title}
          </h1>
          <hr className="horizontal-line" />
          <div className="flex flex-col gap-4 my-10">
            <span className="font-archivo text-[20px] font-medium text-primary">
              Date: {formatDate(upcomingEvent.date)}
            </span>
            <span className="font-archivo text-[20px] font-medium text-primary">
              Time: {upcomingEvent.time}
            </span>
            <span className="font-archivo text-[20px] font-medium text-primary">
              Venue: {upcomingEvent.venue}
            </span>
            <span className="font-archivo text-[16px] font-normal text-secondary">
              {upcomingEvent.availableSpots} spots available
            </span>
          </div>
          <Button
            text="Register Now"
            svg={<ArrowIcon />}
            onClick={() => redirectUser(upcomingEvent.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
