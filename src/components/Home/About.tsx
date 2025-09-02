/* eslint-disable react/no-unknown-property */
import React from "react";
import AboutCard from "../ui/AboutCard";

const About = () => {
  return (
    <div className="flex flex-col bg-hero-pattern bg-cover bg-center">
      <div className="mx-28 my-24">
        <div className="flex flex-col gap-4 justify-center items-center py-14 px-16 rounded-lg border-[0.5px] border-solid border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5">
          <h1 className="purple-gradient-text text-3xl font-medium font-archivo">
            MEET ADELOWO
          </h1>
          <hr className="horizontal-line" />
          <h1 className="text-primary text-[48px] font-semibold font-besley">
            One Brush, Infinite Imagination
          </h1>
          <p className="text-primary text-lg font-normal text-center font-archivo">
            Adelowo is a full stack developer, crafting magnificent websites and
            applications. And when I&apos;m not coding, I unleash my creative
            spirit, diving headfirst into the world of music, content creation
            and mentorship.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col py-40 px-28 gap-24">
          <AboutCard
            headerTitle="FULL STACK ENGINEER"
            descriptionTitle="I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With expertise in both front-end and back-end development, I thrive in crafting seamless user experiences and building robust, scalable technology solutions."
          />

          <AboutCard
            headerTitle="MUSIC ARTIST"
            descriptionTitle="Lorem ipsum dolor sit amet consectetur. Volutpat scelerisque netus eu consequat porttitor ipsum hendrerit. Neque posuere odio turpis aenean orci pellentesque elit ornare. Lacus purus malesuada semper cras. Platea suscipit at faucibus pellentesque. Id venenatis libero fermentum risus viverra a gravida."
            cardClassName="self-end items-end"
          />

          <AboutCard
            headerTitle="TECH MENTOR/CONTENT CREATOR"
            descriptionTitle="Adelowo isn’t just a developer; I am a mentor, guiding aspiring tech enthusiasts as they navigate the world of technology. Through meetups, videos, and online content, I share insights, demystify complex concepts, and provide a supportive space for students to learn and grow. O ma work out - my content is all about real-world advice, actionable tips, and inspiring others to realize their potential in tech."
          />
        </div>
      </div>
    </div>
  );
};

export default About;
