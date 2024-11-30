/* eslint-disable react/no-unknown-property */
'use client'

import React, {useState} from 'react'
import Button from '../ui/Button'

const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_110_255)">
        <path d="M20.3644 12.707C20.5519 12.5195 20.6572 12.2652 20.6572 12C20.6572 11.7348 20.5519 11.4805 20.3644 11.293L14.7074 5.63601C14.6152 5.5405 14.5048 5.46431 14.3828 5.41191C14.2608 5.3595 14.1296 5.33191 13.9968 5.33076C13.8641 5.3296 13.7324 5.3549 13.6095 5.40519C13.4866 5.45547 13.3749 5.52972 13.281 5.62361C13.1872 5.71751 13.1129 5.82916 13.0626 5.95205C13.0123 6.07495 12.987 6.20663 12.9882 6.33941C12.9893 6.47219 13.0169 6.60341 13.0693 6.72541C13.1217 6.84742 13.1979 6.95776 13.2934 7.05001L17.2434 11H4.00044C3.73522 11 3.48087 11.1054 3.29333 11.2929C3.1058 11.4804 3.00044 11.7348 3.00044 12C3.00044 12.2652 3.1058 12.5196 3.29333 12.7071C3.48087 12.8946 3.73522 13 4.00044 13H17.2434L13.2934 16.95C13.1113 17.1386 13.0105 17.3912 13.0128 17.6534C13.015 17.9156 13.1202 18.1664 13.3056 18.3518C13.491 18.5372 13.7418 18.6424 14.004 18.6447C14.2662 18.647 14.5188 18.5462 14.7074 18.364L20.3644 12.707Z" fill="#FCFCFC"/>
        </g>
        <defs>
        <clipPath id="clip0_110_255">
        <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)"/>
        </clipPath>
        </defs>
    </svg>
)

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className='bg-[#0D0900] border-[#8F630233] border-[0.5px] border-solid rounded-lg flex flex-col gap-20 pt-20 px-32 pb-32 mx-auto my-0 w-[886px]'>
        <div className='flex flex-col items-center'>
            <h2 className='text-primary font-besley text-[40px] font-semibold text-center'>LOG IN</ h2>
            <hr className='horizontal-line'/>
        </div>
        <div>
            <form>
                    <div className='flex flex-col mb-4'>
                        <label className='text-[16px] font-medium font-archivo text-primary'>Email</label>
                        <input type="text" placeholder='Email Address' className='rounded-lg bg-[#0D0900] mt-2 py-5 px-4 flex items-center w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px] font-normal' />
                    </div>

                    <div className="flex flex-col mb-8 relative">
                        <label className="text-[16px] font-medium font-archivo text-primary">Password</label>
                        <input type={isVisible ? "text" : "password"}  placeholder="Enter password" className="rounded-lg bg-[#0D0900] mt-2 py-5 px-4 w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px] font-normal pr-10" />
                        <button type="button" onClick={toggleVisibility} className="absolute top-16 right-3 text-primary focus:outline-none">
                            {isVisible ? (
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.00033 6C8.53076 6 9.03947 6.21071 9.41454 6.58579C9.78961 6.96086 10.0003 7.46957 10.0003 8C10.0003 8.53043 9.78961 9.03914 9.41454 9.41421C9.03947 9.78929 8.53076 10 8.00033 10C7.46989 10 6.96118 9.78929 6.58611 9.41421C6.21104 9.03914 6.00033 8.53043 6.00033 8C6.00033 7.46957 6.21104 6.96086 6.58611 6.58579C6.96118 6.21071 7.46989 6 8.00033 6ZM8.00033 3C11.3337 3 14.1803 5.07333 15.3337 8C14.1803 10.9267 11.3337 13 8.00033 13C4.66699 13 1.82033 10.9267 0.666992 8C1.82033 5.07333 4.66699 3 8.00033 3ZM2.12033 8C2.65916 9.1002 3.49586 10.0272 4.53531 10.6755C5.57476 11.3238 6.77526 11.6675 8.00033 11.6675C9.2254 11.6675 10.4259 11.3238 11.4653 10.6755C12.5048 10.0272 13.3415 9.1002 13.8803 8C13.3415 6.8998 12.5048 5.97283 11.4653 5.3245C10.4259 4.67616 9.2254 4.33245 8.00033 4.33245C6.77526 4.33245 5.57476 4.67616 4.53531 5.3245C3.49586 5.97283 2.65916 6.8998 2.12033 8Z" fill="#FCFCFC"/>
                            </svg> 
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8.00033 6C8.53076 6 9.03947 6.21071 9.41454 6.58579C9.78961 6.96086 10.0003 7.46957 10.0003 8C10.0003 8.53043 9.78961 9.03914 9.41454 9.41421C9.03947 9.78929 8.53076 10 8.00033 10C7.46989 10 6.96118 9.78929 6.58611 9.41421C6.21104 9.03914 6.00033 8.53043 6.00033 8C6.00033 7.46957 6.21104 6.96086 6.58611 6.58579C6.96118 6.21071 7.46989 6 8.00033 6ZM8.00033 3C11.3337 3 14.1803 5.07333 15.3337 8C14.1803 10.9267 11.3337 13 8.00033 13C4.66699 13 1.82033 10.9267 0.666992 8C1.82033 5.07333 4.66699 3 8.00033 3ZM2.12033 8C2.65916 9.1002 3.49586 10.0272 4.53531 10.6755C5.57476 11.3238 6.77526 11.6675 8.00033 11.6675C9.2254 11.6675 10.4259 11.3238 11.4653 10.6755C12.5048 10.0272 13.3415 9.1002 13.8803 8C13.3415 6.8998 12.5048 5.97283 11.4653 5.3245C10.4259 4.67616 9.2254 4.33245 8.00033 4.33245C6.77526 4.33245 5.57476 4.67616 4.53531 5.3245C3.49586 5.97283 2.65916 6.8998 2.12033 8Z" fill="#FCFCFC"/>
                                </svg>
                            )}
                        </button>
                    </div>

                    <h2 className='text-right text-primary text-[16px] font-normal font-archivo'>Forgot password?</h2>
                    <div className='mt-8'>
                        <Button text="Log In" svg={<SendIcon/>} width='w-full'/>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login