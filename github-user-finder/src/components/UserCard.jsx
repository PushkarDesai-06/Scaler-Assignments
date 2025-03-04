import React from 'react'
import { MdLocationPin } from "react-icons/md";
import DataContainer from './DataContainer';


const UserCard = ({ username = 'Sample Username', bio = 'Sample Bio this is a random text', profileLink = 'https://google.com', country = 'India', id = 'sampleid', reposNumber = 0, followers = 0, following = 0 }) => {
  return (
    <div className='text-white w-[800px] h-[250px] border border-neutral-600 m-4 rounded-md overflow-hidden flex'>

      <div className='w-[150px] bg-neutral-400 rounded-md border-neutral-700'>
        <img src="" alt="" />
      </div>
      <div className='flex flex-col justify-between gap-2 bg-neutral-800 w-full flex-1 overflow-hidden'>
        <h1 className='text-center font-semibold text-lg bg-neutral-900 py-1'>{username} <a href={profileLink} className='font-thin text-sm text-neutral-400 hover:text-neutral-100 transition'>@{id}</a></h1>
        <div className='flex px-2 border border-neutral-500 rounded-sm py-1 bg-neutral-400 text-neutral-900 mx-2'>
          <p className=''>{bio}</p>
        </div>
        <div className='flex mx-2 justify-center gap-4'>
          <DataContainer name='Repos' data={reposNumber} />
          <DataContainer name='Followers' data={followers} />
          <DataContainer name='Following' data={following} />
        </div>
        {/* <hr  className='mx-4 text-neutral-500'/> */}
        <div className='flex justify-between mx-4 mb-2'>
          <div className='text-neutral-300'>Visit on<a href={profileLink} className='hover:text-white transition text-neutral-300 scale:100 font-bold'> Github</a></div>
          <div className='text-neutral-300 flex items-center gap-1'><MdLocationPin />{country}</div>
        </div>
      </div>

    </div>
  )
}

export default UserCard