// src/services/authService.js
import apiClient from './apiClient';

export async function checkEmailExists(email) {
  const response = await apiClient.post('/auth/check-email', { email });
  return response.data;
}

export async function login(email, password) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
}

export async function signup(payload, isGoogleSignup) {
  const endpoint = isGoogleSignup ? '/auth/google-signup' : '/auth/signup';
  const response = await apiClient.post(endpoint, payload);
  return response.data;
}

export async function googleLogin(googleId, email) {
  const response = await apiClient.post('/auth/google-login', { googleId, email });
  return response.data;
}