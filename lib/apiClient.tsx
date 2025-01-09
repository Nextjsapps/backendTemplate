// Import necessary libraries
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


// Create an Axios instance
const api  = axios.create({
  baseURL: "https://localhost:7000/api", //process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL here
  //timeout: 10000, // Request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials if needed
});
 

// Handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response?.status === 401) {
          console.log("Handle token expiration or unauthorized requests:",error);
        // Handle token expiration or unauthorized requests
        Cookies.remove("authToken");
        window.location.href = "/login"; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

 
 // Axios request interceptor to handle JWT expiration
 api.interceptors.request.use(
    async (config) => {
      const token = getAccessToken();
  
      // Check if the token is expired
      if (isTokenExpired(token)) {
        try {
          // Refresh the token
          const newToken = await refreshToken();
          
          // Update the Authorization header with the new token
          config.headers['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
          // Handle the error, such as redirecting to login
          throw error;
        }
      } else {
        // Token is not expired, continue with the request
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Function to refresh the token (you can adjust this based on your backend's refresh flow)
const refreshToken = async () => {
    try {
      const response = await api.post('/User/refresh-token', { /* your refresh data */ });
      const newToken = response.data.token; // assuming the new token is in response.data.token
      localStorage.setItem('authToken', newToken); // Store the new token
      return newToken;
    } catch (error) {
      console.error('Token refresh failed', error);
      throw error; // Handle error appropriately (e.g., redirect to login)
    }
  };
  
// Generic POST request function
export const getLoginRequest = async (url:string, params = {}) => {
    try {
        const response = await api.post(url, { params });
        console.log("lgoin response:",response);
        const { token } = response.data.accessToken;
         
        try {
            const decodedToken = jwtDecode(token);
            console.log("decoded token:",decodedToken);

          } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
          }
        // Set token in cookies
        response.headers.setHeader("Set-Cookie", `authToken=${token}; HttpOnly; Path=/;`);
       // response.status(200).json({ message: "Login successful" });
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  };


// Generic GET request function
export const getRequest = async (url:string, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};


// Generic POST request function
export const postRequest = async (url:string, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// Generic PUT request function
export const putRequest = async (url:string, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// Generic DELETE request function
export const deleteRequest = async (url:string) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

// Function to get the access token (e.g., from localStorage or cookies)
const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken'); // Replace with your storage mechanism
    }
    return null;
  };
  
 

// Utility function to check if the JWT token has expired
const isTokenExpired = (token:string|null) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    const expirationTime = payload.exp * 1000; // Expiration time in milliseconds
    return expirationTime < Date.now();
  };
  

export default api;
