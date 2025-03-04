import React from 'react'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'

const Home = () => {
  return (
    <>

      <SearchBar />
      <div id='UserCardsContainer' className='flex flex-col items-center mx-auto'>
        <UserCard />

      </div>
    </>

  )
}

export default Home