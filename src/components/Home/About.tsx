import React from 'react'
import Button from '../ui/Button'

const ViewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g clip-path="url(#clip0_20_40)">
      <path d="M20.364 12.707C20.5514 12.5195 20.6567 12.2652 20.6567 12C20.6567 11.7348 20.5514 11.4805 20.364 11.293L14.707 5.63601C14.6147 5.5405 14.5044 5.46431 14.3824 5.41191C14.2604 5.3595 14.1291 5.33191 13.9964 5.33076C13.8636 5.3296 13.7319 5.3549 13.609 5.40519C13.4861 5.45547 13.3744 5.52972 13.2806 5.62361C13.1867 5.71751 13.1124 5.82916 13.0621 5.95205C13.0118 6.07495 12.9865 6.20663 12.9877 6.33941C12.9889 6.47219 13.0164 6.60341 13.0689 6.72541C13.1213 6.84742 13.1974 6.95776 13.293 7.05001L17.243 11H3.99995C3.73474 11 3.48038 11.1054 3.29284 11.2929C3.10531 11.4804 2.99995 11.7348 2.99995 12C2.99995 12.2652 3.10531 12.5196 3.29284 12.7071C3.48038 12.8946 3.73474 13 3.99995 13H17.243L13.293 16.95C13.1108 17.1386 13.01 17.3912 13.0123 17.6534C13.0146 17.9156 13.1197 18.1664 13.3051 18.3518C13.4905 18.5372 13.7414 18.6424 14.0036 18.6447C14.2657 18.647 14.5183 18.5462 14.707 18.364L20.364 12.707Z" fill="#F5F5F5"/>
       </g>
        <defs>
        <clipPath id="clip0_20_40">
        <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)"/>
        </clipPath>
        </defs>
    </svg>
)
 

const About = () => {
  return (
    <div className='flex flex-col bg-hero-pattern bg-cover bg-center'>
      <div className='mx-28 my-24'>
        <div className='flex flex-col gap-4 justify-center items-center py-14 px-16 rounded-lg border-[0.5px] border-solid border-[#FCFCFC33]'>
            <h1 className='text-primary text-3xl font-medium font-archivo'>MEET ADELOWO</h1>
            <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px]'/>
            <h1 className='text-primary text-[48px] font-semibold font-besley'>One Brush, Infinite Imagination</h1>
            <p className='text-primary text-lg font-normal text-center font-archivo'>Adelowo is a full stack developer, crafting magnificent websites and applications. And when I&apos;m not coding, I unleash my creative spirit, diving headfirst into the world of music, content creation and mentorship.</p>
        </div>
      </div>
      <div>
          <div className='flex flex-col py-40 px-28 gap-24'>
            <div className='border-[0.5px] border-solid border-[#FCFCFC33] flex flex-col w-[765px] pt-12 pr-12 pb-14 pl-8 rounded-lg gap-y-10'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-primary text-[32px] font-semibold font-besley'>FULL STACK ENGINEER</h1>
                <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px]'/>
              </div> 
              <p className='text-lg font-normal text-primary font-archivo'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With expertise in both front-end and back-end development, I thrive in crafting seamless user experiences and building robust, scalable technology solutions.</p>
              <Button text='See my work' svg={<ViewIcon />}/>
            </div>
            <div className='border-[0.5px] border-solid border-[#FCFCFC33] flex flex-col  w-[765px] pt-12 pr-12 pb-14 pl-8 rounded-lg gap-y-10 self-end items-end'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-primary text-[32px] font-semibold font-besley'>FULL STACK ENGINEER</h1>
                <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px] self-end'/>
              </div> 
              <p className='text-lg font-normal text-primary font-archivo'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With expertise in both front-end and back-end development, I thrive in crafting seamless user experiences and building robust, scalable technology solutions.</p>
              <Button text='See my work' svg={<ViewIcon />}/>
            </div>
            <div className='border-[0.5px] border-solid border-[#FCFCFC33] flex flex-col w-[765px] pt-12 pr-12 pb-14 pl-8 rounded-lg gap-y-10'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-primary text-[32px] font-semibold font-besley'>FULL STACK ENGINEER</h1>
                <hr className='w-[100px] rounded-xl bg-secondary border-secondary h-[4px]'/>
              </div> 
              <p className='text-lg font-normal text-primary font-archivo'>I am a passionate and highly skilled Full Stack Engineer, driven by a relentless pursuit of excellence in every project I undertake. With expertise in both front-end and back-end development, I thrive in crafting seamless user experiences and building robust, scalable technology solutions.</p>
              <Button text='See my work' svg={<ViewIcon />}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default About