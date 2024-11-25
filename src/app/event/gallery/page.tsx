import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer' 
import GalleryHero from '@/components/Gallery/GalleryHero'
import GalleryView from '@/components/Gallery/GalleryView'

const page = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <GalleryHero />
        <GalleryView />
        <Footer />
    </div>
  )
}

export default page