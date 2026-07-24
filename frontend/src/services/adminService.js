import apiClient from './apiClient';

/**
 * Fetches the list of all admins from the backend
 * @returns {Promise} - Resolves with the list of admins
 */
export const getAllAdmins = async () => {
  const response = await apiClient.get('/admins');
  return response.data;
};