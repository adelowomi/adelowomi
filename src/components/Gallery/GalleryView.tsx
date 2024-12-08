import React from 'react'
import ImageCard from '../ui/ImageCard'

const GalleryView = () => {
  return (
    <div className='flex flex-col mx-28 my-24 gap-10'>
        <div className='flex flex-col gap-2'>
            <h2 className='text-primary text-[40px] font-semibold font-besley'>EVENT CAPTION/TITLE</h2>
            <hr className='horizontal-line'/>
        </div>
        <div className='grid grid-cols-3 gap-5'>
            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />

            <ImageCard />
        </div>
    </div>
  )
}

export default GalleryView