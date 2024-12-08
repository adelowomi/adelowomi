import React from 'react'
import { DownloadIcon } from '@/icons'

const ImageCard = () => {
  return (
    <div className='w-[386px] h-[400px] rounded-lg bg-[#8F8C8C] relative flex justify-center items-center'>
        <h2 className='text-[48px] text-black font-medium'>IMAGE</h2>
        <div className='absolute bottom-0 right-0  p-6 bg-[#0D090080] flex justify-center items-center'>
            <DownloadIcon />
        </div>
    </div>
  )
}

export default ImageCard