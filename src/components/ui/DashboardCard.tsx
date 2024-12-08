import React from 'react'

interface DashboardCardProps {
  availableNumber: number,
  type: string
  svg: JSX.Element;
  onClick?: () => void
}

const DashboardCard: React.FC<DashboardCardProps> = ({availableNumber, type, svg,  onClick}) => {
  return (
    <div className='border-[0.5px] border-solid border-[#FCFCFC33] flex flex-row justify-between items-center gap-16 px-8 py-10 rounded-lg cursor-pointer' onClick={onClick}>
        <div className='flex flex-col gap-6'>
            <h2 className='font-besley text-[48px] font-semibold text-primary'>{availableNumber}</h2>
            <h2 className='font-archivo text-lg text-primary font-normal'>Total No. of {type}</h2>
        </div>
        <div className='flex justify-center items-center p-5 bg-[#FCFCFC1A] rounded-3xl w-16 h-16'>
            {svg}
        </div>
    </div>
  )
}

export default DashboardCard