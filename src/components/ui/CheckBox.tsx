'use client';

import React, { useState } from 'react';

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex">
      <label className="relative inline-block w-6 h-6">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          className="absolute w-0 h-0 opacity-0"
        />

        <div className="w-6 h-6 bg-primary border-none rounded-sm flex items-center justify-center transition-all duration-300">
          {isChecked && (
            <div className="w-4 h-4 bg-secondary rounded-sm transition-all duration-300"></div>
          )}
        </div>
      </label>
    </div>
  );
};

export default CheckBox;