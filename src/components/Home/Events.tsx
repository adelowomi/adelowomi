/* eslint-disable react/no-unknown-property */
import React from 'react'
import Button from '../ui/Button'
import { ArrowIcon } from '@/icons'

const Events = () => {
  return (
    <div className='px-28 py-24 flex flex-col gap-20'>
        <h1 className='text-primary text-center font-semibold text-[48px] uppercase font-besley'>Upcoming Event</h1>
        <div className='flex '>
            <div className='w-[580px] h-[554px] bg-primary p-8'>
                <div className='w-[516px] h-[490px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-center text-[48px] font-medium text-[#000] font-archivo'>Event Flyer</h2>
                </div>
            </div>
            <div className='flex flex-col w-[620px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] px-28 pt-12 pb-16 my-10'>
                <h1 className='text-3xl font-semibold text-primary mb-4 font-besley'>Event Caption</h1>
                <hr className='horizontal-line'/>
                <div className='flex flex-col gap-4 my-10'>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Date: 25th November</span>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Time: 11a.m WAT</span>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Venue: Venue of Event</span>
                </div>
                <Button text="Register Now" svg={<ArrowIcon />}/>
            </div>
        </div>
    </div>
  )
}

export default Events