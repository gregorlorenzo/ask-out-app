import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizService } from '../services/quizService';

export const useQuiz = () => {
  const queryClient = useQueryClient();

  const getQuestions = useQuery({
    queryKey: ['questions'],
    queryFn: quizService.getQuestions,
  });

  const getQuestionById = (id) => useQuery({
    queryKey: ['question', id],
    queryFn: () => quizService.getQuestionById(id),
  });

  const createQuestionMutation = useMutation({
    mutationFn: quizService.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, questionData }) => quizService.updateQuestion(id, questionData),
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: quizService.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
    },
  });

  return {
    getQuestions,
    getQuestionById,
    createQuestion: createQuestionMutation.mutate,
    updateQuestion: updateQuestionMutation.mutate,
    deleteQuestion: deleteQuestionMutation.mutate,
    isLoading: getQuestions.isLoading || createQuestionMutation.isLoading || updateQuestionMutation.isLoading || deleteQuestionMutation.isLoading,
    error: getQuestions.error || createQuestionMutation.error || updateQuestionMutation.error || deleteQuestionMutation.error,
  };
};