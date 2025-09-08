/* eslint-disable react/no-unknown-property */
import React from "react";
import Image from "next/image";
import { HeroDecorativeIcon } from "@/icons";

const Hero = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col px-6 sm:px-12 lg:px-28 py-8 lg:py-16">
          <div>
            <HeroDecorativeIcon />
          </div>
          <h1 className="w-full max-w-[519px] text-primary text-4xl sm:text-6xl lg:text-[96px] mt-4 lg:mt-8 font-besley leading-tight">
            Adelowo Ajibola
          </h1>
          <h1 className="mt-8 lg:mt-[258px] purple-gradient-text text-2xl sm:text-3xl lg:text-[48px] font-semibold font-besley">
            HELLO!
          </h1>
        </div>
        <div className="flex justify-center lg:justify-start px-6 lg:px-0">
          <Image
            src="/assets/hero.png"
            alt=""
            width={600}
            height={700}
            className="w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-[600px] h-auto"
          />
        </div>
      </div>
      <div className="px-6 sm:px-12 lg:px-28 w-full lg:w-[80%] space-y-3">
        <h2 className="text-primary font-medium text-xl sm:text-2xl lg:text-3xl font-besley">
          I'M DELIGHTED TO INTRODUCE MYSELF
        </h2>
        <p className="text-primary font-normal text-base lg:text-lg font-archivo">
          A full stack developer, crafting magnificent websites and
          applications. And when I&apos;m not coding, I unleash my creative
          spirit, diving headfirst into the world of music.
        </p>
      </div>
    </div>
  );
};

export default Hero;
