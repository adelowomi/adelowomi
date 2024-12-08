'use client'

import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'
import { DownloadIcon, Icon1, Icon2, Icon3, LogoIcon } from '@/icons'


const WorkHome = () => {
    const [activeIcon, setActiveIcon] = useState(0);
  
    const icons = [
      {
        id: 0,
        title: 'SOFTWARE ENGINEER',
        description:
          'Step into my world of meticulously crafted code, where each project showcases the fusion of creativity and technical expertise. By embracing the latest industry trends and adopting best practices, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.',
        icon: <Icon1 />,
      },
      {
        id: 1,
        title: 'START-UP FOUNDER',
        description:
          'With a relentless entrepreneurial spirit, I’ve ventured into creating start-ups that combine innovation and practicality. By embracing the latest industry trends and adopting best practices, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.',
        icon: <Icon2 />,
      },
      {
        id: 2,
        title: 'CONTENT CREATOR',
        description:
          'Through engaging storytelling, captivating visuals, and a deep understanding of the audience’s needs, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.',
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
      <div className="flex flex-row px-28 py-24 items-center justify-between">
        <div className="flex flex-col gap-20">
          <div className="flex justify-center items-center w-20 h-20 bg-transparent">
            <LogoIcon />
          </div>
  
          <div className={`flex flex-col gap-6 w-[687px] transition-opacity duration-500 ${
            activeIcon !== null ? 'opacity-100' : 'opacity-0'
          }`}>
            <h1 className="text-primary text-[64px] font-semibold font-besley">
              {icons[activeIcon].title}
            </h1>
            <p className="text-primary text-[20px] font-normal font-archivo">
              {icons[activeIcon].description}
            </p>
            <Button text="Download CV" svg={<DownloadIcon />} />
          </div>
        </div>
  
        <div className="relative flex justify-center items-center w-40 h-40">
            {icons.map((icon, index) => (
                <div
                key={icon.id}
                className={`absolute transition-transform duration-500 ease-in-out ${
                    activeIcon === index
                    ? 'opacity-100 scale-100 rotate-90'
                    : 'opacity-0 scale-75'
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
  