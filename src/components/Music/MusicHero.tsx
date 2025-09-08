/* eslint-disable react/no-unknown-property */
import React from "react";
import { HeroDecorativeIcon } from "@/icons";

const MusicHero = () => {
  return (
    <div className="bg-hero-pattern bg-cover bg-center flex flex-col gap-32 sm:gap-64 lg:gap-[533px] min-h-screen">
      <div className="flex justify-between items-center px-6 sm:px-12 lg:px-28 mt-4 sm:mt-6 lg:mt-8">
        <div>
          <HeroDecorativeIcon />
        </div>
        <h1 className="text-primary text-2xl sm:text-4xl lg:text-[64px] font-semibold uppercase font-besley">
          Music
        </h1>
      </div>
      <div className="bg-[#0D0900] w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
        <h1 className="text-primary uppercase text-xl sm:text-2xl lg:text-[32px] font-semibold font-besley mb-4">
          Music is my therapy. What&apos;s yours?
        </h1>
        <p className="text-primary text-base sm:text-lg font-normal font-archivo">
          A full stack developer, crafting magnificent websites and
          applications. And when I&apos;m not coding, I unleash my creative
          spirit, diving headfirst into the world of music.
        </p>
      </div>
    </div>
  );
};

export default MusicHero;
