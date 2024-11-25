import React from 'react'

const GalleryHero = () => {
  return (
    <div className='flex flex-col gap-20 px-28 py-24'>
        <div className='flex flex-row justify-between'>
            <div>
                <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
                </svg>
            </div>
            <h2 className='text-primary text-[64px] font-semibold mt-8'>GALLERY</h2>
        </div>
        <div className='flex '>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7599 25.0934C12.5066 25.0934 12.2533 25 12.0533 24.8L3.95992 16.7067C3.57326 16.32 3.57326 15.68 3.95992 15.2934L12.0533 7.20003C12.4399 6.81337 13.0799 6.81337 13.4666 7.20003C13.8533 7.5867 13.8533 8.2267 13.4666 8.61337L6.07992 16L13.4666 23.3867C13.8533 23.7734 13.8533 24.4134 13.4666 24.8C13.2799 25 13.0133 25.0934 12.7599 25.0934Z" fill="#FCFCFC" fill-opacity="0.5"/>
            <path d="M27.3336 17H4.89355C4.34689 17 3.89355 16.5467 3.89355 16C3.89355 15.4533 4.34689 15 4.89355 15H27.3336C27.8802 15 28.3336 15.4533 28.3336 16C28.3336 16.5467 27.8802 17 27.3336 17Z" fill="#FCFCFC" fill-opacity="0.5"/>
            </svg>
        </div>
    </div>
  )
}

export default GalleryHero