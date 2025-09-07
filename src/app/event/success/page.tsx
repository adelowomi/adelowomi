import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Button from "@/components/ui/Button";
import { ArrowIcon } from "@/icons";
import Link from "next/link";

const RegistrationSuccessPage = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      <div className="px-28 py-24 flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-primary text-[48px] font-semibold font-besley mb-4">
              Registration Successful!
            </h1>
            <p className="text-primary text-lg font-archivo mb-8">
              Thank you for registering for our event. You will receive a
              confirmation email shortly with all the event details.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/event">
              <Button
                text="View More Events"
                svg={<ArrowIcon />}
                width="w-auto"
                padding="px-8 py-3"
              />
            </Link>
            <Link href="/">
              <Button text="Back to Home" width="w-auto" padding="px-8 py-3" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationSuccessPage;
