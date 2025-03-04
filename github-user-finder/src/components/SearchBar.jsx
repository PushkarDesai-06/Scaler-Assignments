import React from 'react'
import Logo from '/src/components/Logo'
function SearchBar() {
  return (
    <div className='w-screen h-[60px] bg-neutral-900 flex justify-between items-center px-8'>
      <Logo />
      <div className='flex gap-4'>
        <input type="text" className='w-96 bg-neutral-700 text-neutral-300 rounded-full h-8 px-4 border-neutral-500 border' placeholder='Github Username' />
        <button className='px-4 h-8 rounded-full bg-neutral-700 text-neutral-200 hover:bg-neutral-500 transition border-neutral-500 border'>Search</button>
      </div>
    </div>
  )
}

export default SearchBar