import React from 'react'

const MusicCard = () => {
  return (
    <div className='flex flex-col gap-6 p-8 rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[515px]'>
        <div className='w-[450px] h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
            <h2 className='text-black text-[48px] font-medium '>Thumbnail Image</h2>
        </div>
        <h2 className='text-primary text-2xl font-semibold font-besley'>Music Title</h2>
        <p className='text-lg font-normal text-primary font-archivo'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With</p>
        <p className='text-lg text-secondary font-normal font-archivo'>Listen Now</p>
    </div>
  )
}

export default MusicCard