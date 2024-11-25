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

const Contact = () => {
  return (
    <div className='flex flex-row gap-20 px-28 py-24'>
        <div className='w-[500px]'>
            <h1 className='w-[500px] h-auto font-semibold text-3xl uppercase text-primary font-besley pb-2'>Let’s Build Something Amazing Together</h1>
            <hr className='w-[100px] rounded-xl bg-[#8F6302] border-[#8F6302] h-[4px]'/>

            <div className='mt-20 flex flex-col gap-y-4'>
                <div className='flex items-center gap-4 text-primary font-normal text-xl'>
                    <span className='w-12 h-12 p-2 flex items-center justify-center rounded-full bg-secondary font-archivo'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_71_252)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0694 29.5107C20.1494 29.44 14.708 28.688 9.00937 22.9907C3.31204 17.292 2.56137 11.852 2.48937 9.93071C2.38271 7.00271 4.62537 4.15871 7.21604 3.04804C7.52801 2.91333 7.86964 2.86204 8.20741 2.89921C8.54519 2.93638 8.86749 3.06072 9.14271 3.26004C11.276 4.81471 12.748 7.16671 14.012 9.01604C14.2902 9.42235 14.4091 9.91677 14.3461 10.4051C14.2832 10.8934 14.0428 11.3415 13.6707 11.664L11.0694 13.596C10.9437 13.6868 10.8552 13.8201 10.8204 13.9711C10.7856 14.1222 10.8068 14.2808 10.88 14.4174C11.4694 15.488 12.5174 17.0827 13.7174 18.2827C14.9187 19.4827 16.588 20.6 17.7334 21.256C17.877 21.3367 18.046 21.3592 18.2057 21.319C18.3654 21.2788 18.5037 21.179 18.592 21.04L20.2854 18.4627C20.5967 18.0492 21.0559 17.7721 21.5669 17.6896C22.0779 17.6071 22.6011 17.7255 23.0267 18.02C24.9027 19.3187 27.092 20.7654 28.6947 22.8174C28.9102 23.0946 29.0473 23.4246 29.0916 23.7729C29.136 24.1212 29.0859 24.475 28.9467 24.7974C27.8307 27.4014 25.0067 29.6187 22.0694 29.5107Z" fill="#FCFCFC"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_71_252">
                            <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </span>
                    +2340867547854
                </div>

                <div className='flex items-center gap-4 text-primary font-normal text-xl'>
                    <span className='w-12 h-12 p-2 flex items-center justify-center rounded-full bg-secondary font-archivo'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.6666 5.33325H5.33329C3.86663 5.33325 2.67996 6.53325 2.67996 7.99992L2.66663 23.9999C2.66663 25.4666 3.86663 26.6666 5.33329 26.6666H26.6666C28.1333 26.6666 29.3333 25.4666 29.3333 23.9999V7.99992C29.3333 6.53325 28.1333 5.33325 26.6666 5.33325ZM26.1333 10.9999L16.7066 16.8933C16.28 17.1599 15.72 17.1599 15.2933 16.8933L5.86663 10.9999C5.73293 10.9249 5.61585 10.8235 5.52248 10.7019C5.4291 10.5802 5.36138 10.441 5.32339 10.2924C5.28541 10.1439 5.27796 9.98917 5.3015 9.83766C5.32504 9.68616 5.37907 9.541 5.46033 9.41099C5.5416 9.28097 5.64839 9.16879 5.77426 9.08125C5.90013 8.9937 6.04245 8.9326 6.19262 8.90165C6.34279 8.8707 6.49767 8.87054 6.6479 8.90118C6.79813 8.93182 6.94058 8.99263 7.06663 9.07992L16 14.6666L24.9333 9.07992C25.0593 8.99263 25.2018 8.93182 25.352 8.90118C25.5023 8.87054 25.6571 8.8707 25.8073 8.90165C25.9575 8.9326 26.0998 8.9937 26.2257 9.08125C26.3515 9.16879 26.4583 9.28097 26.5396 9.41099C26.6208 9.541 26.6749 9.68616 26.6984 9.83766C26.722 9.98917 26.7145 10.1439 26.6765 10.2924C26.6385 10.441 26.5708 10.5802 26.4774 10.7019C26.3841 10.8235 26.267 10.9249 26.1333 10.9999Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    Abcdefg@gmail.com
                </div>

                <div className='flex items-center gap-4 text-primary font-normal text-xl'>
                    <span className='w-12 h-12 p-2 flex items-center justify-center rounded-full bg-secondary font-archivo'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2C13.0837 2.00344 10.2878 3.16347 8.22564 5.22563C6.16348 7.28778 5.00345 10.0837 5.00001 13C4.99652 15.3832 5.77499 17.7018 7.21601 19.6C7.21601 19.6 7.51601 19.995 7.56501 20.052L16 30L24.439 20.047C24.483 19.994 24.784 19.6 24.784 19.6L24.785 19.597C26.2253 17.6996 27.0034 15.3821 27 13C26.9966 10.0837 25.8365 7.28778 23.7744 5.22563C21.7122 3.16347 18.9163 2.00344 16 2ZM16 17C15.2089 17 14.4355 16.7654 13.7777 16.3259C13.1199 15.8864 12.6072 15.2616 12.3045 14.5307C12.0017 13.7998 11.9225 12.9956 12.0769 12.2196C12.2312 11.4437 12.6122 10.731 13.1716 10.1716C13.731 9.61216 14.4437 9.2312 15.2197 9.07686C15.9956 8.92252 16.7998 9.00173 17.5307 9.30448C18.2616 9.60723 18.8864 10.1199 19.3259 10.7777C19.7654 11.4355 20 12.2089 20 13C19.9987 14.0605 19.5768 15.0771 18.827 15.827C18.0771 16.5768 17.0605 16.9987 16 17Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    Lagos, Nigeria
                </div>
            </div>
        </div>
        <div className='inline-flex w-[630px] items-center rounded-lg border-[0.5px] border-solid border-[#8F630280] px-12 pt-12 pb-20'>
            <form>
                <div className='flex flex-col mb-4'>
                    <label className='text-lg font-medium font-archivo text-primary'>Name</label>
                    <input type="text" placeholder='Full name' className='rounded-lg bg-black mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary' />
                </div>

                <div className='flex flex-col mb-4'>
                    <label className='text-lg font-medium font-archivo text-primary'>Email</label>
                    <input type="text" placeholder='Email address' className='rounded-lg bg-black mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'/>
                </div>

                <div className='flex flex-col'>
                    <label className='text-lg font-medium font-archivo text-primary'>Message</label>
                    <textarea placeholder='Type message here' className='rounded-lg h-[100px] bg-black mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-primary'></textarea>
                </div>

                <div className='mt-20'>
                    <Button text="Send Message" svg={<SendIcon/>}/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact