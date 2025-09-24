import { useState } from 'react';
import axios from 'axios';

const useApi = (baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async (path, params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}${path}`, { params });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const post = async (path, data = {}) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}${path}`, data);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, get, post };
};

export default useApi;
