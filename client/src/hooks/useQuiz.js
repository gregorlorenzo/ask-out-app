import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizService } from '../services/quizService';
import { useAuth } from './useAuth';
import { useState } from 'react';

export const useQuiz = () => {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('-_id');

  const getQuestions = useQuery({
    queryKey: ['questions', isAdmin(), page, limit, sort],
    queryFn: () => quizService.getQuestions(isAdmin(), page, limit, sort),
    keepPreviousData: true,
  });

  const getQuestionById = (id) => useQuery({
    queryKey: ['question', id],
    queryFn: () => quizService.getQuestionById(id),
  });

  const createQuestionMutation = useMutation({
    mutationFn: quizService.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['questions', isAdmin(), page, limit]);
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, questionData }) => quizService.updateQuestion(id, questionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['questions', isAdmin(), page, limit]);
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: quizService.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['questions', isAdmin(), page, limit]);
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: ({ questionId, userAnswer }) => quizService.submitAnswer(questionId, userAnswer),
  });

  // New mutation for submitting the entire quiz
  const submitQuizMutation = useMutation({
    mutationFn: quizService.submitQuiz,
  });

  return {
    questions: getQuestions.data?.data || [],
    totalPages: getQuestions.data?.totalPages || 0,
    currentPage: getQuestions.data?.currentPage || page,
    totalItems: getQuestions.data?.totalItems || 0,
    setPage,
    setLimit,
    setSort,
    getQuestionById,
    createQuestion: createQuestionMutation.mutate,
    updateQuestion: updateQuestionMutation.mutate,
    deleteQuestion: deleteQuestionMutation.mutate,
    submitAnswer: submitAnswerMutation.mutate,
    submitQuiz: submitQuizMutation.mutate,
    quizResult: submitQuizMutation.data,
    isLoading: getQuestions.isLoading ||
      createQuestionMutation.isLoading ||
      updateQuestionMutation.isLoading ||
      deleteQuestionMutation.isLoading ||
      submitAnswerMutation.isLoading ||
      submitQuizMutation.isLoading,
    error: getQuestions.error ||
      createQuestionMutation.error ||
      updateQuestionMutation.error ||
      deleteQuestionMutation.error ||
      submitAnswerMutation.error ||
      submitQuizMutation.error,
    isAdmin: isAdmin(),
  };
};