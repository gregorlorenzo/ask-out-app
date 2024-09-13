import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authService = {
  login: async (passkey) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, { passkey });
    return response.data;
  },

  logout: () => {
    // Clear token from storage
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};