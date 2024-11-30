import React from 'react'
import Button from '../ui/Button'

const AddIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 11V5L13 5V11H19V13H13V19H11V13H5V11H11Z" fill="#FCFCFC"/>
    </svg>
)

const GalleryEvent = () => {
  return (
    <div className='flex flex-col gap-8'>
        <div>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7599 25.0933C12.5066 25.0933 12.2533 25 12.0533 24.8L3.95992 16.7066C3.57326 16.32 3.57326 15.68 3.95992 15.2933L12.0533 7.19997C12.4399 6.81331 13.0799 6.81331 13.4666 7.19997C13.8533 7.58664 13.8533 8.22664 13.4666 8.61331L6.07992 16L13.4666 23.3866C13.8533 23.7733 13.8533 24.4133 13.4666 24.8C13.2799 25 13.0133 25.0933 12.7599 25.0933Z" fill="#FCFCFC" fill-opacity="0.5"/>
                <path d="M27.3326 17H4.89258C4.34591 17 3.89258 16.5467 3.89258 16C3.89258 15.4533 4.34591 15 4.89258 15H27.3326C27.8792 15 28.3326 15.4533 28.3326 16C28.3326 16.5467 27.8792 17 27.3326 17Z" fill="#FCFCFC" fill-opacity="0.5"/>
            </svg>
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-primary font-besley text-2xl font-semibold leading-9'>EVENT CAPTION/TITLE</h1>
            <hr className='horizontal-line'/>
            <div className='relative flex justify-center items-center rounded-lg bg-[#8F8C8C] h-[450px] mt-4'>
                    <h2 className='text-black font-archivo font-medium text-[48px]'>Cover Image</h2>
                    <div className='absolute bottom-0 right-0 flex flex-row justify-between px-6 py-4 gap-5 rounded-lg bg-[#0D090080]'>
                        <span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                            </svg>
                        </span>
                        <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 25.3333H8.56667L21.6 12.3L19.7 10.4L6.66667 23.4333V25.3333ZM4 28V22.3333L21.6 4.76667C21.8667 4.52222 22.1613 4.33333 22.484 4.2C22.8067 4.06667 23.1453 4 23.5 4C23.8547 4 24.1991 4.06667 24.5333 4.2C24.8676 4.33333 25.1564 4.53333 25.4 4.8L27.2333 6.66667C27.5 6.91111 27.6947 7.2 27.8173 7.53333C27.94 7.86667 28.0009 8.2 28 8.53333C28 8.88889 27.9391 9.228 27.8173 9.55067C27.6956 9.87333 27.5009 10.1676 27.2333 10.4333L9.66667 28H4ZM20.6333 11.3667L19.7 10.4L21.6 12.3L20.6333 11.3667Z" fill="#FCFCFC"/>
                        </svg>
                        </span>
                    </div>
            </div>
        </div>

        <div className='flex flex-row justify-between mt-16'>
            <div></div>
            <Button text='Add Image' svg={<AddIcon />} textStyle='text-[16px] font-normal text-primary font-archivo' padding='px-6 py-3' width='w-[159px]'/>
        </div>

        <div className='grid grid-cols-3 gap-4 mt-4'>
            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className='w-[356px]'>
                <div className='h-[356px] flex justify-center items-center rounded-lg bg-[#8F8C8C]'>
                    <h2 className='text-black text-[48px] font-medium font-archivo'>IMAGE</h2>
                </div>
                <div className='px-6 py-4 flex flex-row gap-5'>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 26.6667C7.26732 26.6667 6.63932 26.4053 6.11665 25.8827C5.59399 25.36 5.3331 24.7325 5.33399 24V20H8.00065V24H24.0007V20H26.6673V24C26.6673 24.7333 26.406 25.3613 25.8833 25.884C25.3607 26.4067 24.7331 26.6676 24.0007 26.6667H8.00065ZM16.0007 21.3333L9.33399 14.6667L11.2007 12.7333L14.6673 16.2V5.33334H17.334V16.2L20.8007 12.7333L22.6673 14.6667L16.0007 21.3333Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33398 28C8.60065 28 7.9731 27.7391 7.45132 27.2173C6.92954 26.6956 6.66821 26.0676 6.66732 25.3333V8H5.33398V5.33333H12.0007V4H20.0007V5.33333H26.6673V8H25.334V25.3333C25.334 26.0667 25.0731 26.6947 24.5513 27.2173C24.0295 27.74 23.4015 28.0009 22.6673 28H9.33398ZM22.6673 8H9.33398V25.3333H22.6673V8ZM12.0007 22.6667H14.6673V10.6667H12.0007V22.6667ZM17.334 22.6667H20.0007V10.6667H17.334V22.6667Z" fill="#FCFCFC"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default GalleryEvent