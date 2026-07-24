import apiClient from './apiClient';

// Create an assist request
const createAssistRequest = async (assistData) => {
  const response = await apiClient.post('/assist-request/', assistData);
  return response.data.assistRequest;
};

// Get assist requests for the logged-in user
const getUserAssistRequests = async (userId) => {
  const response = await apiClient.get(`/assist-request/user/${userId}`);
  return response.data;
};

// Pay for an assist request
const payAssistRequest = async (requestId, paymentType, transactionId) => {
  const response = await apiClient.post(`/assist-request/pay/${requestId}`, {
    paymentType,
    transactionId,
  });
  return response.data.assistRequest;
};

// Submit feedback and rating for an assist request
const submitFeedback = async (requestId, feedback, rating) => {
  const response = await apiClient.put(`/assist-request/${requestId}/feedback`, {
    feedback,
    rating,
  });
  return response.data.assistRequest;
};

// Admin-specific: Get all assist requests
const getAllAssistRequests = async () => {
  const response = await apiClient.get('/assist-request/');
  return response.data;
};

// Admin-specific: Update an assist request
const updateAssistRequest = async (requestId, updateData) => {
  const response = await apiClient.put(`/assist-request/${requestId}`, updateData);
  return response.data.assistRequest;
};

export {
  createAssistRequest,
  getUserAssistRequests,
  payAssistRequest,
  submitFeedback,
  getAllAssistRequests,
  updateAssistRequest,
};