import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Contact from "@/components/shared/Contact";
import RegisterEventForm from "@/components/Event/RegisterEventForm";

interface RegisterEventPageProps {
  params: {
    id: string;
  };
}

const RegisterEventPage = ({ params }: RegisterEventPageProps) => {
  return (
    <div>
      <div className="relative z-10">
        <Navbar />
      </div>
      <RegisterEventForm eventId={params.id} />
      <div className="max-w-[1440px] my-0 mx-auto">
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default RegisterEventPage;
