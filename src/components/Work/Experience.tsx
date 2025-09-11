import React from "react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: "Senior Backend Developer",
      company: "ExamRoom.AI",
      location: "Lagos, Nigeria",
      period: "Feb. 2023 – Present",
      achievements: [
        "Designed and implemented scalable backend architecture and microservices kits for the online assessment platform",
        "Enhanced platform interoperability with robust API framework ensuring seamless integration",
        "Implemented elaborate security measures, encryption and secure authentication protocols",
        "Served as a guide for junior developers, conducting code reviews and advising on best practices",
        "Participated in cross-functional meetings with product managers and stakeholders"
      ]
    },
    {
      id: 2,
      position: "Senior Full Stack Engineer",
      company: "Suretree Systems",
      location: "Lagos, Nigeria (Remote)",
      period: "Mar. 2022 – Feb 2023",
      achievements: [
        "Developed and delivered 4 highly customized customer-facing applications using .NET Core, SQL Server, HTML, CSS, and React.js",
        "Worked on 10+ projects in collaboration with cross-functional teams across 6 sectors including retail",
        "Implemented agile development methodologies for streamlined project execution",
        "Co-led designing and developing robust back-end infrastructure using SQL Server",
        "Increased stability and reduced downtime through comprehensive quality assurance processes"
      ]
    },
    {
      id: 3,
      position: "Front-End Engineering Consultant",
      company: "Qualtrak Technologies",
      location: "Ontario, Canada (Remote)",
      period: "Oct. 2020 – May 2023",
      achievements: [
        "Developed streamlined process for translating user requirements into contextual documents",
        "Implemented best practices for design resulting in visually appealing and user-friendly interfaces",
        "Led comprehensive training program for interns, equipping them with essential front-end engineering skills",
        "Collaborated with technology companies in Nigeria to identify talent gaps",
        "Acted as technical advisor offering insights on emerging front-end technologies and trends"
      ]
    },
    {
      id: 4,
      position: "Full Stack Developer",
      company: "Blended Technology Solution",
      location: "Lagos, Nigeria",
      period: "Feb. 2018 – May. 2021",
      achievements: [
        "Delivered 15+ functional systems managing the software development lifecycle",
        "Saved clients millions of naira by implementing fully automated Asset and Inventory Management Software",
        "Increased system functionality by 50% by resolving critical biometric synchronization challenges",
        "Enhanced user experience through insightful feedback analysis and targeted suggestions",
        "Deployed 8+ customer-facing applications across diverse client requirements"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-10 px-6 py-12 lg:gap-20 sm:px-12 lg:px-28 lg:py-24">
      <div>
        <h1 className="text-2xl lg:text-3xl text-primary font-medium leading-tight lg:leading-[60px] font-besley">
          PROFESSIONAL EXPERIENCE
        </h1>
        <hr className="w-[80px] lg:w-[100px] rounded-xl bg-secondary border-secondary h-[3px] lg:h-[4px]" />
      </div>

      <div className="flex flex-col gap-12 lg:gap-16">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold lg:text-2xl text-primary font-besley">
                {exp.position}
              </h2>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <h3 className="text-lg font-medium lg:text-xl text-secondary font-archivo">
                  {exp.company}
                </h3>
                <span className="hidden sm:block text-secondary">•</span>
                <p className="text-base lg:text-lg text-primary font-archivo">
                  {exp.location}
                </p>
              </div>
              <p className="text-sm lg:text-base text-primary font-archivo opacity-80">
                {exp.period}
              </p>
            </div>

            <ul className="flex flex-col gap-2 ml-4 lg:gap-3 lg:ml-6">
              {exp.achievements.map((achievement, index) => (
                <li key={index} className="relative text-base leading-relaxed lg:text-lg text-primary font-archivo">
                  <span className="absolute -left-4 lg:-left-6 text-secondary">•</span>
                  {achievement}
                </li>
              ))}
            </ul>

            {exp.id !== experiences.length && (
              <hr className="w-full mt-4 border-t border-primary opacity-20 lg:mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
