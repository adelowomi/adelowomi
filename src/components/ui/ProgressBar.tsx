import React from 'react'

interface ProgressBarProps {
    progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> =({ progress = 50}) => {
  return (
    <div className="w-full bg-[#FCFCFC4D] rounded-lg h-2.5">
      <div
        className="bg-[#F9FF3F] h-2.5 rounded-lg transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar