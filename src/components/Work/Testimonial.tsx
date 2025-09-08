import React from "react";

const Testimonial = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-28 py-12 lg:py-24 flex flex-col gap-10 lg:gap-20">
      <h1 className="text-primary text-center font-semibold text-2xl sm:text-3xl lg:text-[48px] uppercase font-besley">
        Testimonial
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
        <div className="w-full lg:w-[580px] h-64 sm:h-80 lg:h-[554px] bg-primary p-4 lg:p-8">
          <div className="w-full h-full rounded-lg bg-[#d9d9d9] flex justify-center items-center">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-[48px] font-medium text-[#000] font-archivo">
              Client&apos;s Image
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[620px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] px-6 lg:px-8 pt-8 lg:pt-16 pb-12 lg:pb-20 lg:mt-40 gap-6 lg:gap-10">
          <p className="text-base lg:text-lg font-normal text-primary font-archivo">
            I am a passionate and highly skilled Full Stack Engineer, driven by
            a relentless pursuit of excellence in every project I undertake.
            With expertise in both front-end and back-end development, I thrive
            in crafting seamless user experiences and building robust, scalable
            technology solutions.
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-2xl font-semibold text-primary font-besley">
              Name of Client
            </h1>
            <hr className="horizontal-line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
