"use client";

import React from "react";

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  onChange,
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex">
      <label className="relative inline-block w-6 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          className="absolute w-0 h-0 opacity-0"
        />

        <div
          className={`w-6 h-6 bg-primary border-none rounded-sm flex items-center justify-center transition-all duration-300 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {checked && (
            <div className="w-4 h-4 bg-secondary rounded-sm transition-all duration-300"></div>
          )}
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
