"use client";

import React from "react";
import Button from "../ui/Button";
import { ArrowIcon } from "@/icons";

interface EmptyEventStateProps {
  title?: string;
  message?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyEventState: React.FC<EmptyEventStateProps> = ({
  title = "No Events Available",
  message = "There are currently no events scheduled. Check back later for upcoming events!",
  showCreateButton = false,
  onCreateClick,
  buttonText = "Browse Other Sections",
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="text-center max-w-md">
        {/* Empty State Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-[#FCFCFC1A] rounded-full flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#FCFCFC80]"
            >
              <path
                d="M40 8H8C5.79086 8 4 9.79086 4 12V36C4 38.2091 5.79086 40 8 40H40C42.2091 40 44 38.2091 44 36V12C44 9.79086 42.2091 8 40 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 4V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 4V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 20H44"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-primary text-2xl font-semibold font-besley mb-4">
          {title}
        </h3>

        {/* Message */}
        <p className="text-primary/80 text-lg font-archivo mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showCreateButton && onCreateClick && (
            <Button
              text="Create Event"
              svg={<ArrowIcon />}
              onClick={onCreateClick}
              width="w-auto"
              padding="px-6 py-3"
            />
          )}

          {onButtonClick && (
            <Button
              text={buttonText}
              onClick={onButtonClick}
              width="w-auto"
              padding="px-6 py-3"
              textStyle="text-[16px] font-normal font-archivo text-primary/80"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyEventState;
