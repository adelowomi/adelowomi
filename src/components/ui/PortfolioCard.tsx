import React from 'react'

interface CustomPortfolioCardProps {
    header: string;
    portfolioNumber: string
    projectTitle: string
  }

const PortfolioCard: React.FC<CustomPortfolioCardProps> = ({portfolioNumber, header, projectTitle}) => {
  return (
    <div className="relative">
        <div className="absolute text-stroke top-[-100px] right-[-52px] text-[140px] leading-[192px] font-semibold text-[#0D0900]">
            {portfolioNumber}
        </div>
        <div className='flex flex-row justify-between px-16 pt-20 pb-24 gap-[247px] rounded-lg border-[0.5px] border-solid border-[#fcfcfc33]'>
            <h2 className='w-[356px] text-lg font-normal text-primary font-archivo'>{header}</h2>
            <div className='flex flex-col gap-9'>
                <h3 className='text=[#fcfcfc] text-4xl font-normal font-besley'>{projectTitle}</h3>
                <p className='text-[#732383] text-lg font-normal font-archivo'>View project</p>
            </div>
        </div>
    </div>
  )
}

export default PortfolioCard