/* eslint-disable react/no-unknown-property */
import React from 'react'
import { LogoIcon, BackIcon } from '@/icons'

const GalleryHero = () => {
  return (
    <div className='flex flex-col gap-20 px-28 py-24'>
        <div className='flex flex-row justify-between'>
            <div>
                <LogoIcon />
            </div>
            <h2 className='text-primary text-[64px] font-semibold mt-8 font-besley'>GALLERY</h2>
        </div>
        <div className='flex'>
            <BackIcon />
        </div>
    </div>
  )
}

export default GalleryHero