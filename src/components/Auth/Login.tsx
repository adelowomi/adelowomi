/* eslint-disable react/no-unknown-property */
'use client'

import React, {useState} from 'react'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'
import { ArrowIcon, PasswordViewIcon } from '@/icons'


const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter()

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const loginUser = () => {
    router.push('/admin/dashboard')
  }

  return (
    <div className='bg-[bg-surface] border-[#8F630233] border-[0.5px] border-solid rounded-lg flex flex-col gap-20 pt-20 px-32 pb-32 mx-auto my-0 w-[886px]'>
        <div className='flex flex-col items-center'>
            <h2 className='text-primary font-besley text-[40px] font-semibold text-center'>LOG IN</ h2>
            <hr className='horizontal-line'/>
        </div>
        <div>
            <form>
                    <div className='flex flex-col mb-4'>
                        <label className='text-[16px] font-medium font-archivo text-primary'>Email</label>
                        <input type="text" placeholder='Email Address' className='rounded-lg bg-[bg-surface] mt-2 py-5 px-4 flex items-center w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px] font-normal' />
                    </div>

                    <div className="flex flex-col mb-8 relative">
                        <label className="text-[16px] font-medium font-archivo text-primary">Password</label>
                        <input type={isVisible ? "text" : "password"}  placeholder="Enter password" className="rounded-lg bg-[bg-surface] mt-2 py-5 px-4 w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px] font-normal pr-10" />
                        <button type="button" onClick={toggleVisibility} className="absolute top-16 right-3 text-primary focus:outline-none">
                            {isVisible ? (<PasswordViewIcon />) : ( <PasswordViewIcon />)}
                        </button>
                    </div>

                    <h2 className='text-right text-primary text-[16px] font-normal font-archivo'>Forgot password?</h2>
                    <div className='mt-8'>
                        <Button text="Log In" svg={<ArrowIcon/>} width='w-full' onClick={loginUser}/>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login