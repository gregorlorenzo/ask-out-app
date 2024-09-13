import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const slideshowService = {
  getSlideshow: async () => {
    const response = await axios.get(`${API_URL}/api/slideshow`);
    return response.data;
  },

  getSlideById: async (id) => {
    const response = await axios.get(`${API_URL}/api/slideshow/${id}`);
    return response.data;
  },

  createSlide: async (slideData) => {
    const config = {
      headers: { 
        Authorization: `Bearer ${authService.getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await axios.post(`${API_URL}/api/slideshow`, slideData, config);
    return response.data;
  },

  updateSlide: async (id, slideData) => {
    const config = {
      headers: { 
        Authorization: `Bearer ${authService.getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await axios.put(`${API_URL}/api/slideshow/${id}`, slideData, config);
    return response.data;
  },

  deleteSlide: async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.delete(`${API_URL}/api/slideshow/${id}`, config);
    return response.data;
  }
};