import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const quizService = {
  getQuestions: async () => {
    const response = await axios.get(`${API_URL}/api/quiz`);
    return response.data;
  },

  getQuestionById: async (id) => {
    const response = await axios.get(`${API_URL}/api/quiz/${id}`);
    return response.data;
  },

  createQuestion: async (questionData) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.post(`${API_URL}/api/quiz`, questionData, config);
    return response.data;
  },

  updateQuestion: async (id, questionData) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.put(`${API_URL}/api/quiz/${id}`, questionData, config);
    return response.data;
  },

  deleteQuestion: async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    };
    const response = await axios.delete(`${API_URL}/api/quiz/${id}`, config);
    return response.data;
  }
};