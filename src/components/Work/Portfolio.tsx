import React from "react";
import PortfolioCard from "../ui/PortfolioCard";

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-10 px-6 py-12 lg:gap-20 sm:px-12 lg:px-28 lg:py-24 lg:mx-24">
      <h1 className="text-primary text-2xl sm:text-3xl lg:text-[48px] font-semibold text-center uppercase font-besley">
        Portfolio Highlights
      </h1>

      <div className="flex flex-col gap-16 lg:gap-32">
        <PortfolioCard
          projectTitle="ExamRoom.AI Platform"
          header="Designed and implemented scalable backend architecture and microservices for an online assessment platform, accommodating many concurrent users and exams. Enhanced platform interoperability with robust API framework ensuring seamless integration with client applications and third-party systems."
          portfolioNumber="01"
        />

        <PortfolioCard
          projectTitle="GAC Motors Website"
          header="Developed a dynamic and responsive website for GAC Motor Nigeria, a leading automobile brand in Nigeria. Implemented modern web technologies for running and managing the affairs of GAC using React.js to create an engaging user experience."
          portfolioNumber="02"
        />

        <PortfolioCard
          projectTitle="Skillbase E-Learning Portal"
          header="Built a comprehensive learning platform as a wrapper around the popular Moodle platform for Interswitch, Nigeria's biggest Fin-Tech Company. Created a seamless educational experience with modern web technologies and user-friendly interface design."
          portfolioNumber="03"
        />

        <PortfolioCard
          projectTitle="Asset & Inventory Management System"
          header="Spearheaded the ideation and implementation of a fully automated innovative Asset and Inventory Management Software, saving clients millions of naira in expenses. Leveraged .NET Core, Angular, and React.js to deliver a comprehensive business solution."
          portfolioNumber="04"
        />

        <PortfolioCard
          projectTitle="Customer-Facing Applications Suite"
          header="Developed and delivered 4+ highly customized and user-friendly customer-facing applications using .NET Core, SQL Server, HTML, CSS, and React.js. Catered to clients' specific requirements across 6 sectors including retail, payments, education management, and identity systems."
          portfolioNumber="05"
        />
      </div>
    </div>
  );
};

export default Portfolio;
