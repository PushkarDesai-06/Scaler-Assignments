import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'

const Home = ({username}) => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <SearchBar />
      <div id='UserCardsContainer' className='flex flex-col items-center mx-auto px-2 sm:px-4'>
        <UserCard />
        <Link to={`/user/${username}`} className="text-white hover:text-blue-500 transition">View Profile Details</Link>
      </div>
    </div>
  )
}

export default Home