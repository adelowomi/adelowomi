"use client";

import React, { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import Button from "../ui/Button";
import { ArrowIcon } from "@/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmptyEventState from "./EmptyEventState";
import { getGoogleDriveImageUrl } from "@/lib/utils/file-helpers";

const EventsList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { events, loading, error, pagination } = useEvents({
    page: currentPage,
    limit: 6,
    status: "ACTIVE",
    search: searchTerm,
  });

  // Filter out the first event (featured in hero) if no search is active
  const filteredEvents = searchTerm ? events : events?.slice(1) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const redirectToRegister = (eventId: string) => {
    router.push(`/event/${eventId}/register`);
  };

  if (loading && (!events || events.length === 0)) {
    return (
      <div className="px-28 py-24">
        <div className="flex justify-center items-center h-64">
          <p className="text-primary text-xl">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-28 py-24">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-primary font-semibold text-[48px] uppercase font-besley mb-4">
            Upcoming Events
          </h1>
          <p className="text-primary font-archivo text-lg max-w-2xl mx-auto">
            Join us for exciting events designed to help you grow in your tech
            career
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 w-80 rounded-lg bg-[bg-surface] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary text-[16px]"
            />
            <Button text="Search" type="submit" width="w-32" />
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 text-lg">
              Error loading events: {error}
            </p>
          </div>
        )}

        {/* Events Grid */}
        {events && events.length > 0 ? (
          <div className="flex flex-col gap-12">
            {/* Featured Event - Only show when no search is active */}
            {!searchTerm && events.length > 0 && (
              <div className="mb-8">
                <h2 className="text-primary font-besley text-3xl font-semibold mb-6 text-center">
                  Featured Event
                </h2>
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FCFCFC0A] to-[#FCFCFC1A] rounded-2xl border border-[#FCFCFC33] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row">
                    {/* Featured Event Image */}
                    <div className="lg:w-1/2 h-80 lg:h-96 bg-primary p-6">
                      <div className="w-full h-full rounded-xl bg-[#d9d9d9] flex justify-center items-center overflow-hidden">
                        {events[0].flyerUrl ? (
                          <Image
                            src={getGoogleDriveImageUrl(events[0].flyerUrl)}
                            alt={events[0].title}
                            width={500}
                            height={400}
                            className="object-cover w-full h-full rounded-xl"
                          />
                        ) : (
                          <span className="text-[#000] font-archivo text-2xl font-medium">
                            Event Flyer
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Featured Event Details */}
                    <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium font-archivo">
                            Next Event
                          </span>
                          <span className="text-secondary font-archivo text-sm font-medium">
                            {events[0].availableSpots} spots left
                          </span>
                        </div>

                        <h3 className="text-primary font-besley text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                          {events[0].title}
                        </h3>

                        <div className="flex flex-col gap-3 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <p className="text-primary font-archivo text-lg">
                              <span className="font-semibold">Date:</span>{" "}
                              {formatDate(events[0].date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <p className="text-primary font-archivo text-lg">
                              <span className="font-semibold">Time:</span>{" "}
                              {events[0].time}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <p className="text-primary font-archivo text-lg">
                              <span className="font-semibold">Venue:</span>{" "}
                              {events[0].venue}
                            </p>
                          </div>
                        </div>

                        {events[0].description && (
                          <p className="text-primary font-archivo text-base mb-6 line-clamp-4 leading-relaxed">
                            {events[0].description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-primary font-archivo">
                            {events[0].registrationCount}/{events[0].capacity}{" "}
                            registered
                          </span>
                          <div className="w-32 bg-[#FCFCFC1A] rounded-full h-2">
                            <div
                              className="bg-secondary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (events[0].registrationCount /
                                    events[0].capacity) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            text="View Details"
                            width="flex-1"
                            onClick={() =>
                              router.push(`/event/${events[0].id}`)
                            }
                            textStyle="text-primary"
                            bgColor="bg-transparent border border-primary hover:bg-primary/10"
                          />
                          <Button
                            text="Register Now"
                            svg={<ArrowIcon />}
                            width="flex-1"
                            onClick={() => redirectToRegister(events[0].id)}
                            disabled={events[0].availableSpots <= 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Events Grid */}
            {filteredEvents && filteredEvents.length > 0 && (
              <div>
                <h2 className="text-primary font-besley text-2xl font-semibold mb-6 text-center">
                  {searchTerm ? "Search Results" : "Other Upcoming Events"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-[bg-surface] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Event Image */}
                      <div className="h-48 bg-primary p-4">
                        <div className="w-full h-full rounded-lg bg-[#d9d9d9] flex justify-center items-center overflow-hidden">
                          {event.flyerUrl ? (
                            <Image
                              src={getGoogleDriveImageUrl(event.flyerUrl)}
                              alt={event.title}
                              width={300}
                              height={200}
                              className="object-cover w-full h-full rounded-lg"
                            />
                          ) : (
                            <span className="text-[#000] font-archivo text-lg font-medium">
                              Event Flyer
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="p-6">
                        <h3 className="text-primary font-besley text-xl font-semibold mb-3 line-clamp-2">
                          {event.title}
                        </h3>

                        <div className="flex flex-col gap-2 mb-4">
                          <p className="text-primary font-archivo text-sm">
                            <span className="font-medium">Date:</span>{" "}
                            {formatDate(event.date)}
                          </p>
                          <p className="text-primary font-archivo text-sm">
                            <span className="font-medium">Time:</span>{" "}
                            {event.time}
                          </p>
                          <p className="text-primary font-archivo text-sm">
                            <span className="font-medium">Venue:</span>{" "}
                            {event.venue}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-secondary font-archivo text-sm font-medium">
                            {event.availableSpots} spots left
                          </span>
                          <span className="text-primary font-archivo text-sm">
                            {event.registrationCount}/{event.capacity}{" "}
                            registered
                          </span>
                        </div>

                        {event.description && (
                          <p className="text-primary font-archivo text-sm mb-4 line-clamp-3">
                            {event.description}
                          </p>
                        )}

                        <div className="flex flex-col gap-2">
                          <Button
                            text="View Details"
                            width="w-full"
                            onClick={() => router.push(`/event/${event.id}`)}
                            textStyle="text-primary"
                            bgColor="bg-transparent border border-primary hover:bg-primary/10"
                          />
                          <Button
                            text="Register Now"
                            svg={<ArrowIcon />}
                            width="w-full"
                            onClick={() => redirectToRegister(event.id)}
                            disabled={event.availableSpots <= 0}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          !loading && (
            <EmptyEventState
              title={searchTerm ? "No Events Found" : "No Upcoming Events"}
              message={
                searchTerm
                  ? `No events found matching "${searchTerm}". Try adjusting your search terms.`
                  : "There are currently no upcoming events scheduled. Check back later for new events!"
              }
              buttonText={searchTerm ? "Clear Search" : "Go to Home"}
              onButtonClick={() => {
                if (searchTerm) {
                  setSearchTerm("");
                  setCurrentPage(1);
                } else {
                  router.push("/");
                }
              }}
            />
          )
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              text="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              width="w-32"
            />

            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-archivo text-sm transition-all duration-300 ${
                    currentPage === page
                      ? "bg-primary text-secondary font-medium"
                      : "bg-[bg-surface] text-primary border border-[#FCFCFC33] hover:bg-primary/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              text="Next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              width="w-32"
            />
          </div>
        )}

        {/* Loading indicator for pagination */}
        {loading && events && events.length > 0 && (
          <div className="text-center">
            <p className="text-primary text-sm">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
