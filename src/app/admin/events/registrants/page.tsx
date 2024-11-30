import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'
import EventSearch from '@/components/AdminEvents/EventSearch'
import RegistrantPage from '@/components/AdminEvents/RegistrantPage'

const page = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-[18%] border-r border-[#FCFCFC33] h-[873px]'>
        <Sidebar />
      </div>
      <div className='flex-grow m-10 flex flex-col gap-12'>
        <AdminNavbar />
        <EventSearch />
        <RegistrantPage />
      </div>
    </div>
  )
}

export default page