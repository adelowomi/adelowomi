import React from "react";

const VideoView = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-12 lg:px-28 py-8 sm:py-10">
      <h1 className="text-primary text-lg sm:text-xl font-normal capitalize font-besley">
        any caption best suited for the video
      </h1>
      <div className="relative w-full">
        <video
          className="w-full h-auto rounded-lg"
          controls
          autoPlay
          loop
          muted
        >
          <source src="/sample-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-0 left-0 flex flex-col w-full min-h-[100px] sm:min-h-[120px] lg:h-[145px] py-3 sm:py-4 pr-4 sm:pr-6 pl-6 sm:pl-8 lg:pl-12 bg-[#0D090080] gap-2 sm:gap-3">
          <h1 className="text-primary text-lg sm:text-xl font-semibold font-besley">
            Video Caption
          </h1>
          <p className="text-primary text-sm sm:text-base lg:text-lg font-normal font-archivo line-clamp-2 lg:line-clamp-none">
            A full stack developer, crafting magnificent websites and
            applications. And when I&apos;m not coding, I unleash my creative
            spirit, diving headfirst into the world of music.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoView;
