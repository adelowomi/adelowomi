'use client'

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path; 
  return (
    <div className='flex flex-col items-center my-20 mx-10 gap-28'>
      <div className='ml-6'>
          <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
          </svg>
      </div>
      <div className='flex flex-col gap-5'>
        <Link href="/admin/dashboard">
          <span className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
                isActive('/admin/dashboard') ? 'bg-white text-secondary'  : 'bg-none text-primary' }`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1111 6.66667V0H20V6.66667H11.1111ZM0 11.1111V0H8.88889V11.1111H0ZM11.1111 20V8.88889H20V20H11.1111ZM0 20V13.3333H8.88889V20H0ZM2.22222 8.88889H6.66667V2.22222H2.22222V8.88889ZM13.3333 17.7778H17.7778V11.1111H13.3333V17.7778ZM13.3333 4.44444H17.7778V2.22222H13.3333V4.44444ZM2.22222 17.7778H6.66667V15.5556H2.22222V17.7778Z" fill={isActive('/admin/dashboard') ? '#8F6302' : '#FCFCFC'}/>
              </svg>
              Dashboard
            </span>
        </Link>
        <Link href="/admin/events">
          <span className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive('/admin/events') ? 'bg-white text-secondary'  : 'bg-none text-primary' }`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.1818 14.5455V6.36364H5.45455V14.5455H18.1818ZM18.1818 1.81818C18.664 1.81818 19.1265 2.00974 19.4675 2.35071C19.8084 2.69169 20 3.15415 20 3.63636V14.5455C20 15.0277 19.8084 15.4901 19.4675 15.8311C19.1265 16.1721 18.664 16.3636 18.1818 16.3636H5.45455C4.97233 16.3636 4.50987 16.1721 4.1689 15.8311C3.82792 15.4901 3.63636 15.0277 3.63636 14.5455V3.63636C3.63636 3.15415 3.82792 2.69169 4.1689 2.35071C4.50987 2.00974 4.97233 1.81818 5.45455 1.81818H6.36364V0H8.18182V1.81818H15.4545V0H17.2727V1.81818H18.1818ZM1.81818 18.1818H14.5455V20H1.81818C1.33597 20 0.873508 19.8084 0.532533 19.4675C0.191558 19.1265 0 18.664 0 18.1818V7.27273H1.81818V18.1818ZM16.3636 12.7273H12.7273V9.09091H16.3636V12.7273Z" fill={isActive('/admin/events') ? '#8F6302' : '#FCFCFC'}/>
            </svg>
            Events
          </span>
        </Link>
        <Link href="/admin/gallery">
          <span className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive('/admin/gallery') ? 'bg-white text-secondary'  : 'bg-none text-primary' }`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1C15.714 1 18.071 1 19.535 2.464C21 3.93 21 6.286 21 11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11Z" stroke={isActive('/admin/gallery') ? '#8F6302' : '#FCFCFC'} stroke-width="1.91667"/>
            <path d="M15 9.00006C16.1046 9.00006 17 8.10463 17 7.00006C17 5.89549 16.1046 5.00006 15 5.00006C13.8954 5.00006 13 5.89549 13 7.00006C13 8.10463 13.8954 9.00006 15 9.00006Z" stroke={isActive('/admin/gallery') ? '#8F6302' : '#FCFCFC'} stroke-width="1.91667"/>
            <path d="M1 11.5L2.752 9.96702C3.19114 9.58309 3.75974 9.38035 4.34272 9.39985C4.9257 9.41934 5.47949 9.65961 5.892 10.072L10.182 14.362C10.5149 14.6949 10.9546 14.8996 11.4235 14.9402C11.8925 14.9808 12.3608 14.8547 12.746 14.584L13.045 14.374C13.6006 13.9838 14.2721 13.7936 14.9498 13.8345C15.6275 13.8753 16.2713 14.1449 16.776 14.599L20 17.5" stroke={isActive('/admin/gallery') ? '#8F6302' : '#FCFCFC'} stroke-width="1.91667" stroke-linecap="round"/>
            </svg>
            Gallery
          </span>
        </Link>
        <Link href='/admin/video'>
          <span className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive('/admin/video') ? 'bg-white text-secondary'  : 'bg-none text-primary' }`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill={isActive('/admin/video') ? '#8F6302' : '#FCFCFC'}/>
            <path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill={isActive('/admin/video') ? '#8F6302' : '#FCFCFC'}/>
            </svg>
            Videos
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar