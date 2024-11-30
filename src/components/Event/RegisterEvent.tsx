import React from 'react'
import Button from '../ui/Button'
import CheckBox from '../ui/CheckBox'

const SendIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_118_340)">
  <path d="M20.8644 12.707C21.0519 12.5195 21.1572 12.2652 21.1572 12C21.1572 11.7348 21.0519 11.4805 20.8644 11.293L15.2074 5.63601C15.1152 5.5405 15.0048 5.46431 14.8828 5.41191C14.7608 5.3595 14.6296 5.33191 14.4968 5.33076C14.3641 5.3296 14.2324 5.3549 14.1095 5.40519C13.9866 5.45547 13.8749 5.52972 13.781 5.62361C13.6872 5.71751 13.6129 5.82916 13.5626 5.95205C13.5123 6.07495 13.487 6.20663 13.4882 6.33941C13.4893 6.47219 13.5169 6.60341 13.5693 6.72541C13.6217 6.84742 13.6979 6.95776 13.7934 7.05001L17.7434 11H4.50044C4.23522 11 3.98087 11.1054 3.79333 11.2929C3.6058 11.4804 3.50044 11.7348 3.50044 12C3.50044 12.2652 3.6058 12.5196 3.79333 12.7071C3.98087 12.8946 4.23522 13 4.50044 13H17.7434L13.7934 16.95C13.6113 17.1386 13.5105 17.3912 13.5128 17.6534C13.515 17.9156 13.6202 18.1664 13.8056 18.3518C13.991 18.5372 14.2418 18.6424 14.504 18.6447C14.7662 18.647 15.0188 18.5462 15.2074 18.364L20.8644 12.707Z" fill="#FCFCFC"/>
  </g>
  <defs>
  <clipPath id="clip0_118_340">
  <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24.5 0)"/>
  </clipPath>
  </defs>
  </svg>
  )

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