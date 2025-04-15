import axios from 'axios';

// Base URL from environment variable
const API_URL = `${process.env.REACT_APP_BACKEND_API}/assist-request`;

// Helper function to get the auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create an assist request
const createAssistRequest = async (assistData) => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.post(
    `${API_URL}/`,
    assistData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.assistRequest;
};

// Get assist requests for the logged-in user
const getUserAssistRequests = async (userId) => {
    console.log("UserId:", userId)
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Pay for an assist request
const payAssistRequest = async (requestId, paymentType, transactionId) => {
    console.log("PAR:", requestId)
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.post(
    `${API_URL}/pay/${requestId}`,
    { paymentType, transactionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.assistRequest;
};

// Submit feedback and rating for an assist request
const submitFeedback = async (requestId, feedback, rating) => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.put(
    `${API_URL}/${requestId}/feedback`,
    { feedback, rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.assistRequest;
};

// Admin-specific: Get all assist requests (optional, if needed in frontend)
const getAllAssistRequests = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Admin-specific: Update an assist request (optional, if needed in frontend)
const updateAssistRequest = async (requestId, updateData) => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await axios.put(
    `${API_URL}/${requestId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.assistRequest;
};

export {
  createAssistRequest,
  getUserAssistRequests,
  payAssistRequest,
  submitFeedback,
  getAllAssistRequests, // Optional for admin UI
  updateAssistRequest,  // Optional for admin UI
};