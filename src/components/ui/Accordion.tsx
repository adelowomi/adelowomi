"use client";

import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  count,
  icon,
  className = "",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border border-[#FCFCFC33] rounded-lg bg-[bg-surface] ${className}`}
    >
      <button
        onClick={toggleAccordion}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FCFCFC0A] transition-colors duration-200 rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-secondary">{icon}</div>}
          <h3 className="text-primary font-semibold text-xl font-besley">
            {title}
          </h3>
          {count !== undefined && (
            <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium font-archivo">
              {count}
            </span>
          )}
        </div>

        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
