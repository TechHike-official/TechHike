import apiClient from './apiClient';

// Fetch assigned projects for a user by userId
export const getAssignedProjects = async (userId) => {
  const response = await apiClient.get(`/project/assigned/${userId}`);
  return response.data;
};

export const getAllProjects = async () => {
  const response = await apiClient.get('/project/all');
  return response.data;
};

// Update project status
export const updateProjectStatus = async (projectId, status) => {
  const response = await apiClient.put(`/project/${projectId}/status`, { status });
  return response.data;
};

// Add snapshots to a project
export const addSnapshots = async (projectId, snapshots) => {
  const response = await apiClient.put(`/projects/${projectId}/snapshots`, { snapshots });
  return response.data;
};

// Update GitHub repository link
export const updateGithubLink = async (projectId, githubLink) => {
  const response = await apiClient.put(`/projects/${projectId}/github`, { githubLink });
  return response.data;
};

export const getProjectInfo = async (projectId) => {
  const response = await apiClient.get(`/project/${projectId}`);
  return response.data;
};

export const getAllProjectofUser = async (clientId) => {
  const response = await apiClient.get(`/project/allProject/${clientId}`);
  return response.data;
};

// Update payment information (advance or remaining)
export const updatePaymentInfo = async (projectId, type, transactionId, paymentMode) => {
  const response = await apiClient.put(
    `/project/update-payment/${projectId}`,
    { type, transactionId, paymentMode }
  );
  return response.data;
};
