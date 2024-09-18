import api from './apiConfig';

export const mazeService = {
    getStages: async (isAdmin, page = 1, limit = 10, sort = 'number') => {
        const response = await api.get(isAdmin ? '/api/maze/admin' : '/api/maze', {
            params: { page, limit, sort }
        });
        return response.data;
    },

    getStageById: async (id) => {
        const response = await api.get(`/api/maze/${id}`);
        return response.data;
    },

    createStage: async (stageData) => {
        const response = await api.post('/api/maze', stageData);
        return response.data;
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