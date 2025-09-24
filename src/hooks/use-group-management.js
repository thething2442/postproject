import { useState } from 'react';
import axios from 'axios';

const useGroupManagement = (baseUrl = process.env.NEXT_PUBLIC_GROUP_API_URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null); // To store the API response

  const addUserToGroup = async (groupId, userId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResponse(null);
    try {
      // Assuming an API endpoint like /api/groups/{groupId}/members
      const apiEndpoint = `${baseUrl}/groups/${groupId}/members`;
      const res = await axios.post(apiEndpoint, { userId });
      setResponse(res.data);
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // You could also add functions for removing users, updating roles, etc.
  // const removeUserFromGroup = async (groupId, userId) => { ... };

  return { loading, error, success, response, addUserToGroup };
};

export default useGroupManagement;
