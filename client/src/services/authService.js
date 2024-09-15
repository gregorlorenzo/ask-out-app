import api from './apiConfig';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  login: async (passkey) => {
    const response = await api.post('/api/auth/login', { passkey });
    const { token } = response.data;
    authService.setToken(token);
    return response.data;
  },

  logout: () => {
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

  getRole: () => {
    const token = authService.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.user.role;
    }
    return null;
  },

  isAdmin: () => {
    return authService.getRole() === 'admin';
  },
};