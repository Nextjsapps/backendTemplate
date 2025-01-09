// utils/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:7000/api", // Set your API base URL
  timeout: 10000, // Set a timeout
  headers: {
    'Content-Type': 'application/json',
  }, 
  withCredentials: true, // Include credentials if needed
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token to headers if available
    const token = localStorage.getItem('token'); // Or use cookies for SSR
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if(response.data && response.data.accessToken) localStorage.setItem('token', response.data.accessToken);  // Replace with your storage mechanism.accessToken); )
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    } 
    return Promise.reject(error);
  }
);

export default axiosInstance;

