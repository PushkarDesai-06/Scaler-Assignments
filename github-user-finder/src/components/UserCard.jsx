import React from 'react'
import { MdLocationPin, MdBusiness, MdEmail, MdLink, MdCalendarToday } from "react-icons/md";
import { FaXTwitter, FaStar, FaCodeBranch, FaGithub } from "react-icons/fa6";
import DataContainer from './DataContainer';

const UserCard = ({
  username = 'Sample Username',
  bio = 'Sample Bio this is a random text',
  profileLink = 'https://github.com/PushkarDesai-06',
  country = 'India',
  id = 'sampleid',
  reposNumber = 0,
  followers = 0,
  following = 0,
  avatarUrl = 'https://github.com/github.png',
  company = 'Not specified',
  email = null,
  twitter = null,
  blog = null,
  createdAt = '2023-01-01',
  topRepoName = '',
  topRepoStars = 0,
  topRepos = [] // Prop for top repositories array
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Default top repos if not provided
  const reposToShow = topRepos.length ? topRepos :
    topRepoName ? [{ name: topRepoName, stars: topRepoStars }] : [];

  return (
    <div className='text-white w-full max-w-[800px] border border-neutral-600 mx-4 my-4 rounded-md overflow-hidden flex flex-col sm:flex-row'>

      {/* Left sidebar - stacks on top on mobile */}
      <div className='w-full sm:w-[150px] bg-neutral-800 rounded-md border-neutral-700 flex flex-col items-center p-2'>
        <img src={avatarUrl} alt={`${username}'s avatar`} className="rounded-full w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-cover border-2 border-blue-500/50" />

        {/* Content below avatar */}
        <div className="mt-2 flex flex-col items-center w-full">
          <a
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 transition-colors px-3 py-1 rounded-md text-xs flex items-center gap-1 mb-2 w-full justify-center"
          >
            <FaGithub /> View Profile
          </a>

          <div className="text-xs text-center text-neutral-400">
            <p>Member since</p>
            <p className="font-medium text-neutral-300">{formattedDate}</p>
          </div>

          {country && (
            <div className="text-xs flex items-center gap-1 text-neutral-400 mt-1">
              <MdLocationPin className="text-blue-400" /> {country}
            </div>
          )}

          {/* Top Repositories Section in Sidebar - hidden on very small screens */}
          {reposToShow.length > 0 && (
            <div className="mt-3 w-full hidden xs:block">
              <h3 className="text-xs font-medium text-blue-300 mb-1 border-t border-neutral-700 pt-2">Top Repositories</h3>
              <div className="space-y-1">
                {reposToShow.slice(0, 3).map((repo, index) => (
                  <div key={index} className="bg-neutral-700/40 rounded text-xs p-1">
                    <div className="truncate">{repo.name}</div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar className="text-[10px]" /> <span>{repo.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className='flex flex-col bg-neutral-800 w-full flex-1 overflow-hidden'>
        <div className='bg-neutral-900 py-1 px-2 border-b-2 border-blue-600/30'>
          <h1 className='font-semibold text-base sm:text-lg text-center truncate'>
            {username}
            <a href={profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className='font-thin text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition ml-1'>
              @{id}
            </a>
          </h1>

          {/* Stats row integrated into header */}
          <div className='flex justify-center gap-2 sm:gap-4 mt-1'>
            <div className='flex items-center gap-1 text-xs text-neutral-300'>
              <span className='text-neutral-400'>Repos:</span> {reposNumber}
            </div>
            <div className='flex items-center gap-1 text-xs text-neutral-300'>
              <span className='text-neutral-400'>Followers:</span> {followers}
            </div>
            <div className='flex items-center gap-1 text-xs text-neutral-300'>
              <span className='text-neutral-400'>Following:</span> {following}
            </div>
          </div>
        </div>

        {bio && (
          <div className='mx-2 sm:mx-4 mt-2 text-neutral-200'>
            <p className='text-xs sm:text-sm bg-neutral-700/50 p-2 rounded-md border-l-4 border-blue-500'>{bio}</p>
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 mx-2 sm:mx-4 my-2 text-xs sm:text-sm'>
          {company && (
            <div className='text-neutral-300 flex items-center gap-1'>
              <MdBusiness className="text-blue-400" /> {company}
            </div>
          )}

          {email && (
            <div className='text-neutral-300 flex items-center gap-1'>
              <MdEmail className="text-blue-400" /> {email}
            </div>
          )}

          {twitter && (
            <div className='text-neutral-300 flex items-center gap-1'>
              <FaXTwitter className="text-blue-400" /> {twitter}
            </div>
          )}

          {blog && (
            <div className='text-neutral-300 flex items-center gap-1 overflow-hidden'>
              <MdLink className="text-blue-400 flex-shrink-0" />
              <a href={blog.startsWith('http') ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:text-blue-300 transition">
                {blog}
              </a>
            </div>
          )}
        </div>

        {/* Detailed Repository List (if we have more repos) */}
        {reposToShow.length > 1 && (
          <div className='mx-2 sm:mx-4 mb-2'>
            <h3 className='text-xs font-semibold mb-1 text-blue-300'>Popular Repositories</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {reposToShow.slice(0, 4).map((repo, index) => (
                <div key={index} className='bg-neutral-700/40 p-2 rounded-md flex justify-between items-center'>
                  <div className='text-neutral-300 text-xs sm:text-sm truncate'>{repo.name}</div>
                  <div className='flex items-center gap-2'>
                    <span className='flex items-center gap-1 text-yellow-400 text-xs'>
                      <FaStar /> {repo.stars}
                    </span>
                    <FaCodeBranch className="text-blue-400 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keep legacy topRepoName display for backward compatibility */}
        {topRepoName && reposToShow.length <= 1 && (
          <div className='mx-2 sm:mx-4 mb-2 p-2 bg-neutral-700 rounded-md'>
            <h3 className='text-xs font-semibold text-blue-300'>Top Repository</h3>
            <div className='flex items-center justify-between'>
              <div className='text-neutral-300 text-xs sm:text-sm'>{topRepoName}</div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-1 text-yellow-400 text-xs'>
                  <FaStar /> {topRepoStars}
                </span>
                <FaCodeBranch className="text-blue-400 text-xs" />
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-end mx-2 sm:mx-4 mb-2 mt-auto'>
          <a
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className='text-white bg-blue-600 hover:bg-blue-500 transition text-xs rounded px-3 py-1'
          >
            More details
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserCard