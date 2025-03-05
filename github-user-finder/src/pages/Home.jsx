import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'
import useGitHubUser from '../hooks/useGitHubUser'
import { ClipLoader } from 'react-spinners'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, topRepos, loading, error } = useGitHubUser(searchQuery);

  const handleSearch = (username) => {
    setSearchQuery(username);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <SearchBar onSearch={handleSearch} />

      <div id='UserCardsContainer' className='flex flex-col items-center mx-auto px-2 sm:px-4'>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-md mt-4 max-w-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <ClipLoader color="#3b82f6" size={40} />
          </div>
        )}

        {!loading && user && (
          <>
            <UserCard
              username={user.name || user.login}
              bio={user.bio || 'No bio available'}
              profileLink={user.html_url}
              country={user.location || 'Not specified'}
              id={user.login}
              reposNumber={user.public_repos}
              followers={user.followers}
              following={user.following}
              avatarUrl={user.avatar_url}
              company={user.company || 'Not specified'}
              email={user.email}
              twitter={user.twitter_username}
              blog={user.blog}
              createdAt={user.created_at}
              topRepos={topRepos}
            />
            <Link
              to={`/user/${user.login}`}
              className="text-blue-400 hover:text-blue-300 transition mt-4 mb-8 flex items-center gap-1"
            >
              View Complete Profile
            </Link>
          </>
        )}

        {!loading && !user && searchQuery && (
          <div className="text-neutral-300 p-6 text-center mt-8">
            <p className="text-xl mb-2">No user found</p>
            <p className="text-sm text-neutral-400">Try searching for a different username</p>
          </div>
        )}

        {!searchQuery && !loading && (
          <div className="text-neutral-300 p-6 text-center mt-8 max-w-lg">
            <p className="text-xl mb-2">Enter a GitHub username to get started</p>
            <p className="text-sm text-neutral-400">
              Search for any GitHub user to see their profile information, repositories, and more
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home