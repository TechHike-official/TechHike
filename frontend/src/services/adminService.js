// services/adminService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API;

/**
 * Fetches the list of all admins (potential team members) from the backend
 * @param {string} token - Authentication token
 * @returns {Promise} - Resolves with the list of admins
 */
export const getAllAdmins = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/admins`, config);
    return response.data; // Assumes the backend returns an array of admin objects
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error; // Let the caller handle the error
  }
};