import React from "react";

interface CustomPortfolioCardProps {
  header: string;
  portfolioNumber: string;
  projectTitle: string;
}

const PortfolioCard: React.FC<CustomPortfolioCardProps> = ({
  portfolioNumber,
  header,
  projectTitle,
}) => {
  return (
    <div className="relative">
      <div className="absolute text-stroke top-[-60px] sm:top-[-80px] lg:top-[-100px] right-[-20px] sm:right-[-30px] lg:right-[-52px] text-[80px] sm:text-[100px] lg:text-[140px] leading-tight lg:leading-[192px] font-semibold text-[#0D0900] z-10">
        {portfolioNumber}
      </div>
      <div className="flex flex-col lg:flex-row justify-between px-6 sm:px-12 lg:px-16 pt-12 lg:pt-20 pb-16 lg:pb-24 gap-6 lg:gap-[247px] rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] relative z-20">
        <h2 className="w-full lg:w-[356px] text-base lg:text-lg font-normal text-primary font-archivo">
          {header}
        </h2>
        <div className="flex flex-col gap-6 lg:gap-9">
          <h3 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-normal font-besley">
            {projectTitle}
          </h3>
          <p className="text-[#732383] text-base lg:text-lg font-normal font-archivo cursor-pointer hover:underline">
            View project
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
