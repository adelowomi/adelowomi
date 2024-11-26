import React from 'react'

const VideoView = () => {
  return (
    <div className='flex flex-col gap-10 px-28 py-10'>
        <h1 className='text-primary text-xl font-normal capitalize'>any caption best suited for the video</h1>
        <div className='relative w-full'>
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

            <div className="absolute bottom-0 left-0 flex flex-col w-full h-[145px] py-4 pr-6 pl-12 bg-[#0D090080] gap-3">
                <h1 className="text-primary text-xl font-semibold">Video Caption</h1>
                <p className='text-primary text-lg font-normal'>A full stack developer, crafting magnificent websites and applications. And when I&apos;m not coding, I unleash my creative spirit, diving headfirst into the world of music.</p>
            </div>
        </div>
    </div>
  )
}

export default VideoView