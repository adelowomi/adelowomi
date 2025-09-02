import React from "react";
import Footer from "@/components/shared/Footer";
import RegisterEvent from "@/components/Event/RegisterEvent";
import { LogoIcon } from "@/icons";

const page = () => {
  return (
    <div className="flex flex-col gap-20">
      <div className="mx-28 mt-16">
        <LogoIcon />
      </div>
      <RegisterEvent />
      <Footer />
    </div>
  );
};

export default page;
