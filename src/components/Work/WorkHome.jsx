import React from 'react'
import Button from '../ui/Button'

const DownloadIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 20C5.95 20 5.479 19.804 5.087 19.412C4.695 19.02 4.49934 18.5493 4.5 18V15H6.5V18H18.5V15H20.5V18C20.5 18.55 20.304 19.021 19.912 19.413C19.52 19.805 19.0493 20.0007 18.5 20H6.5ZM12.5 16L7.5 11L8.9 9.55L11.5 12.15V4H13.5V12.15L16.1 9.55L17.5 11L12.5 16Z" fill="#FCFCFC"/>
    </svg>
  );

const WorkHome = () => {
  return (
    <div className='flex flex-row px-28 py-24'>
        <div className='flex flex-col gap-20'>
            <div>
                <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
                </svg>
            </div>
            <div className='flex flex-col gap-6 w-[687px]'>
                <h1 className='text-[#fcfcfc] text-[64px] font-semibold'>SOFTWARE ENGINEER</h1>
                <p className='text-[#fcfcfc] text-lg font-normal'>Step into my world of meticulously crafted code, where each project showcases the fusion of creativity and technical expertise. By embracing the latest industry trends and adopting best practices, I have built a repertoire of dynamic applications that elevate user experiences and drive business growth.</p>
                <Button text='Download CV' svg={<DownloadIcon />}/>
            </div>
        </div>
        <div>
            {/* <div className="relative flex items-center justify-center h-screen bg-black">
                <div className="relative animate-rotate">
                    <div className="absolute top-0 left-0 w-48 h-16 bg-white rounded-full transform rotate-[30deg]" />
                    <div className="absolute top-20 right-10 w-48 h-16 bg-white rounded-full transform rotate-[60deg]" />
                    <div className="absolute top-16 left-16">
                    <svg className="text-yellow-700 transform rotate-[210deg]" width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M20 0 L25 10 H15 Z" />
                    </svg>
                    </div>
                    <div className="absolute bottom-20 right-20">
                    <svg className="text-yellow-700 transform rotate-[45deg]" width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M20 0 L25 10 H15 Z" />
                    </svg>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default WorkHome