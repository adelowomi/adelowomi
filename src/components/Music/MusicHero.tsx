import React from 'react'

const MusicHero = () => {
  return (
    <div className='bg-hero-pattern bg-cover bg-center flex flex-col gap-[533px]'>
        <div className='flex justify-between items-center mx-28 mt-8'>
            <div>
                <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
                </svg>
            </div>
            <h1 className='text-primary text-[64px] font-semibold uppercase'>Music</h1>
        </div>
        <div className='bg-[#0D0900] w-[1200px] px-6 py-12'>
            <h1 className='text-primary uppercase text-[32px] font-semibold'>Music is my therapy. What&apos;s yours?</h1>
            <p className='text-primary text-lg font-normal'>A full stack developer, crafting magnificent websites and applications. And when I&apos;m not coding, I unleash my creative spirit, diving headfirst into the world of music.</p>
        </div>
    </div>
  )
}

export default MusicHero