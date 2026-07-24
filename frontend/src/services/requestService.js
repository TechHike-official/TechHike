import apiClient from './apiClient';

export const getAllRequests = async () => {
  const response = await apiClient.get('/request/requests/admin');
  return response.data;
};

export const approveRequest = async (requestId, developerIds, price, clientName) => {
  const response = await apiClient.put(
    `/request/${requestId}/approve`,
    { developerIds, price, clientName }
  );
  return response.data;
};

export const getAllDevelopers = async () => {
  const response = await apiClient.get('/developer');
  return response.data;
};

export const getRequestsByUserId = async (userId) => {
  const response = await apiClient.get(`/request/user/${userId}`);
  return response.data.data;
};

export const createRequest = async (requestData) => {
  const response = await apiClient.post('/request', requestData);
  return response.data.data;
};
