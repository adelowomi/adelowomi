/* eslint-disable react/no-unknown-property */
'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { HelloIcon } from '@/icons';

const Navbar = () => {

  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/music', label: 'Music' },
    { href: '/event', label: 'Event' },
]

  return (
    <div className='flex justify-between px-28 py-4'>
        <div className='flex'>
          <ul className='flex justify-between gap-12'>
            {links.map((link) => {
                      const isActive =
                          link.href === '/'
                              ? pathname === link.href 
                              : pathname.startsWith(link.href); 

                      return (
                          <li
                              key={link.href}
                              className={`font-normal font-archivo uppercase text-xl ${
                                  isActive ? 'text-secondary' : 'text-primary'
                              }`}
                          >
                              <Link href={link.href}>{link.label}</Link>
                          </li>
                      );
                  })}
            </ul>
        </div>
        <div>
            <button className='px-6 py-3 rounded-lg border-2 border-solid border-secondary font-archivo text-secondary flex justify-center items-center gap-2'>
              Say Hello
              <HelloIcon />
            </button>
        </div>
    </div>
  )
}

export default Navbar