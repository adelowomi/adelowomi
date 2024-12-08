/* eslint-disable react/no-unknown-property */
import React from 'react'
import { ArrowIcon } from '@/icons'

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
                <ArrowIcon/>
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