import api from './apiConfig';

export const mazeService = {
  getStages: async (isAdmin, page = 1, limit = 10, sort = 'number', usePagination = true) => {
    const params = usePagination ? { page, limit, sort } : { sort };
    const response = await api.get(isAdmin ? '/api/maze/admin' : '/api/maze', { params });
    return response.data;
  },

  getStageById: async (id) => {
    const response = await api.get(`/api/maze/${id}`);
    return response.data;
  },

  createStage: async (stageData) => {
    try {
      const response = await api.post('/api/maze', stageData);
      return response.data;
    } catch (error) {
      console.error('Error creating stage:', error.response?.data || error.message);
      throw error;
    }
  },

  updateStage: async (id, stageData) => {
    const response = await api.put(`/api/maze/${id}`, stageData);
    return response.data;
  },

  deleteStage: async (id) => {
    const response = await api.delete(`/api/maze/${id}`);
    return response.data;
  }
};