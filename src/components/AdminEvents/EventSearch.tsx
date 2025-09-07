"use client";

import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import Button from "../ui/Button";
import { CloseIcon } from "@/icons";
import { useAdminEvents } from "@/hooks/useAdmin";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onNoContent?: () => void;
}

interface EventSearchProps {
  buttonText: string;
  buttonSvg: JSX.Element;
  modalContent?: React.ReactNode;
  onNoModalContent?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  onNoContent,
}) => {
  if (!isVisible) {
    if (onNoContent) onNoContent();
    return null;
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-background border border-[#FCFCFC1A] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-background border-b border-[#FCFCFC1A] px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary font-besley">
            Create New Event
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FCFCFC1A] rounded-lg transition-colors duration-200"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6">
          {children || (
            <div className="text-center text-gray-400">
              No content available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventSearch: React.FC<EventSearchProps> = ({
  buttonText,
  buttonSvg,
  modalContent,
  onNoModalContent,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <div className="flex justify-between">
      <div></div>
      <div className="flex flex-row gap-4">
        <SearchBar />
        <Button text={buttonText} svg={buttonSvg} onClick={toggleModal} />
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onNoContent={onNoModalContent}
      >
        {React.isValidElement(modalContent)
          ? React.cloneElement(modalContent as React.ReactElement<any>, {
              onCancel: toggleModal,
              onSuccess: () => {
                toggleModal();
                // Optionally trigger a refresh of the events list here
              },
            })
          : modalContent}
      </Modal>
    </div>
  );
};

export default EventSearch;
