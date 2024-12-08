import React from 'react'
import Button from '../ui/Button'
import CheckBox from '../ui/CheckBox'
import { SendIcon } from '@/icons'

const RegisterEvent = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className="bg-[#0D0900] rounded-lg py-16 px-24 border-[0.5px] border-solid border-[#8F630233]">

        <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-10 items-center'>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-primary text-[40px] font-semibold font-besley">EVENT CAPTION</h2>
                    <hr className='horizontal-line'/>
                </div>
                <div className='flex flex-row gap-8 justify-center'>
                    <span className='text-primary font-archivo text-2xl font-normal'>Date: 25th November</span>
                    <span className='text-primary font-archivo text-2xl font-normal'>Time: 11am WAT</span>
                    <span className='text-primary font-archivo text-2xl font-normal'>Venue: Venue of Event</span>
                </div>
            </div>

            <form className='flex flex-col gap-6 items-center w-[872px]'>

                <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-[16px] font-medium font-archivo text-primary'>First Name</label>
                        <input type="text" placeholder='First name' className='rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Last Name</label>
                        <input type="text" placeholder='Last name' className='rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'/>
                    </div>
                </div>
                <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Email</label>
                        <input type="text" placeholder='Email Address' className='rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Phone Number</label>
                        <input type="text" placeholder='Phone number' className='rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'/>
                    </div>
                </div>

                <div className='flex flex-col gap-1 self-start'>
                    <label>Are you a student or a graduate</label>
                    <div className='flex flex-row gap-10'>
                        <span className='flex flex-row gap-2'>
                            <CheckBox />
                            Student
                        </span>

                        <span className='flex flex-row gap-2'>
                            <CheckBox />
                            Graduate
                        </span>
                    </div>
                </div>

                <div className='flex flex-row gap-6'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-medium font-archivo text-primary'>Date</label>
                        <input type="text" placeholder='Enter date' className='rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                    <label className="text-lg font-medium font-archivo text-primary">Area of Interest</label>
                    <select className="rounded-lg bg-[#0D0900] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]">
                        <option value="" disabled selected>
                        Select area of interest
                        </option>
                        <option value="morning">Software Engineering</option>
                        <option value="afternoon">Devops</option>
                        <option value="evening">Product Management</option>
                        <option value="night">Software Tester</option>
                    </select>
                    </div>
                </div>

                <div className='flex flex-col w-[876px]'>
                    <label className='text-lg font-medium font-archivo text-primary'>Expectation from Event</label>
                    <textarea placeholder='Type message here' className='rounded-lg h-[100px] bg-[#0D0900] mt-1 py-2 px-2 flex items-center w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-[#FCFCFC80] text-[16px]'></textarea>
                </div>

                <div className='my-4 self-start'>
                    <Button text="Register Now" svg={<SendIcon/>} width='w-[250px]'/>
                </div>
        </form>

        </div>

        </div>
    </div>
  )
}

export default RegisterEvent