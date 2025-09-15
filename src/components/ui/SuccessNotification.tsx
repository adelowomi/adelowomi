"use client";

import React, { useEffect } from "react";

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out translate-x-0 opacity-100">
      <div className="bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-4">
        <div className="flex items-start">
          <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
            <span className="text-lg">✅</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-green-800 text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-green-600 hover:text-green-800 ml-3 flex-shrink-0 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;
