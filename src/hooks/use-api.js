import { useState } from 'react';
import axios from 'axios';

const useApi = (baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async (path, params = {}) => {
    setLoading(true);
    try {
      const isAbsoluteUrl = path.startsWith('http://') || path.startsWith('https://');
      const url = isAbsoluteUrl ? path : `${baseUrl}${path}`;
      const response = await axios.get(url, { params });
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error("Axios request failed. Full error object:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Data:", err.response.data);
        console.error("Status:", err.response.status);
        console.error("Headers:", err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', err.message);
      }
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const post = async (path, data = {}) => {
    setLoading(true);
    try {
      const isAbsoluteUrl = path.startsWith('http://') || path.startsWith('https://');
      const url = isAbsoluteUrl ? path : `${baseUrl}${path}`;
      const response = await axios.post(url, data);
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error("Axios request failed. Full error object:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Data:", err.response.data);
        console.error("Status:", err.response.status);
        console.error("Headers:", err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', err.message);
      }
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, get, post };
};

export default useApi;
