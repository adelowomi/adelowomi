import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'
import EventSearch from '@/components/AdminEvents/EventSearch'
import EventView from '@/components/AdminEvents/EventView'

const page = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-[18%] border-r border-[#FCFCFC33] h-[873px]'>
        <Sidebar />
      </div>
      <div className='flex-grow m-10 flex flex-col gap-28'>
        <AdminNavbar />
        <EventSearch />
        <EventView />
      </div>
    </div>
  )
}

export default page