"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { DownloadIcon, Icon1, Icon2, Icon3, HeroDecorativeIcon } from "@/icons";

const WorkHome = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const icons = [
    {
      id: 0,
      title: "SENIOR BACKEND DEVELOPER",
      description:
        "Currently leading backend architecture and microservices development at ExamRoom.AI, designing scalable solutions for online assessment platforms. Specialized in implementing robust API frameworks, security measures, and mentoring development teams to deliver high-quality software solutions.",
      icon: <Icon1 />,
    },
    {
      id: 1,
      title: "FULL STACK ENGINEER",
      description:
        "Experienced in developing end-to-end solutions using .NET Core, React.js, and modern web technologies. Successfully delivered 15+ functional systems and customer-facing applications across various sectors including retail, payments, education management, and identity systems.",
      icon: <Icon2 />,
    },
    {
      id: 2,
      title: "TECHNICAL CONSULTANT",
      description:
        "Providing strategic technical guidance and front-end engineering expertise to technology companies. Specialized in translating user requirements into contextual solutions, implementing best practices, and training development teams on emerging technologies and industry trends.",
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
    <div className="flex flex-col items-center justify-between gap-10 px-6 py-12 lg:flex-row sm:px-12 lg:px-28 lg:py-24 lg:gap-20">
      <div className="flex flex-col order-2 gap-10 lg:gap-20 lg:order-1">
        <div className="flex items-center justify-center w-16 h-16 bg-transparent lg:justify-start lg:w-20 lg:h-20">
          <HeroDecorativeIcon />
        </div>

        <div
          className={`flex flex-col gap-6 lg:gap-8 w-full max-w-[600px] transition-opacity duration-500 text-center lg:text-left ${
            activeIcon !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-primary text-xl sm:text-2xl lg:text-[36px] xl:text-[42px] font-semibold font-besley leading-tight lg:leading-[1.2] min-h-[80px] lg:min-h-[100px] flex items-center justify-center lg:justify-start">
            {icons[activeIcon].title}
          </h1>
          <p className="text-primary text-sm sm:text-base lg:text-[18px] font-normal font-archivo leading-relaxed">
            {icons[activeIcon].description}
          </p>
          <div className="w-full mt-4 sm:w-auto">
            <Button text="Download CV" svg={<DownloadIcon />} />
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center order-1 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 lg:order-2">
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
