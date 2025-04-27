import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; 


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

