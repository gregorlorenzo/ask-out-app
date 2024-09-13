import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideshowService } from '../services/slideshowService';

export const useSlideshow = () => {
  const queryClient = useQueryClient();

  const getSlideshow = useQuery({
    queryKey: ['slideshow'],
    queryFn: slideshowService.getSlideshow,
  });

  const getSlideById = (id) => useQuery({
    queryKey: ['slide', id],
    queryFn: () => slideshowService.getSlideById(id),
  });

  const createSlideMutation = useMutation({
    mutationFn: slideshowService.createSlide,
    onSuccess: () => {
      queryClient.invalidateQueries('slideshow');
    },
  });

  const updateSlideMutation = useMutation({
    mutationFn: ({ id, slideData }) => slideshowService.updateSlide(id, slideData),
    onSuccess: () => {
      queryClient.invalidateQueries('slideshow');
    },
  });

  const deleteSlideMutation = useMutation({
    mutationFn: slideshowService.deleteSlide,
    onSuccess: () => {
      queryClient.invalidateQueries('slideshow');
    },
  });

  return {
    getSlideshow,
    getSlideById,
    createSlide: createSlideMutation.mutate,
    updateSlide: updateSlideMutation.mutate,
    deleteSlide: deleteSlideMutation.mutate,
    isLoading: getSlideshow.isLoading || createSlideMutation.isLoading || updateSlideMutation.isLoading || deleteSlideMutation.isLoading,
    error: getSlideshow.error || createSlideMutation.error || updateSlideMutation.error || deleteSlideMutation.error,
  };
};