// src/services/authService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

export async function checkEmailExists(email) {
  try {
    const response = await apiClient.post('/auth/check-email', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error checking email' };
  }
}

export async function login(email, password) {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
}

export async function signup(payload, isGoogleSignup) {
  const endpoint = isGoogleSignup ? '/auth/google-signup' : '/auth/signup';
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
}

export async function googleLogin(googleId, email) {
  try {
    const response = await apiClient.post('/auth/google-login', { googleId, email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Google login failed' };
  }
}