'use client'

import React, { useState } from 'react'
import SearchBar from '../shared/SearchBar'
import Button from '../ui/Button'

interface ModalProps {
  isVisible: boolean,
  onClose: () => void
}

const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 11V5L13 5V11H19V13H13V19H11V13H5V11H11Z" fill="#FCFCFC"/>
    </svg>
)

const SendIcon = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_118_340)">
<path d="M20.8644 12.707C21.0519 12.5195 21.1572 12.2652 21.1572 12C21.1572 11.7348 21.0519 11.4805 20.8644 11.293L15.2074 5.63601C15.1152 5.5405 15.0048 5.46431 14.8828 5.41191C14.7608 5.3595 14.6296 5.33191 14.4968 5.33076C14.3641 5.3296 14.2324 5.3549 14.1095 5.40519C13.9866 5.45547 13.8749 5.52972 13.781 5.62361C13.6872 5.71751 13.6129 5.82916 13.5626 5.95205C13.5123 6.07495 13.487 6.20663 13.4882 6.33941C13.4893 6.47219 13.5169 6.60341 13.5693 6.72541C13.6217 6.84742 13.6979 6.95776 13.7934 7.05001L17.7434 11H4.50044C4.23522 11 3.98087 11.1054 3.79333 11.2929C3.6058 11.4804 3.50044 11.7348 3.50044 12C3.50044 12.2652 3.6058 12.5196 3.79333 12.7071C3.98087 12.8946 4.23522 13 4.50044 13H17.7434L13.7934 16.95C13.6113 17.1386 13.5105 17.3912 13.5128 17.6534C13.515 17.9156 13.6202 18.1664 13.8056 18.3518C13.991 18.5372 14.2418 18.6424 14.504 18.6447C14.7662 18.647 15.0188 18.5462 15.2074 18.364L20.8644 12.707Z" fill="#FCFCFC"/>
</g>
<defs>
<clipPath id="clip0_118_340">
<rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24.5 0)"/>
</clipPath>
</defs>
</svg>
)

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#0D0900] rounded-lg w-[886px] py-4 px-16">
          <div className='flex justify-between my-2'>
            <div></div>
            <div onClick={onClose} className='cursor-pointer'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.387 26.28L26.2803 24.3867L17.8803 16L26.2803 7.61331L24.387 5.72L16.0003 14.12L7.61358 5.72L5.72027 7.61331L14.1203 16L5.72027 24.3867L7.61358 26.28L16.0003 17.88L24.387 26.28Z" fill="#FCFCFC"/>
              </svg>
            </div>
          </div>

          <div className='flex flex-col gap-20'>
              <div className='flex flex-col gap-2 items-center'>
                <h2 className="text-primary text-[32px] font-semibold font-besley">Create New Event</h2>
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

                  <div className='flex flex-col gap-1'>
                      <label className='text-lg font-medium font-archivo text-primary'>Event Venue</label>
                      <input type="text" placeholder='Enter event venue' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[624px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                  </div>

                  <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>No. of Seats</label>
                        <input type="text" placeholder='Specify number of seats' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Upload Image</label>
                        <input type="text" placeholder='upload image' className='rounded-lg bg-black mt-2 py-5 px-4 flex items-center w-[300px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>
                  </div>

                  <div className='my-4'>
                      <Button text="Create Event" svg={<SendIcon/>} width='w-[624px]'/>
                  </div>
            </form>

          </div>
          
        </div>
      </div>
    );
  };

const EventSearch = () => {
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <div className='flex justify-between'>
        <div></div>
        <div className='flex flex-row gap-4'>
            <SearchBar />
            <Button text='Create New Event' svg={<AddIcon/>} onClick={toggleModal}/>
        </div>
        <Modal isVisible={isModalVisible} onClose={toggleModal} />
    </div>
  )
}

export default EventSearch