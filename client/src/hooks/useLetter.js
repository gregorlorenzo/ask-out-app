import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { letterService } from '../services/letterService';
import { useAuth } from './useAuth';
import { useState } from 'react';

export const useLetter = () => {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const getLetters = useQuery({
    queryKey: ['letters', page, limit],
    queryFn: () => letterService.getLetters(page, limit),
    keepPreviousData: true,
  });

  const getLetterById = (id) => useQuery({
    queryKey: ['letter', id],
    queryFn: () => letterService.getLetterById(id),
  });

  const createLetterMutation = useMutation({
    mutationFn: letterService.createLetter,
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', isAdmin(), page, limit]);
    },
  });

  const updateLetterMutation = useMutation({
    mutationFn: ({ id, letterData }) => letterService.updateLetter(id, letterData),
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', isAdmin(), page, limit]);
    },
  });

  const deleteLetterMutation = useMutation({
    mutationFn: letterService.deleteLetter,
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', isAdmin(), page, limit]);
    },
  });

  return {
    letters: getLetters.data?.data || [],
    totalPages: getLetters.data?.totalPages || 0,
    currentPage: getLetters.data?.currentPage || page,
    totalItems: getLetters.data?.totalItems || 0,
    setPage,
    setLimit,
    getLetterById,
    createLetter: createLetterMutation.mutate,
    updateLetter: updateLetterMutation.mutate,
    deleteLetter: deleteLetterMutation.mutate,
    isLoading: getLetters.isLoading || createLetterMutation.isLoading || updateLetterMutation.isLoading || deleteLetterMutation.isLoading,
    error: getLetters.error || createLetterMutation.error || updateLetterMutation.error || deleteLetterMutation.error,
    isAdmin: isAdmin(),
  };
}