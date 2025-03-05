import React from 'react'
import { MdLocationPin, MdBusiness, MdEmail, MdLink, MdCalendarToday, MdArrowBack } from "react-icons/md";
import { FaXTwitter, FaStar, FaCodeBranch, FaGithub, FaUsers, FaUserPlus } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import useGitHubUser from '../hooks/useGitHubUser';
import { ClipLoader } from 'react-spinners';

const UserInfo = () => {
  // Get username from URL parameters
  const { username } = useParams();
  const { user, topRepos, loading, error } = useGitHubUser(username);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex justify-center items-center">
        <ClipLoader color="#3b82f6" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
            <MdArrowBack /> Back to search
          </Link>

          <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-md mt-6">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
            <MdArrowBack /> Back to search
          </Link>

          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-2">User not found</h2>
            <p className="text-neutral-400">The requested user doesn't exist or couldn't be loaded</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-6 px-4 sm:px-6 md:px-8">
      {/* Back navigation */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
          <MdArrowBack /> Back to search
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-6 bg-neutral-800/70 rounded-xl p-4 sm:p-6 border border-neutral-700 shadow-lg mb-8">
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={user.avatar_url}
              alt={`${user.name || user.login}'s avatar`}
              className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-full border-4 border-blue-500/30 object-cover"
            />
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{user.name || user.login}</h1>
                <p className="text-blue-400 text-sm sm:text-base">@{user.login}</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition"
                >
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </div>

            {user.bio && (
              <div className="mb-4 bg-neutral-700/30 p-3 rounded-md border-l-4 border-blue-500">
                <p className="italic text-neutral-200">{user.bio}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {user.company && (
                <div className="flex items-center gap-1 text-neutral-300">
                  <MdBusiness className="text-blue-400" /> {user.company}
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-1 text-neutral-300">
                  <MdLocationPin className="text-blue-400" /> {user.location}
                </div>
              )}

              {user.email && (
                <div className="flex items-center gap-1 text-neutral-300">
                  <MdEmail className="text-blue-400" /> {user.email}
                </div>
              )}

              {user.twitter_username && (
                <div className="flex items-center gap-1 text-neutral-300">
                  <FaXTwitter className="text-blue-400" /> {user.twitter_username}
                </div>
              )}

              {user.blog && (
                <div className="flex items-center gap-1 text-neutral-300 max-w-[250px]">
                  <MdLink className="text-blue-400 flex-shrink-0" />
                  <a
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:text-blue-300 transition"
                  >
                    {user.blog}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-1 text-neutral-300">
                <MdCalendarToday className="text-blue-400" /> Joined {formattedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-800/70 rounded-lg p-4 border border-neutral-700 flex items-center gap-4">
            <div className="bg-neutral-700/50 p-3 rounded-full">
              <FaCodeBranch className="text-blue-300 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{user.public_repos}</div>
              <div className="text-neutral-400 text-sm">Repositories</div>
            </div>
          </div>

          <div className="bg-neutral-800/70 rounded-lg p-4 border border-neutral-700 flex items-center gap-4">
            <div className="bg-neutral-700/50 p-3 rounded-full">
              <FaUsers className="text-blue-300 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{user.followers}</div>
              <div className="text-neutral-400 text-sm">Followers</div>
            </div>
          </div>

          <div className="bg-neutral-800/70 rounded-lg p-4 border border-neutral-700 flex items-center gap-4">
            <div className="bg-neutral-700/50 p-3 rounded-full">
              <FaUserPlus className="text-blue-300 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{user.following}</div>
              <div className="text-neutral-400 text-sm">Following</div>
            </div>
          </div>
        </div>

        {/* Repositories section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaCodeBranch className="text-blue-400" /> Popular Repositories
            </h2>
            <a
              href={`${user.html_url}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm transition"
            >
              View all repositories
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRepos && topRepos.length > 0 ? (
              topRepos.slice(0, 6).map((repo, index) => (
                <div key={index} className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 hover:border-neutral-600 transition">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-300 truncate">{repo.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <FaStar /> <span>{repo.stars}</span>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex justify-between items-center">
                    {repo.language && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="text-neutral-300">{repo.language}</span>
                      </div>
                    )}
                    <a
                      href={`${user.html_url}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-white text-xs border border-neutral-600 rounded px-2 py-1 transition"
                    >
                      View repo
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-neutral-400">
                No repositories found
              </div>
            )}
          </div>
        </div>

        {/* Activity chart - placeholder */}
        <div className="bg-neutral-800/70 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold mb-4">Contribution Activity</h2>
          <div className="h-[200px] bg-neutral-700/30 rounded-md flex items-center justify-center">
            <p className="text-neutral-400">
              Contribution graph would appear here with more implementation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;