import React from 'react'
import Button from './Button'
import { ArrowIcon } from '@/icons'

interface AboutCardProps  {
    headerTitle: string,
    descriptionTitle: string,
    cardClassName?: string
}

const AboutCard: React.FC<AboutCardProps> = ({headerTitle, descriptionTitle, cardClassName = ''}) => {
  return (
    <div className={`border-[0.5px] border-solid border-[#FCFCFC33] flex flex-col w-[765px] pt-12 pr-12 pb-14 pl-8 rounded-lg gap-y-10 ${cardClassName}`}>
        <div className='flex flex-col gap-2'>
            <h1 className='text-primary text-[32px] font-semibold font-besley'>{headerTitle}</h1>
            <hr className={`horizontal-line ${cardClassName}`}/>
        </div> 
        <p className='text-lg font-normal text-primary font-archivo'>{descriptionTitle}</p>
        <Button text='See my work' svg={<ArrowIcon />}/>
    </div>
  )
}

export default AboutCard