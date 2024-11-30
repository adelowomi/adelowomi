import React from 'react'

const DashboardCard = () => {
  return (
    <div className='border-[0.5px] border-solid border-[#FCFCFC33] flex flex-row justify-between gap-16 px-8 py-10 rounded-lg'>
        <div className='flex flex-col gap-6'>
            <h2 className='font-besley text-[48px] font-semibold text-primary'>25</h2>
            <h2 className='font-archivo text-lg text-primary font-normal'>Total No. of Events</h2>
        </div>
        <div className='flex justify-center items-center p-5 bg-[#FCFCFC1A] rounded-3xl w-16 h-16'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.0909 23.2727V10.1818H8.72727V23.2727H29.0909ZM29.0909 2.90909C29.8624 2.90909 30.6024 3.21558 31.1479 3.76114C31.6935 4.3067 32 5.04664 32 5.81818V23.2727C32 24.0443 31.6935 24.7842 31.1479 25.3298C30.6024 25.8753 29.8624 26.1818 29.0909 26.1818H8.72727C7.95573 26.1818 7.2158 25.8753 6.67023 25.3298C6.12467 24.7842 5.81818 24.0443 5.81818 23.2727V5.81818C5.81818 5.04664 6.12467 4.3067 6.67023 3.76114C7.2158 3.21558 7.95573 2.90909 8.72727 2.90909H10.1818V0H13.0909V2.90909H24.7273V0H27.6364V2.90909H29.0909ZM2.90909 29.0909H23.2727V32H2.90909C2.13755 32 1.39761 31.6935 0.852053 31.1479C0.306493 30.6024 0 29.8624 0 29.0909V11.6364H2.90909V29.0909ZM26.1818 20.3636H20.3636V14.5455H26.1818V20.3636Z" fill="#FCFCFC"/>
            </svg>
        </div>
    </div>
  )
}

export default DashboardCard