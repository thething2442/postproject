import { useState } from 'react';
import axios from 'axios';

const useMutation = (baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null); // To store the response data

  const del = async (path, userId = null) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    try {
      const response = await axios.delete(`${baseUrl}${path}`, { data: { userId } }); // Pass userId in data for DELETE
      setData(response.data);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const put = async (path, payload, userId = null) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    try {
      const response = await axios.put(`${baseUrl}${path}`, { ...payload, userId }); // Add userId to payload
      setData(response.data);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, data, del, put };
};

export default useMutation;
