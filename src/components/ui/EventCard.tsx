'use client'

import React, { useState } from 'react'
import Button from './Button'
import ProgressBar from './ProgressBar'

const EventCard = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);
  return (
    <div className='flex flex-col gap-6 rounded-lg border-[0.5px] border-solid border-[#fcfcfc33] w-[356px]'>
        <div className='w-[356px] h-[218px] rounded-lg bg-[#d9d9d9] flex justify-center items-center'>
            <h2 className='text-black text-[24px] font-medium font-archivo'>Thumbnail Image</h2>
        </div>
        <div className='px-5 pt-2 pb-4'>
            <div className='flex justify-between items-center relative'>
                <Button text='Unpublished' width='w-[89px]' padding='px-3 py-1' textStyle='font-archivo text-[12px] font-medium'/>
                <span className='cursor-pointer relative' onClick={togglePopup}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C11.4696 7 10.9609 6.78929 10.5858 6.41421C10.2107 6.03914 10 5.53043 10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7ZM14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12ZM14 19C14 19.5304 13.7893 20.0391 13.4142 20.4142C13.0391 20.7893 12.5304 21 12 21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19C10 18.4696 10.2107 17.9609 10.5858 17.5858C10.9609 17.2107 11.4696 17 12 17C12.5304 17 13.0391 17.2107 13.4142 17.5858C13.7893 17.9609 14 18.4696 14 19Z" fill="#FCFCFC"/>
                    </svg>
                </span>
                {showPopup && (
                    <div className="absolute top-8 right-0 bg-[#0D0900] border-none rounded-lg p-2.5 z-50 w-[116px]">
                    <ul className="text-white font-archivo text-lg font-normal space-y-2">
                        <li className="cursor-pointer flex flex-row items-center gap-2.5 text-secondary">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#732383" stroke-width="1.33333"/>
                                <path d="M13.4587 7.28933C13.7173 7.604 13.8467 7.76067 13.8467 8C13.8467 8.23933 13.7173 8.396 13.4587 8.71067C12.512 9.86 10.424 12 7.99999 12C5.57599 12 3.48799 9.86 2.54132 8.71067C2.28265 8.396 2.15332 8.23933 2.15332 8C2.15332 7.76067 2.28265 7.604 2.54132 7.28933C3.48799 6.14 5.57599 4 7.99999 4C10.424 4 12.512 6.14 13.4587 7.28933Z" stroke="#732383" stroke-width="1.33333"/>
                            </svg>
                            View
                        </li>
                        <li className="cursor-pointer flex flex-row items-center gap-2.5 text-[#B40606]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.66699 14C4.30033 14 3.98655 13.8696 3.72566 13.6087C3.46477 13.3478 3.3341 13.0338 3.33366 12.6667V4H2.66699V2.66667H6.00033V2H10.0003V2.66667H13.3337V4H12.667V12.6667C12.667 13.0333 12.5365 13.3473 12.2757 13.6087C12.0148 13.87 11.7008 14.0004 11.3337 14H4.66699ZM11.3337 4H4.66699V12.6667H11.3337V4ZM6.00033 11.3333H7.33366V5.33333H6.00033V11.3333ZM8.66699 11.3333H10.0003V5.33333H8.66699V11.3333Z" fill="#B40606"/>
                            </svg>
                            Delete
                        </li>
                        <li className="cursor-pointer flex flex-row items-center gap-2.5 text-[#0D07CB]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33333 12.6667H4.28333L10.8 6.15L9.85 5.2L3.33333 11.7167V12.6667ZM2 14V11.1667L10.8 2.38333C10.9333 2.26111 11.0807 2.16667 11.242 2.1C11.4033 2.03333 11.5727 2 11.75 2C11.9273 2 12.0996 2.03333 12.2667 2.1C12.4338 2.16667 12.5782 2.26667 12.7 2.4L13.6167 3.33333C13.75 3.45556 13.8473 3.6 13.9087 3.76667C13.97 3.93333 14.0004 4.1 14 4.26667C14 4.44444 13.9696 4.614 13.9087 4.77533C13.8478 4.93667 13.7504 5.08378 13.6167 5.21667L4.83333 14H2ZM10.3167 5.68333L9.85 5.2L10.8 6.15L10.3167 5.68333Z" fill="#0D07CB"/>
                            </svg>
                            Edit
                        </li>

                        <li className="cursor-pointer flex flex-row items-center gap-2.5 text-[#028F1C]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33366 13.3334V7.90002L5.60033 9.63335L4.66699 8.66669L8.00033 5.33335L11.3337 8.66669L10.4003 9.63335L8.66699 7.90002V13.3334H7.33366ZM2.66699 6.00002V2.66669H13.3337V6.00002H12.0003V4.00002H4.00033V6.00002H2.66699Z" fill="#028F1C"/>
                            </svg>
                            Publish
                        </li>

                        <li className="cursor-pointer flex flex-row items-center gap-2.5 text-[#FFB616]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33366 3.51335L2.18699 2.66669L13.3337 13.8134L12.487 14.6667L10.4337 12.6134C9.66699 12.8667 8.85366 13 8.00033 13C4.66699 13 1.82033 10.9267 0.666992 8.00002C1.12699 6.82669 1.86033 5.79335 2.79366 4.97335L1.33366 3.51335ZM8.00033 6.00002C8.53076 6.00002 9.03947 6.21073 9.41454 6.58581C9.78961 6.96088 10.0003 7.46959 10.0003 8.00002C10.0007 8.22706 9.96234 8.45251 9.88699 8.66669L7.33366 6.11335C7.54784 6.03801 7.77328 5.99968 8.00033 6.00002ZM8.00033 3.00002C11.3337 3.00002 14.1803 5.07335 15.3337 8.00002C14.7892 9.38198 13.8647 10.5816 12.667 11.46L11.7203 10.5067C12.6423 9.86899 13.3858 9.00609 13.8803 8.00002C13.3414 6.89993 12.5047 5.97311 11.4652 5.32492C10.4258 4.67674 9.22532 4.3332 8.00033 4.33335C7.27366 4.33335 6.56033 4.45335 5.89366 4.66669L4.86699 3.64669C5.82699 3.23335 6.88699 3.00002 8.00033 3.00002ZM2.12033 8.00002C2.65922 9.10011 3.49596 10.0269 4.53542 10.6751C5.57487 11.3233 6.77533 11.6668 8.00033 11.6667C8.46033 11.6667 8.91366 11.62 9.33366 11.5267L7.81366 10C7.34977 9.9503 6.91688 9.74327 6.58698 9.41337C6.25708 9.08347 6.05005 8.65058 6.00033 8.18669L3.73366 5.91335C3.07366 6.48002 2.52033 7.18669 2.12033 8.00002Z" fill="#FFB616"/>
                            </svg>
                            Hide
                        </li>
                    </ul>
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 my-5'>
                <span className='font-besley text-[20px] font-semibold text-primary'>Date: 25th November</span>
                <span className='font-archivo text-[16px] font-light text-primary'>Time: 11a.m WAT</span>
                <span className='font-archivo text-[16px] font-light text-primary'>Venue: Venue of Event</span>
            </div>
            <div className='flex flex-col gap-1 mb-4'>
                <div className='flex flex-row justify-between'>
                    <span className='text-primary font-archivo text-[12px] font-light'>50 tickets left</span>
                    <span className='text-primary font-archivo text-[12px] font-light'>15 days left</span>
                </div>
                <ProgressBar progress={40}/>
            </div>
            
        </div>
    </div>
  )
}

export default EventCard