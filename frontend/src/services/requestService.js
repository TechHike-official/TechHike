import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; // Base URL for your backend API

// Fetch all project requests (for admin panel)
export const getAllRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/request/requests/admin`, config);
  return response.data;
};

// Approve a specific project request
export const approveRequest = async (requestId, developerIds, price, clientName, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.put(
      `${API_URL}/request/${requestId}/approve`,
      { developerIds, price, clientName }, // Sending price and clientName along with developerIds
      config
    );
  
    return response.data;
  };
  
// Fetch all developers (to assign to projects upon approval)
export const getAllDevelopers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/developer`, config);
  return response.data;
};

export const getRequestsByUserId = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/request/user/${userId}`, config);
  return response.data.data;
};


export const createRequest = async (requestData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/request`,requestData, config);
  return response.data.data;
};

