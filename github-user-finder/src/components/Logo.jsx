import React from 'react'

const Logo = () => {
  return (
    <div id='logo' className='w-auto sm:w-72 h-8 flex  justify-center'>
      <div className='flex items-center gap-2 sm:gap-4 w-40 justify-center'>
        <img src="/assets/github-mark-white.png" alt="GitHub Logo" className='w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]' />
        <p className='text-neutral-200 text-sm sm:text-base font-bold'>GITHUB</p>
      </div>
    </div>
  )
}

export default Logo