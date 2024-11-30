/* eslint-disable react/no-unknown-property */
import React from 'react'

const Vision = () => {
  return (
    <div className='flex flex-col gap-20 mx-28'>
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className="text-primary text-[40px] font-semibold font-besley">VIBES AND VISION</h1>
                <hr className='horizontal-line'/>
            </div>
            <p className='text-[20px] font-normal text-primary font-archivo'>Catch my latest insights on coding, creativity, and career growth in tech. Dive into quick, value-packed videos that keep you inspired and ready for the next level!</p>
            <button className='flex justify-center items-center w-[242px] px-8 py-3 gap-2 bg-[#8F6302] rounded-lg font-archivo'>
                Visit Channel
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_133)">
                    <path d="M20.864 12.707C21.0514 12.5194 21.1567 12.2651 21.1567 12C21.1567 11.7348 21.0514 11.4805 20.864 11.293L15.207 5.63598C15.1147 5.54047 15.0044 5.46428 14.8824 5.41188C14.7604 5.35947 14.6291 5.33188 14.4964 5.33073C14.3636 5.32957 14.2319 5.35487 14.109 5.40516C13.9861 5.45544 13.8744 5.52969 13.7806 5.62358C13.6867 5.71747 13.6124 5.82913 13.5621 5.95202C13.5118 6.07492 13.4865 6.2066 13.4877 6.33938C13.4889 6.47216 13.5164 6.60338 13.5689 6.72538C13.6213 6.84739 13.6974 6.95773 13.793 7.04998L17.743 11H4.49995C4.23474 11 3.98038 11.1053 3.79284 11.2929C3.60531 11.4804 3.49995 11.7348 3.49995 12C3.49995 12.2652 3.60531 12.5195 3.79284 12.7071C3.98038 12.8946 4.23474 13 4.49995 13H17.743L13.793 16.95C13.6108 17.1386 13.51 17.3912 13.5123 17.6534C13.5146 17.9156 13.6197 18.1664 13.8051 18.3518C13.9905 18.5372 14.2414 18.6424 14.5036 18.6447C14.7657 18.6469 15.0183 18.5461 15.207 18.364L20.864 12.707Z" fill="#FCFCFC"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_40_133">
                    <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24.5 0)"/>
                    </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
        <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-4 p-4 border-[0.5px] border-solid border-[#fcfcfc33] rounded-lg'>
                <div className='h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-black text-3xl font-medium font-archivo'>Thumbnail Image</h2>
                </div>
                <h2 className='text-primary text-2xl font-semibold mb-10 font-besley'>Content Title</h2>
            </div>

            <div className='flex flex-col gap-4 p-4 border-[0.5px] border-solid border-[#fcfcfc33] rounded-lg'>
                <div className='h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-black text-3xl font-medium font-archivo'>Thumbnail Image</h2>
                </div>
                <h2 className='text-primary text-2xl font-semibold mb-10 font-besley'>Content Title</h2>
            </div>

            <div className='flex flex-col gap-4 p-4 border-[0.5px] border-solid border-[#fcfcfc33] rounded-lg'>
                <div className='h-[400px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-black text-3xl font-medium font-archivo'>Thumbnail Image</h2>
                </div>
                <h2 className='text-primary text-2xl font-semibold mb-10 font-besley'>Content Title</h2>
            </div>
        </div>
    </div>
  )
}

export default Vision