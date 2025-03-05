import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHubUser = (username) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no username is provided
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch user data
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUser(userResponse.data);

        // Fetch repositories data
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
        setRepos(reposResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]); // Re-run when username changes

  // Format the repositories to match our UI needs
  const topRepos = repos.map(repo => ({
    name: repo.name,
    stars: repo.stargazers_count,
    description: repo.description,
    language: repo.language
  }));

  return { user, topRepos, loading, error };
};

export default useGitHubUser;