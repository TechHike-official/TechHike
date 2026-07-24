import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to dynamically attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Clear token or notify user if unauthorized
      console.warn('Unauthorized access request detected.');
    }
    return Promise.reject(error.response?.data || { message: error.message || 'An error occurred' });
  }
);

export default apiClient;
