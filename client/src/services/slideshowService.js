import api from './apiConfig';

export const slideshowService = {
  getSlideshow: async (id) => {
    const response = await api.get(`/api/slideshow/${id}`);
    return response.data;
  },

  createSlideshow: async (slideshowData) => {
    const response = await api.post('/api/slideshow', slideshowData);
    return response.data;
  },

  updateSlideshow: async (id, slideshowData) => {
    const response = await api.put(`/api/slideshow/${id}`, slideshowData);
    return response.data;
  },

  deleteSlideshow: async (id) => {
    const response = await api.delete(`/api/slideshow/${id}`);
    return response.data;
  }
};