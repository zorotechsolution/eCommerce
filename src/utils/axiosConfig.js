import axios from 'axios';

// Create a configured Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Match your Express server port
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token if it exists in Redux or LocalStorage
API.interceptors.request.use((config) => {
  try {
    const authState = localStorage.getItem('authState');
    if (authState) {
      const parsed = JSON.parse(authState);
      if (parsed?.user?.token) {
        config.headers.Authorization = `Bearer ${parsed.user.token}`;
      }
    }
  } catch (error) {
    console.error("Failed to parse auth token", error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
