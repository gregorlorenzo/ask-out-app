import axios from 'axios';
import { authService } from './authService';
import { router } from '../routes'; // Import the router

const API_URL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      router.navigate({ to: '/', search: { redirect: window.location.pathname } });
    }
    return Promise.reject(error);
  }
);

export default api;