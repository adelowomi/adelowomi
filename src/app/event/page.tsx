import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Contact from '@/components/shared/Contact'
import Gallery from '@/components/Event/Gallery'
import Vision from '@/components/Event/Vision'
import Passion from '@/components/Event/Passion'
import EventHero from '@/components/Event/EventHero'

const Home = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <EventHero />
        <Passion />
        <Vision />
        <Gallery />
        <Contact />
        <Footer/>
    </div>
  )
}

export default Home