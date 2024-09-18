import api from './apiConfig';

export const quizService = {
  getQuestions: async (isAdmin, page = 1, limit = 10, sort = '-_id') => {
    const response = await api.get(isAdmin ? '/api/quiz/admin' : '/api/quiz', {
      params: { page, limit, sort }
    });
    return response.data;
  },

  getQuestionById: async (id) => {
    const response = await api.get(`/api/quiz/${id}`);
    return response.data;
  },

  createQuestion: async (questionData) => {
    const response = await api.post('/api/quiz', questionData);
    return response.data;
  },

  updateQuestion: async (id, questionData) => {
    const response = await api.put(`/api/quiz/${id}`, questionData);
    return response.data;
  },

  deleteQuestion: async (id) => {
    const response = await api.delete(`/api/quiz/${id}`);
    return response.data;
  },

  submitAnswer: async (questionId, userAnswer) => {
    const response = await api.post('/api/quiz/submit-answer', { questionId, userAnswer });
    return response.data;
  },

  submitQuiz: async (answers) => {
    const response = await api.post('/api/quiz/submit-quiz', { answers });
    return response.data;
  },
};