import React from 'react'

interface CustomButtonProps {
    text: string;
    svg: JSX.Element;
  }

const Button: React.FC<CustomButtonProps> = ({text, svg}) => {
  return (
    <button className='flex justify-center items-center px-8 py-3 w-[242px] gap-2 bg-secondary rounded-lg'>
        {text}
        {svg && <span>{svg}</span>}
        {/* <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 20C5.95 20 5.479 19.804 5.087 19.412C4.695 19.02 4.49934 18.5493 4.5 18V15H6.5V18H18.5V15H20.5V18C20.5 18.55 20.304 19.021 19.912 19.413C19.52 19.805 19.0493 20.0007 18.5 20H6.5ZM12.5 16L7.5 11L8.9 9.55L11.5 12.15V4H13.5V12.15L16.1 9.55L17.5 11L12.5 16Z" fill="#FCFCFC"/>
        </svg> */}
    </button>
  )
}

export default Button