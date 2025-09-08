import React from "react";

const MusicCard = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-full max-w-[515px]">
      <div className="w-full aspect-square rounded-lg bg-[#d9d9d9] flex justify-center items-center">
        <h2 className="text-black text-xl sm:text-2xl lg:text-[48px] font-medium text-center px-4">
          Thumbnail Image
        </h2>
      </div>
      <h2 className="text-primary text-xl sm:text-2xl font-semibold font-besley">
        Music Title
      </h2>
      <p className="text-base sm:text-lg font-normal text-primary font-archivo line-clamp-3">
        I am a passionate and highly skilled Full Stack Engineer, driven by a
        relentless pursuit of excellence in every project I undertake. With
      </p>
      <p className="text-base sm:text-lg text-secondary font-normal font-archivo cursor-pointer hover:underline">
        Listen Now
      </p>
    </div>
  );
};

export default MusicCard;
