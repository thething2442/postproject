import { useState } from 'react';
import axios from 'axios';

const useSearch = (baseUrl = process.env.NEXT_PUBLIC_SEARCH_API_URL) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (searchQuery, userId = null) => {
    setLoading(true);
    setError(null);
    setResults(null);

    console.log(`Simulating search for: ${searchQuery} by user: ${userId}`);

    try {
      // In a real scenario, you would make an API call here, e.g.:
      // const response = await axios.post(`${baseUrl}/search`, { query: searchQuery, userId });
      // setResults(response.data);

      // Simulate a successful response for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setResults([
        `Result for "${searchQuery}" - Item 1 (User: ${userId})`,
        `Result for "${searchQuery}" - Item 2 (User: ${userId})`,
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, results, error, loading, search };
};

export default useSearch;
