"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { DownloadIcon, Icon1, Icon2, Icon3, HeroDecorativeIcon } from "@/icons";

const WorkHome = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const icons = [
    {
      id: 0,
      title: "SOFTWARE ENGINEER",
      description:
        "Step into my world of meticulously crafted code, where each project showcases the fusion of creativity and technical expertise. By embracing the latest industry trends and adopting best practices, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.",
      icon: <Icon1 />,
    },
    {
      id: 1,
      title: "START-UP FOUNDER",
      description:
        "With a relentless entrepreneurial spirit, I've ventured into creating start-ups that combine innovation and practicality. By embracing the latest industry trends and adopting best practices, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.",
      icon: <Icon2 />,
    },
    {
      id: 2,
      title: "CONTENT CREATOR",
      description:
        "Through engaging storytelling, captivating visuals, and a deep understanding of the audience's needs, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.",
      icon: <Icon3 />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="flex flex-col lg:flex-row px-6 sm:px-12 lg:px-28 py-12 lg:py-24 items-center justify-between gap-10 lg:gap-20">
      <div className="flex flex-col gap-10 lg:gap-20 order-2 lg:order-1">
        <div className="flex justify-center lg:justify-start items-center w-16 h-16 lg:w-20 lg:h-20 bg-transparent">
          <HeroDecorativeIcon />
        </div>

        <div
          className={`flex flex-col gap-4 lg:gap-6 w-full max-w-[687px] transition-opacity duration-500 text-center lg:text-left ${
            activeIcon !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-primary text-2xl sm:text-3xl lg:text-[64px] font-semibold font-besley leading-tight">
            {icons[activeIcon].title}
          </h1>
          <p className="text-primary text-base sm:text-lg lg:text-[20px] font-normal font-archivo">
            {icons[activeIcon].description}
          </p>
          <div className="w-full sm:w-auto">
            <Button text="Download CV" svg={<DownloadIcon />} />
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 order-1 lg:order-2">
        {icons.map((icon, index) => (
          <div
            key={icon.id}
            className={`absolute transition-transform duration-500 ease-in-out ${
              activeIcon === index
                ? "opacity-100 scale-100 rotate-90"
                : "opacity-0 scale-75"
            }`}
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHome;
