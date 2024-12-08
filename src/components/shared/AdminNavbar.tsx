'use client'

import React from 'react'
import { LogOutIcon } from '@/icons'
import { usePathname } from 'next/navigation'

const AdminNavbar = () => {
  const pathname = usePathname();

  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    const adminIndex = parts.indexOf('admin');
    if (adminIndex === -1) return 'Dashboard';
    const subPaths = parts.slice(adminIndex + 1);
    return subPaths
      .map(part => part.charAt(0).toUpperCase() + part.slice(1)) 
      .join(' / ');
  }
  return (
    <div className="flex flex-row justify-between">
        <div className='flex flex-col gap-2'>
            <h2 className="text-[#FCFCFC80] text-[16px] font-archivo font-normal">Admin Profile</h2>
            <h2 className='text-primary font-archivo font-bold text-2xl'>{getPageTitle()}</h2>
        </div>
        <button className='px-6 py-3 rounded-lg border-[0.5px] border-solid border-secondary text-secondary text-[16px] font-archivo font-normal flex justify-center items-center gap-2.5'>
              Log Out
              <LogOutIcon />
        </button>
    </div>
  )
}

export default AdminNavbar