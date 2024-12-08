'use client'

import React, { useState } from 'react'
import SearchBar from '../shared/SearchBar'
import Button from '../ui/Button'
import { CloseIcon } from '@/icons'

interface ModalProps {
  isVisible: boolean,
  onClose: () => void
  children?: React.ReactNode;
  onNoContent?: () => void;
}

interface EventSearchProps {
  buttonText: string;
  buttonSvg: JSX.Element;
  modalContent?: React.ReactNode;
  onNoModalContent?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children, onNoContent }) => {
  if (!isVisible) {
    if (onNoContent) onNoContent();
    return null;
  }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#0D0900] rounded-lg w-[886px] py-4 px-16">
          <div className='flex justify-between my-2'>
            <div></div>
            <div onClick={onClose} className='cursor-pointer'>
              <CloseIcon />
            </div>
          </div>
          {children || (
          <div className="text-center text-white">No content available.</div>
        )}
        </div>
      </div>
    );
  };

const EventSearch: React.FC<EventSearchProps> = ({buttonText, buttonSvg, modalContent, onNoModalContent}) => {
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <div className='flex justify-between'>
        <div></div>
        <div className='flex flex-row gap-4'>
            <SearchBar />
            <Button text={buttonText} svg={buttonSvg} onClick={toggleModal}/>
        </div>
        <Modal isVisible={isModalVisible} onClose={toggleModal} onNoContent={onNoModalContent}>
          {modalContent}
        </Modal>
    </div>
  )
}

export default EventSearch