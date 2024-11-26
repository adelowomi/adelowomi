/* eslint-disable react/no-unknown-property */
'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const Navbar = () => {

  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/music', label: 'Music' },
    { href: '/event', label: 'Event' },
]

  return (
    <div className='flex justify-between px-28 py-4'>
        <div className='flex'>
          <ul className='flex justify-between gap-12'>
            {links.map((link) => {
                      const isActive =
                          link.href === '/'
                              ? pathname === link.href 
                              : pathname.startsWith(link.href); 

                      return (
                          <li
                              key={link.href}
                              className={`font-normal font-archivo uppercase text-xl ${
                                  isActive ? 'text-secondary' : 'text-primary'
                              }`}
                          >
                              <Link href={link.href}>{link.label}</Link>
                          </li>
                      );
                  })}
            </ul>
        </div>
        <div>
            <button className='px-6 py-3 rounded-lg border-2 border-solid border-[#8F6302] font-archivo text-secondary flex justify-center items-center gap-2'>
              Say Hello
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_33_4)">
                <path d="M15.964 0.68605C16.0004 0.595186 16.0093 0.495646 15.9896 0.39977C15.9699 0.303893 15.9226 0.215897 15.8534 0.146691C15.7842 0.0774845 15.6962 0.030111 15.6003 0.0104435C15.5044 -0.00922396 15.4049 -0.000320453 15.314 0.0360502L0.767002 5.85505H0.766002L0.314002 6.03505C0.228392 6.0692 0.153888 6.12635 0.0987177 6.20018C0.0435479 6.27401 0.00986008 6.36166 0.00137554 6.45344C-0.007109 6.54522 0.00993993 6.63755 0.0506391 6.72025C0.0913382 6.80295 0.154104 6.87279 0.232002 6.92205L0.642002 7.18205L0.643002 7.18405L5.638 10.3621L8.816 15.3571L8.818 15.3591L9.078 15.7691C9.12743 15.8466 9.1973 15.9091 9.27994 15.9495C9.36257 15.99 9.45476 16.0068 9.54636 15.9983C9.63796 15.9897 9.72542 15.956 9.7991 15.9009C9.87279 15.8458 9.92985 15.7715 9.964 15.6861L15.964 0.68605ZM14.131 2.57605L6.637 10.0701L6.422 9.73205C6.38261 9.67003 6.33003 9.61744 6.268 9.57805L5.93 9.36305L13.424 1.86905L14.602 1.39805L14.132 2.57605H14.131Z" fill="#8F6302"/>
                </g>
                <defs>
                <clipPath id="clip0_33_4">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </button>
        </div>
    </div>
  )
}

export default Navbar