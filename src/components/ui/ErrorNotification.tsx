"use client";

import React, { useEffect } from "react";

interface ErrorNotificationProps {
  message: string;
  type?: "error" | "warning" | "info";
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  type = "error",
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          icon: "🚫",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          buttonColor: "text-red-600 hover:text-red-800",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: "⚠️",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          textColor: "text-yellow-800",
          buttonColor: "text-yellow-600 hover:text-yellow-800",
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: "ℹ️",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          textColor: "text-blue-800",
          buttonColor: "text-blue-600 hover:text-blue-800",
        };
      default:
        return {
          bg: "bg-red-50 border-red-200",
          icon: "🚫",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          buttonColor: "text-red-600 hover:text-red-800",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out translate-x-0 opacity-100">
      <div className={`${styles.bg} border-2 rounded-xl shadow-lg p-4`}>
        <div className="flex items-start">
          <div
            className={`${styles.iconBg} rounded-full p-2 mr-3 flex-shrink-0`}
          >
            <span className="text-lg">{styles.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`${styles.textColor} text-sm font-medium leading-relaxed`}
            >
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`${styles.buttonColor} ml-3 flex-shrink-0 transition-colors duration-200`}
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

export default ErrorNotification;
