import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; // Base URL for your backend API (adjust as needed)

// Fetch assigned projects for a user by userId
export const getAssignedProjects = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/project/assigned/${userId}`, config);
  return response.data;
};

export const getAllProjects = async (userId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/project/all`, config);
    return response.data;
  };

// Update project status
export const updateProjectStatus = async (projectId, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/project/${projectId}/status`,
    { status },
    config
  );
  return response.data;
};

// Add snapshots to a project
export const addSnapshots = async (projectId, snapshots, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/snapshots`,
    { snapshots },
    config
  );
  return response.data;
};

// Update GitHub repository link
export const updateGithubLink = async (projectId, githubLink, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/github`,
    { githubLink },
    config
  );
  return response.data;
};

export const getProjectInfo = async (projectId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/project/${projectId}`,
    config
  );
  return response.data;
};