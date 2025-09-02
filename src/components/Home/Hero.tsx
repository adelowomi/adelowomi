/* eslint-disable react/no-unknown-property */
import React from "react";
import Image from "next/image";
import { LogoTertiaryIcon } from "@/icons";

const Hero = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-row">
        <div className="flex flex-col px-28 py-16">
          <div>
            <LogoTertiaryIcon />
          </div>
          <h1 className="w-[519px] text-primary text-[96px] mt-8 font-besley">
            Adelowo Ajibola
          </h1>
          <h1 className="mt-[258px] purple-gradient-text text-[48px] font-semibold font-besley">
            HELLO!
          </h1>
        </div>
        <div>
          <Image src="/assets/hero.png" alt="" width={600} height={700} />
        </div>
      </div>
      <div className="px-28 w-[80%] space-y-3">
        <h2 className="text-primary font-medium text-3xl font-besley">
          I’M DELIGHTED TO INTRODUCE MYSELF
        </h2>
        <p className="text-primary font-normal text-lg font-archivo">
          A full stack developer, crafting magnificent websites and
          applications. And when I&apos;m not coding, I unleash my creative
          spirit, diving headfirst into the world of music.
        </p>
      </div>
    </div>
  );
};

export default Hero;
