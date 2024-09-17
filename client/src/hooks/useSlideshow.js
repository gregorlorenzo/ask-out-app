import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideshowService } from '../services/slideshowService';
import { useState } from 'react';

export const useSlideshow = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('-date');

  const getSlideshow = useQuery({
    queryKey: ['slideshow', page, limit, sort],
    queryFn: () => slideshowService.getSlideshow(page, limit, sort),
    keepPreviousData: true,
  });

  const getSlideById = (id) => useQuery({
    queryKey: ['slide', id],
    queryFn: () => slideshowService.getSlideById(id),
  });

  const createSlideMutation = useMutation({
    mutationFn: slideshowService.createSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow', page, limit]);
    },
  });

  const updateSlideMutation = useMutation({
    mutationFn: ({ id, slideData }) => slideshowService.updateSlide(id, slideData),
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow', page, limit]);
    },
  });

  const deleteSlideMutation = useMutation({
    mutationFn: slideshowService.deleteSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow', page, limit]);
    },
  });

  return {
    slides: getSlideshow.data?.data || [],
    totalPages: getSlideshow.data?.totalPages || 0,
    currentPage: getSlideshow.data?.currentPage || page,
    totalItems: getSlideshow.data?.totalItems || 0,
    setPage,
    setLimit,
    setSort,
    getSlideById,
    createSlide: createSlideMutation.mutate,
    updateSlide: updateSlideMutation.mutate,
    deleteSlide: deleteSlideMutation.mutate,
    isLoading: getSlideshow.isLoading || createSlideMutation.isLoading || updateSlideMutation.isLoading || deleteSlideMutation.isLoading,
    error: getSlideshow.error || createSlideMutation.error || updateSlideMutation.error || deleteSlideMutation.error,
  };
};