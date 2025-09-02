'use client'

import React, {useState } from 'react'

const data = [
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops'},
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
    { name: "Samuel Isiah", email: 'participant@gmail.com', phone: '09094670603', status: 'Student', course: 'Computer Science', area: 'Devops' },
  ]

const RegistrantPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
  return (
    <div className="flex flex-col gap-6">
        <div className='border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between bg-[#FCFCFC0D]'>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Name</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Email</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Phone</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Status</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Course/Occupation</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-semibold text-[#fff]'>Area of Interest</h1>
        </div>
      <div className="flex flex-col gap-6">
        {currentData.map((item, index) => (
          <div key={index} className='border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-3 flex items-center justify-between'>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.name}</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.email}</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.phone}</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.status}</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.course}</h1>
            <h1 className='w-[150px] text-[16px] font-archivo font-normal text-[#fff]'>{item.area}</h1>
        </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <h2 className='text-[#fff] text-[16px] font-archivo font-light'>20 out of 50</h2>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#732383"/>
          </svg>
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z" fill="#732383"/>
            </svg>
        </button>
      </div>
    </div>

  )
}

export default RegistrantPage