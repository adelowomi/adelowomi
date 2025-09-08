import React from "react";
import PortfolioCard from "../ui/PortfolioCard";

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 px-6 sm:px-12 lg:px-28 py-12 lg:py-24 lg:mx-24">
      <h1 className="text-primary text-2xl sm:text-3xl lg:text-[48px] font-semibold text-center uppercase font-besley">
        Portfolio Highlights
      </h1>

      <div className="flex flex-col gap-16 lg:gap-32">
        <PortfolioCard
          projectTitle="Project Title"
          header="Brief about project Brief about project Brief about project Brief about 
            project Brief about project Brief about project Brief about project Brief about project Brief about project"
          portfolioNumber="01"
        />

        <PortfolioCard
          projectTitle="Project Title"
          header="Brief about project Brief about project Brief about project Brief about 
            project Brief about project Brief about project Brief about project Brief about project Brief about project"
          portfolioNumber="02"
        />

        <PortfolioCard
          projectTitle="Project Title"
          header="Brief about project Brief about project Brief about project Brief about 
            project Brief about project Brief about project Brief about project Brief about project Brief about project"
          portfolioNumber="03"
        />

        <PortfolioCard
          projectTitle="Project Title"
          header="Brief about project Brief about project Brief about project Brief about 
            project Brief about project Brief about project Brief about project Brief about project Brief about project"
          portfolioNumber="04"
        />

        <PortfolioCard
          projectTitle="Project Title"
          header="Brief about project Brief about project Brief about project Brief about 
            project Brief about project Brief about project Brief about project Brief about project Brief about project"
          portfolioNumber="05"
        />
      </div>
    </div>
  );
};

export default Portfolio;
