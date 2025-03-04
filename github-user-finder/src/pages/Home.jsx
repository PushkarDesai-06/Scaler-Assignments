import React from 'react'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <SearchBar />
      <div id='UserCardsContainer' className='flex flex-col items-center mx-auto px-2 sm:px-4'>
        <UserCard />
      </div>
    </div>
  )
}

export default Home