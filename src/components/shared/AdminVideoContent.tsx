import React from 'react'
import Button from '../ui/Button'

const AdminVideoContent = () => {
  return (
    <div className='w-[356px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] bg-[#0D09000D]'>
        <div className='bg-[#D9D9D9] w-full h-[350px] flex justify-center rounded-lg'>
            <h2 className='text-black mt-20'>Thumbnail Image</h2>
        </div>
        <div className='flex flex-col gap-5 py-5 px-4'>
            <h2>Content Title</h2>
            
            <Button text='Public on website' width='w-[115px]' textStyle='text-[12px] font-medium font-archivo text-primary' padding='px-2.5 py-1'/>
        </div>
    </div>
  )
}

export default AdminVideoContent