import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'
import EventSearch from '@/components/AdminEvents/EventSearch'
import AdminVideo from '@/components/AdminVideo/AdminVideo'
import { PlusIcon, ArrowIcon } from '@/icons'
import Button from '@/components/ui/Button'

const CustomContent = () => (
  <div className='flex flex-col gap-20'>
              <div className='flex flex-col gap-2 items-center'>
                <h2 className="text-primary text-[32px] font-semibold font-besley">Add New Video</h2>
                <hr className='horizontal-line'/>
              </div>

              <form className='flex flex-col gap-6 justify-center items-center'>
                  <div className='flex flex-col gap-1'>
                      <label className='text-lg font-medium font-archivo text-primary'>Title</label>
                      <input type="text" placeholder='Enter event title' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary' />
                  </div>

                  <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Video Link</label>
                        <input type="text" placeholder='Enter video link' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Video Category</label>
                        <input type="text" placeholder='Enter video link' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Video Description(optional)</label>
                        <input type="text" placeholder='Enter video link' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                  <div className='my-4'>
                      <Button text="Add Video" svg={<ArrowIcon/>} width='w-[624px]'/>
                  </div>
            </form>

          </div>
)

const page = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-[18%] border-r border-[#FCFCFC33] h-[873px]'>
        <Sidebar />
      </div>
      <div className='flex-grow m-10 flex flex-col gap-12'>
        <AdminNavbar />
        <EventSearch buttonText='Add Video' buttonSvg={<PlusIcon />} modalContent={<CustomContent />}/>
        <AdminVideo />
      </div>
    </div>
  )
}

export default page