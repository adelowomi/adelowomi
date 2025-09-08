/* eslint-disable react/no-unknown-property */
import React from "react";
import AboutCard from "../ui/AboutCard";

const About = () => {
  return (
    <div className="flex flex-col bg-hero-pattern bg-cover bg-center">
      <div className="mx-6 sm:mx-12 lg:mx-28 my-12 lg:my-24">
        <div className="flex flex-col gap-4 justify-center items-center py-8 lg:py-14 px-6 lg:px-16 rounded-lg border-[0.5px] border-solid border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5">
          <h1 className="purple-gradient-text text-xl sm:text-2xl lg:text-3xl font-medium font-archivo text-center">
            MEET ADELOWO
          </h1>
          <hr className="horizontal-line" />
          <h1 className="text-primary text-2xl sm:text-3xl lg:text-[48px] font-semibold font-besley text-center leading-tight">
            One Brush, Infinite Imagination
          </h1>
          <p className="text-primary text-base lg:text-lg font-normal text-center font-archivo max-w-4xl">
            Adelowo is a full stack developer, crafting magnificent websites and
            applications. And when I&apos;m not coding, I unleash my creative
            spirit, diving headfirst into the world of music, content creation
            and mentorship.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col py-20 lg:py-40 px-6 sm:px-12 lg:px-28 gap-12 lg:gap-24">
          <AboutCard
            headerTitle="FULL STACK ENGINEER"
            descriptionTitle="I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With expertise in both front-end and back-end development, I thrive in crafting seamless user experiences and building robust, scalable technology solutions."
          />

          <AboutCard
            headerTitle="MUSIC ARTIST"
            descriptionTitle="Lorem ipsum dolor sit amet consectetur. Volutpat scelerisque netus eu consequat porttitor ipsum hendrerit. Neque posuere odio turpis aenean orci pellentesque elit ornare. Lacus purus malesuada semper cras. Platea suscipit at faucibus pellentesque. Id venenatis libero fermentum risus viverra a gravida."
            cardClassName="self-center lg:self-end lg:items-end"
          />

          <AboutCard
            headerTitle="TECH MENTOR/CONTENT CREATOR"
            descriptionTitle="Adelowo isn't just a developer; I am a mentor, guiding aspiring tech enthusiasts as they navigate the world of technology. Through meetups, videos, and online content, I share insights, demystify complex concepts, and provide a supportive space for students to learn and grow. O ma work out - my content is all about real-world advice, actionable tips, and inspiring others to realize their potential in tech."
          />
        </div>
      </div>
    </div>
  );
};

export default About;
