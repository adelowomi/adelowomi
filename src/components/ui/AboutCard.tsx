import React from "react";
import Button from "./Button";
import { ArrowIcon } from "@/icons";

interface AboutCardProps {
  headerTitle: string;
  descriptionTitle: string;
  cardClassName?: string;
}

const AboutCard: React.FC<AboutCardProps> = ({
  headerTitle,
  descriptionTitle,
  cardClassName = "",
}) => {
  return (
    <div
      className={`border-[0.5px] border-solid border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/10 flex flex-col w-full max-w-[765px] pt-8 lg:pt-12 pr-6 lg:pr-12 pb-10 lg:pb-14 pl-6 lg:pl-8 rounded-lg gap-y-6 lg:gap-y-10 hover:border-secondary/50 transition-all duration-300 ${cardClassName}`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="purple-gradient-text text-xl sm:text-2xl lg:text-[32px] font-semibold font-besley">
          {headerTitle}
        </h1>
        <hr className={`horizontal-line ${cardClassName}`} />
      </div>
      <p className="text-base lg:text-lg font-normal text-primary font-archivo">
        {descriptionTitle}
      </p>
      <div className="w-full sm:w-auto">
        <Button text="See my work" svg={<ArrowIcon />} />
      </div>
    </div>
  );
};

export default AboutCard;
