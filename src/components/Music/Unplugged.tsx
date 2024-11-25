import React from 'react'
import MusicCard from '../ui/MusicCard'

const Unplugged = () => {
  return (
    <div className='px-28 py-24 flex flex-col '>
        <div>
            <h1 className='text-primary text-[40px] font-semibold'>ADELOWO UNPLUGGED</h1>
            <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px]'/>
            <p className='text-primary text-lg font-normal w-[917px]'>A full stack developer, crafting magnificent websites and applications. And when I&apos;m not coding, I unleash my creative spirit, diving headfirst into the world of music.</p>
        </div>
        
        <div className='grid grid-cols-2 content-center flex-wrap gap-16 px-20 py-4 w-[1200px]'>
            <MusicCard/>

            <MusicCard/>

            <MusicCard/>

            <MusicCard/>
        </div>
    </div>
  )
}

export default Unplugged