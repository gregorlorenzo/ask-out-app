import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { letterService } from '../services/letterService';
import { useAuth } from './useAuth';
import { useState } from 'react';

export const useLetter = () => {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('-date');

  const getLetters = useQuery({
    queryKey: ['letters', page, limit, sort],
    queryFn: () => letterService.getLetters(page, limit, sort),
    keepPreviousData: true,
  });

  const getLetterById = (id) => useQuery({
    queryKey: ['letter', id],
    queryFn: () => letterService.getLetterById(id),
    enabled: !!id,
  });

  const getFeaturedLetter = useQuery({
    queryKey: ['featuredLetter'],
    queryFn: () => letterService.getFeaturedLetter(),
    staleTime: 1000 * 60 * 5,
  });

  const createLetterMutation = useMutation({
    mutationFn: letterService.createLetter,
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', page, limit, sort]);
      queryClient.invalidateQueries(['featuredLetter']);
    },
  });

  const updateLetterMutation = useMutation({
    mutationFn: ({ id, letterData }) => letterService.updateLetter(id, letterData),
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', page, limit, sort]);
      queryClient.invalidateQueries(['featuredLetter']);
    },
  });

  const deleteLetterMutation = useMutation({
    mutationFn: letterService.deleteLetter,
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', page, limit, sort]);
      queryClient.invalidateQueries(['featuredLetter']);
    },
  });

  const featureLetterMutation = useMutation({
    mutationFn: ({ id, featured }) => letterService.featureLetter(id, featured),
    onSuccess: () => {
      queryClient.invalidateQueries(['letters', page, limit, sort]);
      queryClient.invalidateQueries(['featuredLetter']);
    },
  });

  return {
    // Letters data
    letters: getLetters.data?.data || [],
    totalPages: getLetters.data?.totalPages || 0,
    currentPage: getLetters.data?.currentPage || page,
    totalItems: getLetters.data?.totalItems || 0,
    setPage,
    setLimit,
    setSort,

    // Single letter data
    getLetterById,

    // Featured letter data
    featuredLetter: getFeaturedLetter.data || null,

    // Mutations
    createLetter: createLetterMutation.mutate,
    updateLetter: updateLetterMutation.mutate,
    deleteLetter: deleteLetterMutation.mutate,
    featureLetter: featureLetterMutation.mutate,

    // Loading and error states
    isLoading: getLetters.isLoading || createLetterMutation.isLoading || updateLetterMutation.isLoading || deleteLetterMutation.isLoading || getFeaturedLetter.isLoading || featureLetterMutation.isLoading,
    error: getLetters.error || createLetterMutation.error || updateLetterMutation.error || deleteLetterMutation.error || (getFeaturedLetter.error && getFeaturedLetter.error.response?.status !== 404) || featureLetterMutation.error,

    // Admin status
    isAdmin: isAdmin(),
  };
};
