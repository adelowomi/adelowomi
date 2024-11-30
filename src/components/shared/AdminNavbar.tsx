import React from 'react'

const AdminNavbar = () => {
  return (
    <div className="flex flex-row justify-between">
        <div className='flex flex-col gap-2'>
            <h2 className="text-[#FCFCFC80] text-[16px] font-archivo font-normal">Admin Profile</h2>
            <h2 className='text-primary font-archivo font-bold text-2xl'>Dashboard</h2>
        </div>
        <button className='px-6 py-3 rounded-lg border-[0.5px] border-solid border-secondary text-secondary text-[16px] font-archivo font-normal flex justify-center items-center gap-2.5'>
              Log Out
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.83333 3.33333H8.5V2H3.83333C3.1 2 2.5 2.6 2.5 3.33333V12.6667C2.5 13.4 3.1 14 3.83333 14H8.5V12.6667H3.83333V3.33333ZM14.5 8L11.8333 5.33333V7.33333H6.5V8.66667H11.8333V10.6667L14.5 8Z" fill="#8F6302"/>
            </svg>
            </button>
    </div>
  )
}

export default AdminNavbar