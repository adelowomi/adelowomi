import React from 'react'
import Sidebar from '@/components/shared/Sidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'
import EventSearch from '@/components/AdminEvents/EventSearch'
import GalleryDisplay from '@/components/AdminGallery/GalleryDisplay'
import { PlusIcon, ArrowIcon } from '@/icons'
import Button from '@/components/ui/Button'

const CustomContent = () => (
  <div className='flex flex-col gap-20'>
              <div className='flex flex-col gap-2 items-center'>
                <h2 className="text-primary text-[32px] font-semibold font-besley">Create Event Folder</h2>
                <hr className='horizontal-line'/>
              </div>

              <form className='flex flex-col gap-6 justify-center items-center'>
                  <div className='flex flex-col gap-1'>
                      <label className='text-lg font-medium font-archivo text-primary'>Event Title</label>
                      <input type="text" placeholder='Enter event title' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary' />
                  </div>

                  <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Date</label>
                        <input type="text" placeholder='Enter date' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Time</label>
                        <input type="text" placeholder='Enter time' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>
                  </div>

                  <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Event Venue</label>
                        <input type="text" placeholder='Enter event venue' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Upload Cover Image</label>
                        <input type="text" placeholder='upload image' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>
                  </div>

                  <div className='my-4'>
                      <Button text="Create Event Folder" svg={<ArrowIcon/>} width='w-[624px]'/>
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
      <div className='flex-grow m-10 flex flex-col gap-28'>
        <AdminNavbar />
        <EventSearch buttonText='Create Event Folder' buttonSvg={<PlusIcon />} modalContent={<CustomContent />}/>
        <GalleryDisplay />
      </div>
    </div>
  )
}

export default page