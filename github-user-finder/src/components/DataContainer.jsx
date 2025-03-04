import React from 'react'

const DataContainer = ({ name = 'data', data = 0 }) => {
  return (
    <div className='h-[50px] sm:h-[60px] w-[70px] sm:w-[90px] mx-1 sm:mx-2 border border-neutral-500 rounded-md flex flex-col justify-between overflow-hidden'>
      <div className='flex justify-center items-center flex-1 text-neutral-400 text-sm sm:text-base'>{data}</div>
      <div className='flex justify-center items-center bg-neutral-500 text-black text-xs sm:text-sm font-thin'>{name}</div>
    </div>
  )
}

export default DataContainer