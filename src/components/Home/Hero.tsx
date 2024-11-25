import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col gap-0'>
        <div className='flex flex-row'>
            <div className='flex flex-col px-28 py-16'>
                <div>
                    <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
                    </svg>
                </div>
                <h1 className='w-[519px] text-[#fcfcfc] text-[96px] mt-8 font-besley'>Adelowo Ajibola</h1>
                <h1 className='mt-[258px] text-[#8F6302] text-[48px] font-semibold font-besley'>HELLO!</h1>         
            </div>
            <div>
                <img src="/assets/hero.png" alt="" />
            </div>
        </div>
        <div className='px-28 w-[80%] space-y-3'>
            <h2 className='text-primary font-medium text-3xl font-besley'>I’M DELIGHTED TO INTRODUCE MYSELF</h2>
            <p className='text-primary font-normal text-lg font-archivo'>A full stack developer, crafting magnificent websites and applications. And when I&apos;m not coding, I unleash my creative spirit, diving headfirst into the world of music.</p>
        </div>
    </div>
  )
}

export default Hero