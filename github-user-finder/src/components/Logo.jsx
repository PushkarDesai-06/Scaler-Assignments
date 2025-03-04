import React from 'react'

const Logo = () => {
  return (

    <div id='logo' className='w-72  border-neutral-300 h-8 flex flex-col justify-center'>
      <div className='flex items-center gap-4'>
        <img src="/assets/github-mark-white.png" alt="" className='w-[30px] h-[30px]' />
        <p className='text-neutral-200 font-bold'>GITHUB</p>
      </div>
    </div>

  )
}

export default Logo