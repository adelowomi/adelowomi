import React from "react";
import MusicCard from "../ui/MusicCard";

const Unplugged = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-28 py-12 sm:py-18 lg:py-24 flex flex-col">
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-primary text-2xl sm:text-3xl lg:text-[40px] font-semibold font-besley mb-4">
          ADELOWO UNPLUGGED
        </h1>
        <hr className="horizontal-line" />
        <p className="text-primary text-base sm:text-lg font-normal max-w-full lg:max-w-[917px] font-archivo mt-4">
          A full stack developer, crafting magnificent websites and
          applications. And when I&apos;m not coding, I unleash my creative
          spirit, diving headfirst into the world of music.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 justify-items-center">
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
      </div>
    </div>
  );
};

export default Unplugged;
