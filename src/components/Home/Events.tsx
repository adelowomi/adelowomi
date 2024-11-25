import React from 'react'
import Button from '../ui/Button'

const RegisterIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <g clip-path="url(#clip0_33_489)">
         <path d="M20.864 12.707C21.0515 12.5194 21.1568 12.2651 21.1568 12C21.1568 11.7348 21.0515 11.4805 20.864 11.293L15.207 5.63598C15.1148 5.54047 15.0044 5.46428 14.8824 5.41188C14.7604 5.35947 14.6292 5.33188 14.4964 5.33073C14.3636 5.32957 14.232 5.35487 14.1091 5.40516C13.9862 5.45544 13.8745 5.52969 13.7806 5.62358C13.6867 5.71747 13.6125 5.82913 13.5622 5.95202C13.5119 6.07492 13.4866 6.2066 13.4878 6.33938C13.4889 6.47216 13.5165 6.60338 13.5689 6.72538C13.6213 6.84739 13.6975 6.95773 13.793 7.04998L17.743 11H4.50001C4.2348 11 3.98044 11.1053 3.79291 11.2929C3.60537 11.4804 3.50001 11.7348 3.50001 12C3.50001 12.2652 3.60537 12.5195 3.79291 12.7071C3.98044 12.8946 4.2348 13 4.50001 13H17.743L13.793 16.95C13.6109 17.1386 13.5101 17.3912 13.5123 17.6534C13.5146 17.9156 13.6198 18.1664 13.8052 18.3518C13.9906 18.5372 14.2414 18.6424 14.5036 18.6447C14.7658 18.6469 15.0184 18.5461 15.207 18.364L20.864 12.707Z" fill="#FCFCFC"/>
         </g>
        <defs>
        <clipPath id="clip0_33_489">
        <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24.5 0)"/>
        </clipPath>
        </defs>
    </svg>
)

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
                <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px]'/>
                <div className='flex flex-col gap-4 my-10'>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Date: 25th November</span>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Time: 11a.m WAT</span>
                    <span className='font-archivo text-[20px] font-medium text-primary'>Venue: Venue of Event</span>
                </div>
                <Button text="Register Now" svg={<RegisterIcon />}/>
            </div>
        </div>
    </div>
  )
}

export default Events