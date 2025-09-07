/* eslint-disable react/no-unknown-property */
import React from "react";
import { HeroDecorativeIcon } from "@/icons";

const MusicHero = () => {
  return (
    <div className="bg-hero-pattern bg-cover bg-center flex flex-col gap-[533px]">
      <div className="flex justify-between items-center mx-28 mt-8">
        <div>
          <HeroDecorativeIcon />
        </div>
        <h1 className="text-primary text-[64px] font-semibold uppercase font-besley">
          Music
        </h1>
      </div>
      <div className="bg-[#0D0900] w-[1200px] px-6 py-12">
        <h1 className="text-primary uppercase text-[32px] font-semibold font-besley">
          Music is my therapy. What&apos;s yours?
        </h1>
        <p className="text-primary text-lg font-normal font-archivo">
          A full stack developer, crafting magnificent websites and
          applications. And when I&apos;m not coding, I unleash my creative
          spirit, diving headfirst into the world of music.
        </p>
      </div>
    </div>
  );
};

export default MusicHero;
