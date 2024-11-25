import React from 'react'

const Passion = () => {
  return (
    <div className='px-28 py-24 flex flex-col gap-20'>
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-primary text-[40px] font-semibold'>PASSION IN ACTION</h1>
                <hr className='w-[100px] rounded-xl bg-[#8F6302] border-[#8F6302] h-[4px]'/>
            </div>
            <p className='text-primary text-[20px] font-normal'>Join me, a full stack developer, mentor, and creative, as I host inspiring meetups for aspiring tech enthusiasts. These events are crafted to equip you with insider insights, career tips, and practical knowledge about the tech industry, whether you're a beginner or already on your tech journey.</p>
        </div>
        
        <div className='grid grid-cols-2 content-center flex-wrap gap-16 px-20 py-4 w-[1200px]'>
            <div className='rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[515px]'>
                <div className='flex flex-col gap-6 p-8'>
                    <div className='w-[450px] h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                        <h2 className='text-black text-[48px] font-medium '>Event Flyer</h2>
                    </div>
                    <h2 className='text-[#fcfcfc] text-2xl font-semibold'>Event Title</h2>
                    <div className='flex flex-row gap-10'>
                        <h2 className='text-primary font-light text-sm'>Date: 25th November </h2>
                        <h2 className='text-primary font-light text-sm'>Time: 11am WAT</h2>
                    </div>
                    <p className='text-lg text-[#8F6302] font-normal'>Register for Event</p>
                </div>
                <div className='flex flex-row justify-between px-8 py-3 bg-[#FFFDF8] rounded-bl-lg rounded-br-lg'>
                    <p className='text-[#5E0ACC] text-lg font-normal'>25 tickets left</p>
                    <p className='text-[#0D0900] text-lg font-normal'>Ends in 360h 52m 32s</p>
                </div>
            </div>

            <div className='rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[515px]'>
                <div className='flex flex-col gap-6 p-8'>
                    <div className='w-[450px] h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                        <h2 className='text-black text-[48px] font-medium '>Event Flyer</h2>
                    </div>
                    <h2 className='text-[#fcfcfc] text-2xl font-semibold'>Event Title</h2>
                    <div className='flex flex-row gap-10'>
                        <h2 className='text-primary font-light text-sm'>Date: 25th November </h2>
                        <h2 className='text-primary font-light text-sm'>Time: 11am WAT</h2>
                    </div>
                    <p className='text-lg text-[#8F6302] font-normal'>Register for Event</p>
                </div>
                <div className='flex flex-row justify-between px-8 py-3 bg-[#FFFDF8] rounded-bl-lg rounded-br-lg'>
                    <p className='text-[#5E0ACC] text-lg font-normal'>25 tickets left</p>
                    <p className='text-[#0D0900] text-lg font-normal'>Ends in 360h 52m 32s</p>
                </div>
            </div>

            <div className='flex flex-col gap-6 p-8 rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[515px]'>
                <div className='w-[450px] h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-black text-[48px] font-medium '>Event Flyer</h2>
                </div>
                <h2 className='text-[#fcfcfc] text-2xl font-semibold'>Event Title</h2>
                <p className='text-lg font-normal text-[#fcfcfc]'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With</p>
                <p className='text-lg text-[#8F6302] font-normal'>Watch Now</p>
            </div>

            <div className='flex flex-col gap-6 p-8 rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[515px]'>
                <div className='w-[450px] h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-black text-[48px] font-medium '>Event Flyer</h2>
                </div>
                <h2 className='text-[#fcfcfc] text-2xl font-semibold'>Event Title</h2>
                <p className='text-lg font-normal text-[#fcfcfc]'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With</p>
                <p className='text-lg text-[#8F6302] font-normal'>Watch Now</p>
            </div>
        </div>
    </div>
  )
}

export default Passion