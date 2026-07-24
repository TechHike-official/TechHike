import apiClient from './apiClient';

export const getAllClients = async () => {
  const response = await apiClient.get('/user/all');
  return response.data.data;
};

export const getUsersByIds = async (developerIds) => {
  const response = await apiClient.post('/user/by-ids', { ids: developerIds });
  return response.data.data;
};

export const getUsersById = async (userId) => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data.data;
};
