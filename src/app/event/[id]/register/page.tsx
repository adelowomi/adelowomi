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
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      <div className="py-24">
        <RegisterEventForm eventId={params.id} />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default RegisterEventPage;
