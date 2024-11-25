import React from 'react'

const Gallery = () => {
  return (
    <div className='flex flex-col gap-8 mx-28 my-10'>
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-primary text-[40px] font-semibold'>Gallery</h1>
                <hr className='horizontal-line'/>
            </div>
            <p className='text-primary text-[20px] font-normal'>Get a glimpse into my past meetups, where students and tech enthusiasts came together to learn, connect, and get inspired.</p>
        </div>
        <div className="grid grid-cols-2 h-[716px] gap-4">
            <div className="col-span-1 rounded-lg bg-[#8f8c8c] relative">

                <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
                    <h1 className="text-primary text-xl font-semibold">Event Caption</h1>
                    <p className='text-secondary text-lg font-normal'>View all images</p>
                </div>
            </div>

            <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="rounded-lg bg-[#8f8c8c] relative">
                    <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
                        <h1 className="text-primary text-xl font-semibold">Event Caption</h1>
                        <p className='text-secondary text-lg font-normal'>View all images</p>
                    </div>
                </div>

                <div className="rounded-lg bg-[#8f8c8c] relative">
                    <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
                        <h1 className="text-primary text-xl font-semibold">Event Caption</h1>
                        <p className='text-secondary text-lg font-normal'>View all images</p>
                    </div>
                </div>

                <div className="rounded-lg bg-[#8f8c8c] relative">
                    <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
                        <h1 className="text-primary text-xl font-semibold">Event Caption</h1>
                        <p className='text-secondary text-lg font-normal'>View all images</p>
                    </div>
                </div>

                <div className="rounded-lg bg-[#8f8c8c] relative">
                    <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
                        <h1 className="text-primary text-xl font-semibold">Event Caption</h1>
                        <p className='text-secondary text-lg font-normal'>View all images</p>
                    </div>
                </div>
            </div>
        </div>



    </div>
  )
}

export default Gallery