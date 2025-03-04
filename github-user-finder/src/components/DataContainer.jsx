import React from 'react'

const DataContainer = ({ name = 'data', data = 0 }) => {
  return (

    <div className='h-[60px] w-[90px] mx-2 border border-neutral-500 rounded-md flex flex-col justify-between overflow-hidden'>
      <div className='flex justify-center items-center flex-1 text-neutral-400'>{data}</div>
      <div className='flex justify-center items-center bg-neutral-500 text-black font-thin'>{name}</div>
    </div>

  )
}

export default DataContainer