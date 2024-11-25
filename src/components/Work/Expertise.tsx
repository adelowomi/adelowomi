/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Expertise = () => {
  return (
    <div className='flex flex-col gap-20 px-28 py-24'>
        <div>
            <h1 className='text-3xl text-[#fcfcfc] font-medium leading-[60px]'>MY EXPERTISE</h1>
            <hr className='w-[100px] rounded-xl bg-[#8F6302] border-[#8F6302] h-[4px]'/>
        </div>

        <div className='flex flex-row flex-wrap gap-12'>
            <div className='flex flex-col gap-3'>
                <img src="/assets/react.png" alt="React Image" className='w-16 h-16' />
                <h2>React.Js</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/javascript.png" alt="React Image" className='w-16 h-16' />
                <h2>Javascript</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/html.png" alt="React Image" className='w-16 h-16' />
                <h2>HTML</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/node.png" alt="React Image" className='w-16 h-16'/>
                <h2>Node.js</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/nest.png" alt="React Image" className='w-16 h-16' />
                <h2>Nest.js</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/es6.png" alt="React Image" className='w-16 h-16' />
                <h2>ES6</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/csharp.png" alt="React Image" className='w-16 h-16' />
                <h2>C#</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/redux.png" alt="React Image" className='w-16 h-16' />
                <h2>Redux</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/typescript.png" alt="React Image" className='w-16 h-16' />
                <h2>TypeScript</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/next.png" alt="React Image" className='w-16 h-16' />
                <h2>Next.js</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/azure.png" alt="React Image" className='w-16 h-16' />
                <h2>Azure</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/aws.png" alt="React Image" className='w-16 h-16' />
                <h2>AWS</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/sqlServer.png" alt="React Image" className='w-16 h-16' />
                <h2>SQL Server</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/css.png" alt="React Image" className='w-16 h-16' />
                <h2>CSS</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/elixir.png" alt="React Image" className='w-16 h-16' />
                <h2>Elixir</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/pheonix.png" alt="React Image" className='w-16 h-16' />
                <h2>Pheonix</h2>
            </div>
            <div className='flex flex-col gap-3'>
                <img src="/assets/mysql.png" alt="React Image" className='w-16 h-16' />
                <h2>MySQL</h2>
            </div>
        </div>
    </div>
  )
}

export default Expertise