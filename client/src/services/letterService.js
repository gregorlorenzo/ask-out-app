import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const letterService = {
  getLetters: async () => {
    const response = await axios.get(`${API_URL}/api/letters`);
    return response.data;
  },

  getLetterById: async (id) => {
    const response = await axios.get(`${API_URL}/api/letters/${id}`);
    return response.data;
  },

  createLetter: async (letterData) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.post(`${API_URL}/api/letters`, letterData, config);
    return response.data;
  },

  updateLetter: async (id, letterData) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.put(`${API_URL}/api/letters/${id}`, letterData, config);
    return response.data;
  },

  deleteLetter: async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.delete(`${API_URL}/api/letters/${id}`, config);
    return response.data;
  }
};