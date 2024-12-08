/* eslint-disable react/no-unknown-property */
'use client'

import React from 'react'
import { ArrowIcon, LogoIcon } from '@/icons'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation';

const EventHero = () => {
    const router = useRouter();

    const redirectUser = () => {
        router.push('/event/register-event')
    }
  return (
    <div className='flex flex-col gap-20 px-28 py-24'>
        <div className='flex flex-row justify-between'>
            <div>
                <LogoIcon />
            </div>
            <h2 className='text-primary text-[64px] font-besley font-semibold mt-8'>MENTORSHIP</h2>
        </div>
        <div className='flex '>
            <div className='w-[580px] h-[554px] bg-primary p-8'>
                <div className='w-[516px] h-[490px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
                    <h2 className='text-center text-[48px] font-medium text-[#000] font-archivo'>Event Flyer</h2>
                </div>
            </div>
            <div className='flex flex-col w-[620px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] my-12 gap-10'>
                
                <div className='flex justify-between'>
                    <div></div>
                    <div className='py-3 px-6 rounded-bl-lg rounded-br-lg bg-[#FCFCFC1A]'>
                        <h1 className='text-primary text-lg font-medium font-archivo'>Registration Ends in 360h 52m 32s</h1>
                    </div>
                </div>  

                <div className='flex flex-col gap-10 px-16'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-semibold text-primary font-besley'>Event Caption</h1>
                        <hr className='horizontal-line'/>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-[20px] text-primary font-normal font-archivo'>Date: 25th November </h2>
                        <h2 className='text-[20px] text-primary font-normal font-archivo'>Time: 11am WAT</h2>
                        <h2 className='text-[20px] text-primary font-normal font-archivo'>Venue: Venue of Event</h2>
                    </div>
                    <Button text='Register Now' svg={<ArrowIcon />} onClick={redirectUser}/>
                </div>

                <div className='flex justify-between'>
                    <div></div>
                    <div className='px-6 py-4 rounded-lg bg-[#FCFCFC1A]'>
                        <h2 className='text-[20px] font-medium text-secondary font-archivo'>25 tickets left</h2>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default EventHero