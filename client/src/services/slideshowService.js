import api from './apiConfig';

export const slideshowService = {
  getSlideshow: async (page = 1, limit = 10) => {
    const response = await api.get('/api/slideshow', {
      params: { page, limit }
    });
    return response.data;
  },

  getSlideById: async (id) => {
    const response = await api.get(`/api/slideshow/${id}`);
    return response.data;
  },

  createSlide: async (slideData) => {
    const response = await api.post('/api/slideshow', slideData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateSlide: async (id, slideData) => {
    const response = await api.put(`/api/slideshow/${id}`, slideData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteSlide: async (id) => {
    const response = await api.delete(`/api/slideshow/${id}`);
    return response.data;
  }
};