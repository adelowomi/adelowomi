/* eslint-disable react/no-unknown-property */
import React from 'react'
import Login from '@/components/Auth/Login'

const page = () => {
  return (
    <div className="max-w-[1440px] my-0 mx-auto">
        <div>
            <svg width="81" height="100" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 43.1111L7.17172 28.8889M34 43.1111L27.7778 29.4222M21.5556 15.7333L16.2222 4L7.17172 28.8889M21.5556 15.7333L12.6667 43.1111M21.5556 15.7333L27.7778 29.4222M7.17172 28.8889L27.7778 29.4222" stroke="#FCFCFC" stroke-width="3"/>
            </svg>
        </div>
        <Login/>
    </div>
  )
}

export default page