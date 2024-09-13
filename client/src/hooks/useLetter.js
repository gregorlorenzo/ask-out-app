import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { letterService } from '../services/letterService';

export const useLetter = () => {
  const queryClient = useQueryClient();

  const getLetters = useQuery({
    queryKey: ['letters'],
    queryFn: letterService.getLetters,
  });

  const getLetterById = (id) => useQuery({
    queryKey: ['letter', id],
    queryFn: () => letterService.getLetterById(id),
  });

  const createLetterMutation = useMutation({
    mutationFn: letterService.createLetter,
    onSuccess: () => {
      queryClient.invalidateQueries('letters');
    },
  });

  const updateLetterMutation = useMutation({
    mutationFn: ({ id, letterData }) => letterService.updateLetter(id, letterData),
    onSuccess: () => {
      queryClient.invalidateQueries('letters');
    },
  });

  const deleteLetterMutation = useMutation({
    mutationFn: letterService.deleteLetter,
    onSuccess: () => {
      queryClient.invalidateQueries('letters');
    },
  });

  return {
    getLetters,
    getLetterById,
    createLetter: createLetterMutation.mutate,
    updateLetter: updateLetterMutation.mutate,
    deleteLetter: deleteLetterMutation.mutate,
    isLoading: getLetters.isLoading || createLetterMutation.isLoading || updateLetterMutation.isLoading || deleteLetterMutation.isLoading,
    error: getLetters.error || createLetterMutation.error || updateLetterMutation.error || deleteLetterMutation.error,
  };
};