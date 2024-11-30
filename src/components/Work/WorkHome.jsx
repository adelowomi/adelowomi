'use client'

import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'

const DownloadIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 20C5.95 20 5.479 19.804 5.087 19.412C4.695 19.02 4.49934 18.5493 4.5 18V15H6.5V18H18.5V15H20.5V18C20.5 18.55 20.304 19.021 19.912 19.413C19.52 19.805 19.0493 20.0007 18.5 20H6.5ZM12.5 16L7.5 11L8.9 9.55L11.5 12.15V4H13.5V12.15L16.1 9.55L17.5 11L12.5 16Z" fill="#FCFCFC"/>
    </svg>
  );

const Icon1 = () => (
    <svg width="424" height="688" viewBox="0 0 424 688" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M128.259 527.68C156.081 379.607 196.926 283.573 312.623 230.643" stroke="#8F6302"/>
<path d="M340.686 209.547L322.727 248.911L297.685 213.611L340.686 209.547Z" fill="#8F6302"/>
<path d="M120.834 562.213L108.912 520.587L150.829 531.081L120.834 562.213Z" fill="#8F6302"/>
<rect x="109.471" y="166.292" width="98.7495" height="384" rx="49.3748" transform="rotate(-9.5449 109.471 166.292)" fill="#0D0900" stroke="#FCFCFC"/>
<rect x="228.624" y="348.558" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 228.624 348.558)" fill="#FCFCFC"/>
<rect x="0.939941" y="53.2236" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 0.939941 53.2236)" fill="#FCFCFC"/>
</svg>
)

const Icon2 = () => (
    <svg width="423" height="688" viewBox="0 0 423 688" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M127.319 527.519C155.141 379.446 195.986 283.412 311.683 230.482" stroke="#FCFCFC"/>
<path d="M297.653 213.866L338.933 209.965L321.693 247.753L297.653 213.866Z" fill="#FCFCFC" stroke="#FCFCFC"/>
<path d="M148.929 531.195L120.136 561.081L108.691 521.121L148.929 531.195Z" fill="#FCFCFC" stroke="#FCFCFC"/>
<rect x="108.531" y="166.131" width="98.7495" height="384" rx="49.3748" transform="rotate(-9.5449 108.531 166.131)" fill="#0D0900" stroke="#FCFCFC"/>
<rect x="227.684" y="348.396" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 227.684 348.396)" fill="#8F6302"/>
<rect y="53.0625" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 0 53.0625)" fill="#8F6302"/>
</svg>
)

const Icon3 = () => (
    <svg width="424" height="688" viewBox="0 0 424 688" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M128.259 527.68C156.081 379.607 196.926 283.573 312.623 230.643" stroke="#8F6302"/>
<path d="M340.686 209.547L322.727 248.911L297.685 213.611L340.686 209.547Z" fill="#8F6302"/>
<path d="M120.834 562.213L108.912 520.587L150.829 531.081L120.834 562.213Z" fill="#8F6302"/>
<rect x="109.471" y="166.292" width="98.7495" height="384" rx="49.3748" transform="rotate(-9.5449 109.471 166.292)" fill="#0D0900" stroke="#FCFCFC"/>
<rect x="228.624" y="348.558" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 228.624 348.558)" fill="#FCFCFC"/>
<rect x="0.939941" y="53.2236" width="99.7495" height="314" rx="49.8748" transform="rotate(-9.5449 0.939941 53.2236)" fill="#FCFCFC"/>
</svg>
)

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
            <svg
              width="81"
              height="100"
              viewBox="0 0 36 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin-slow"
            >
              <path
                d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222"
                stroke="#FCFCFC"
                strokeWidth="3"
              />
            </svg>
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
  