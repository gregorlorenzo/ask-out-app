import api from './apiConfig';

export const slideshowService = {
  getSlideshow: async () => {
    const response = await api.get('/api/slideshow');
    return response.data;
  },

  createSlideshow: async (slideshowData) => {
    const response = await api.post('/api/slideshow', slideshowData);
    return response.data;
  },

  updateSlideshow: async (slideshowData) => {
    const response = await api.put('/api/slideshow', slideshowData);
    return response.data;
  },

  deleteSlideshow: async () => {
    const response = await api.delete('/api/slideshow');
    return response.data;
  }
};