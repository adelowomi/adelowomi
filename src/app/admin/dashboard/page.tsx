import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'
import DasboardView from '@/components/Dashboard/DasboardView'

const page = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-[18%] border-r border-[#FCFCFC33] h-[873px]'>
        <Sidebar />
      </div>
      <div className='flex-1 m-10 flex flex-col gap-28'>
        <AdminNavbar />
        <DasboardView/>
      </div>
    </div>
  )
}

export default page