import api from './apiConfig';
import { ensureAbsoluteUrl } from '@/utils/helpers';

export const slideService = {
  getSlide: async (page = 1, limit = 10, sort = '-date') => {
    const response = await api.get('/api/slide', {
      params: { page, limit, sort }
    });
    return response.data;
  },

  getSlideById: async (id) => {
    const response = await api.get(`/api/slide/${id}`);
    if (response.data.imageUrl) {
      response.data.imageUrl = ensureAbsoluteUrl(response.data.imageUrl);
    }
    return response.data;
  },

  createSlide: async (slideData) => {
    const response = await api.post('/api/slide', slideData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateSlide: async (id, slideData) => {
    const response = await api.put(`/api/slide/${id}`, slideData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteSlide: async (id) => {
    const response = await api.delete(`/api/slide/${id}`);
    return response.data;
  }
};