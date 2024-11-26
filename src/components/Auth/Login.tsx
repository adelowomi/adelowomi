/* eslint-disable react/no-unknown-property */
import React from 'react'
import Button from '../ui/Button'

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_71_243)">
        <path d="M15.964 0.68605C16.0004 0.595186 16.0093 0.495646 15.9896 0.39977C15.97 0.303893 15.9226 0.215897 15.8534 0.146691C15.7842 0.0774845 15.6962 0.030111 15.6003 0.0104435C15.5044 -0.00922396 15.4049 -0.000320453 15.314 0.0360502L0.767017 5.85505H0.766017L0.314017 6.03505C0.228408 6.0692 0.153903 6.12635 0.098733 6.20018C0.0435631 6.27401 0.00987534 6.36166 0.0013908 6.45344C-0.00709374 6.54522 0.00995519 6.63755 0.0506543 6.72025C0.0913535 6.80295 0.154119 6.87279 0.232017 6.92205L0.642017 7.18205L0.643017 7.18405L5.63802 10.3621L8.81602 15.3571L8.81802 15.3591L9.07802 15.7691C9.12744 15.8466 9.19732 15.9091 9.27995 15.9495C9.36259 15.99 9.45478 16.0068 9.54638 15.9983C9.63798 15.9897 9.72543 15.956 9.79912 15.9009C9.87281 15.8458 9.92987 15.7715 9.96402 15.6861L15.964 0.68605ZM14.131 2.57605L6.63702 10.0701L6.42202 9.73205C6.38262 9.67003 6.33004 9.61744 6.26802 9.57805L5.93002 9.36305L13.424 1.86905L14.602 1.39805L14.132 2.57605H14.131Z" fill="#FCFCFC"/>
        </g>
        <defs>
        <clipPath id="clip0_71_243">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
)

const Login = () => {
  return (
    <div className='bg-[#0D0900] border-[#8F630233] border-[0.5px] border-solid rounded-lg flex flex-col gap-20 pt-20 px-32 pb-32'>
        <div className='align-center'>
            <h2 className='text-primary font-besley text-[40px] font-semibold'>LOG IN</h2>
            <hr className='horizontal-line'/>
        </div>
        <div>
            <form>
                    <div className='flex flex-col mb-4'>
                        <label className='text-lg font-medium font-archivo text-primary'>Email</label>
                        <input type="text" placeholder='Full name' className='rounded-lg bg-black mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary' />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='text-lg font-medium font-archivo text-primary'>Password</label>
                        <input type="text" placeholder='Email address' className='rounded-lg bg-black mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                    </div>

                    <div className='mt-20'>
                        <Button text="Send Message" svg={<SendIcon/>}/>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login