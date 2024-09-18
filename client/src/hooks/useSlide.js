import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideService } from '../services/slideService';
import { useState } from 'react';

export const useSlide = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('-date');

  const getSlide = useQuery({
    queryKey: ['slide', page, limit, sort],
    queryFn: () => slideService.getSlide(page, limit, sort),
    keepPreviousData: true,
  });

  const getSlideById = (id) => useQuery({
    queryKey: ['slide', id],
    queryFn: () => slideService.getSlideById(id),
  });

  const createSlideMutation = useMutation({
    mutationFn: slideService.createSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', page, limit]);
    },
  });

  const updateSlideMutation = useMutation({
    mutationFn: ({ id, slideData }) => slideService.updateSlide(id, slideData),
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', page, limit]);
    },
  });

  const deleteSlideMutation = useMutation({
    mutationFn: slideService.deleteSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', page, limit]);
    },
  });

  return {
    slides: getSlide.data?.data || [],
    totalPages: getSlide.data?.totalPages || 0,
    currentPage: getSlide.data?.currentPage || page,
    totalItems: getSlide.data?.totalItems || 0,
    setPage,
    setLimit,
    setSort,
    getSlideById,
    createSlide: createSlideMutation.mutate,
    updateSlide: updateSlideMutation.mutate,
    deleteSlide: deleteSlideMutation.mutate,
    isLoading: getSlide.isLoading || createSlideMutation.isLoading || updateSlideMutation.isLoading || deleteSlideMutation.isLoading,
    error: getSlide.error || createSlideMutation.error || updateSlideMutation.error || deleteSlideMutation.error,
  };
};