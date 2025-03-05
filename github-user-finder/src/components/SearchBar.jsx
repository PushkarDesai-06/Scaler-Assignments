import React, { useState } from 'react'
import Logo from '/src/components/Logo'
import { FaSearch } from 'react-icons/fa'

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className='w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 bg-neutral-950'>
      <div className='mb-6 w-full flex justify-center'>
        <Logo />
      </div>

      <div className='w-full max-w-4xl mx-auto'>
        <div className='bg-neutral-800/30 p-4 sm:p-6 md:p-8 rounded-xl border border-neutral-700 shadow-2xl'>
          <h2 className='text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6'>Find GitHub Users</h2>

          <form onSubmit={handleSubmit} className='relative w-full'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className='w-full bg-neutral-800 text-white rounded-full h-10 sm:h-12 pl-4 sm:pl-6 pr-16 sm:pr-24 border-2 border-neutral-600 focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/30 focus:outline-none transition-all shadow-lg text-base sm:text-lg'
              placeholder='Search GitHub username...'
            />
            <button
              type="submit"
              className='absolute right-1.5 sm:right-2 top-1.5 sm:top-2 px-3 sm:px-5 h-7 sm:h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base'
            >
              <FaSearch className="text-xs sm:text-sm" />
              <span className="hidden xs:inline">Search</span>
            </button>
          </form>

          <p className='text-neutral-400 text-center mt-3 sm:mt-4 text-xs sm:text-sm'>
            Enter a GitHub username to view their profile and repositories
          </p>
        </div>
      </div>
    </div>
  )
}

export default SearchBar