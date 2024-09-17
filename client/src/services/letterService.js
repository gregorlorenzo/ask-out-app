import api from './apiConfig';

export const letterService = {
  getLetters: async (page = 1, limit = 10, sort = '-date') => {
    const response = await api.get('/api/letters', {
      params: { page, limit, sort }
    });
    return response.data;
  },

  getLetterById: async (id) => {
    try {
      const response = await api.get(`/api/letters/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching letter:', error);
      throw error;
    }
  },

  createLetter: async (letterData) => {
    const response = await api.post('/api/letters', letterData);
    return response.data;
  },

  updateLetter: async (id, letterData) => {
    const response = await api.put(`/api/letters/${id}`, letterData);
    return response.data;
  },

  deleteLetter: async (id) => {
    const response = await api.delete(`/api/letters/${id}`);
    return response.data;
  }
};