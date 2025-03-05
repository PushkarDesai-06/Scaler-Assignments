import React from 'react'
import { MdLocationPin, MdBusiness, MdEmail, MdLink, MdCalendarToday, MdArrowBack, MdInsights, MdOutlineCodeOff } from "react-icons/md";
import { FaXTwitter, FaStar, FaCodeBranch, FaGithub, FaUsers, FaUserPlus, FaCode, FaLink } from "react-icons/fa6";
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

  const renderUserStatistics = () => {
    if (!user) return null;

    // Extract main languages from repositories
    const languages = topRepos
      .filter(repo => repo.language)
      .map(repo => repo.language)
      .reduce((acc, lang) => {
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {});

    // Convert to array and sort by frequency
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Get top 5 languages

    // Get average stars per repository
    const avgStars = topRepos.length > 0
      ? (topRepos.reduce((sum, repo) => sum + repo.stars, 0) / topRepos.length).toFixed(1)
      : 0;

    return (
      <div className="bg-neutral-800/70 rounded-xl p-6 border border-neutral-700 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MdInsights className="text-blue-400" />
          Profile Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most used languages */}
          <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/50">
            <h3 className="text-md font-medium text-blue-300 mb-3 flex items-center gap-2">
              <FaCode className="text-sm" /> Preferred Languages
            </h3>

            {topLanguages.length > 0 ? (
              <div className="space-y-2">
                {topLanguages.map(([language, count], index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-yellow-400' :
                      index === 1 ? 'bg-blue-400' :
                        index === 2 ? 'bg-green-400' :
                          index === 3 ? 'bg-purple-400' : 'bg-red-400'
                      }`}></span>
                    <span className="text-neutral-300">{language}</span>
                    <div className="flex-grow h-1 bg-neutral-700 rounded-full ml-1">
                      <div
                        className={`h-1 rounded-full ${index === 0 ? 'bg-yellow-400' :
                          index === 1 ? 'bg-blue-400' :
                            index === 2 ? 'bg-green-400' :
                              index === 3 ? 'bg-purple-400' : 'bg-red-400'
                          }`}
                        style={{ width: `${(count / topLanguages[0][1]) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-400">{count} repos</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400 text-sm">No language data available</p>
            )}
          </div>

          {/* Repository statistics */}
          <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/50">
            <h3 className="text-md font-medium text-blue-300 mb-3">
              Repository Stats
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-300 text-sm">Average stars per repo:</span>
                <span className="font-medium text-yellow-400 flex items-center gap-1">
                  <FaStar className="text-xs" /> {avgStars}
                </span>
              </div>

              {topRepos.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-300 text-sm">Most starred:</span>
                  <a
                    href={`${user.html_url}/${topRepos[0].name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                  >
                    {topRepos[0].name} <FaLink className="text-xs" />
                  </a>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-neutral-300 text-sm">Public repos:</span>
                <span className="font-medium text-neutral-200">{user.public_repos}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-300 text-sm">Followers/Following ratio:</span>
                <span className="font-medium text-neutral-200">
                  {user.following > 0 ? (user.followers / user.following).toFixed(1) : user.followers > 0 ? '∞' : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional profile links */}
        <div className="mt-5 pt-4 border-t border-neutral-700">
          <h3 className="text-md font-medium text-blue-300 mb-3">
            Additional Resources
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <a
              href={`${user.html_url}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700/50 hover:bg-neutral-700 transition p-2 rounded flex items-center gap-2 text-sm"
            >
              <FaCodeBranch className="text-blue-400" /> All Repositories
            </a>

            <a
              href={`${user.html_url}?tab=stars`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700/50 hover:bg-neutral-700 transition p-2 rounded flex items-center gap-2 text-sm"
            >
              <FaStar className="text-yellow-400" /> Starred Projects
            </a>

            <a
              href={`${user.html_url}?tab=followers`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700/50 hover:bg-neutral-700 transition p-2 rounded flex items-center gap-2 text-sm"
            >
              <FaUsers className="text-blue-400" /> Followers
            </a>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Replace contribution activity with user statistics */}
        {renderUserStatistics()}

        {/* Repositories section */}
        <div className="mb-8 mt-8">
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
      </div>
    </div>
  );
};

export default UserInfo;