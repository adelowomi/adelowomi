/* eslint-disable react/no-unknown-property */
import React from 'react'
import Login from '@/components/Auth/Login'
import { LogoIcon } from '@/icons'

const page = () => {
  return (
    <div className="max-w-[1440px] flex flex-col gap-16 my-10 mx-auto">
        <div>
            <LogoIcon />
        </div>
        <Login/>
    </div>
  )
}

export default page