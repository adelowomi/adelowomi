'use client' 

import React, { useState } from 'react'
import AdminVideoContent from '../shared/AdminVideoContent'

const AdminVideo = () => {
    const [activeView, setActiveView] = useState('content')
    return (
        <div className="">
          <nav className="flex border-b-[0.5px] border-solid border-[#FCFCFC33] pb-2">
            <span onClick={() => setActiveView('content')} className={`cursor-pointer flex flex-col items-center px-4 font-archivo text-primary text-[20px] ${
                activeView === 'content' ? 'font-semibold' : 'font-normal'
              }`}
            >
              Content
            </span>
            <span onClick={() => setActiveView('event')} className={`cursor-pointer flex flex-col items-center px-4 font-archivo text-primary text-[20px] ${
                activeView === 'event' ? 'font-semibold' : 'font-normal'
              }`}
            >
              Event
            </span>
          </nav>
    
          <div className="mt-8">
            {activeView === 'content' && (
              <div className="grid grid-cols-3 gap-4">
                <AdminVideoContent />

                <AdminVideoContent />

                <AdminVideoContent />
              </div>
            )}
            {activeView === 'event' && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-bold">Content for View 2</h2>
                <p>This is the content for the second view.</p>
              </div>
            )}
          </div>
        </div>
      );
}

export default AdminVideo