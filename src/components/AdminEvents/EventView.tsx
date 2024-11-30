import React from 'react'
import EventCard from '../ui/EventCard'

const EventView = () => {
  return (
    <div className='grid grid-cols-3 gap-12'>
        <EventCard/>

        <EventCard/>

        <EventCard/>

        <EventCard/>

        <EventCard/>

        <EventCard/>
    </div>
  )
}

export default EventView