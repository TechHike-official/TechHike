import apiClient from './apiClient';

export const getAssignedProjects = async (userId) => {
  const response = await apiClient.get(`/project/assigned/${userId}`);
  return response.data;
};

export const getAllProjects = async () => {
  const response = await apiClient.get('/project/all');
  return response.data;
};
