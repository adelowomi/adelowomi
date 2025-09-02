import React from "react";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import RegisterEvent from "@/components/Event/RegisterEvent";

const page = () => {
  return (
    <div className="flex flex-col gap-20">
      <div className="mx-28 mt-16">
        <Image
          src="/assets/logo-primary.svg"
          alt="Adelowo Ajibola Logo"
          width={81}
          height={100}
          className="w-20 h-25"
        />
      </div>
      <RegisterEvent />
      <Footer />
    </div>
  );
};

export default page;
