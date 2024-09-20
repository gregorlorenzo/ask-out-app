import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideshowService } from '../services/slideshowService';

export const useSlideshow = () => {
  const queryClient = useQueryClient();

  const getSlideshow = useQuery({
    queryKey: ['slideshow'],
    queryFn: () => slideshowService.getSlideshow(),
  });

  const createSlideshowMutation = useMutation({
    mutationFn: slideshowService.createSlideshow,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow']);
    },
  });

  const updateSlideshowMutation = useMutation({
    mutationFn: slideshowService.updateSlideshow,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow']);
    },
  });

  const deleteSlideshowMutation = useMutation({
    mutationFn: slideshowService.deleteSlideshow,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow']);
    },
  });

  const isEmptySlideshow = () => {
    return !getSlideshow.data || getSlideshow.data.slides.length === 0;
  };

  return {
    slideshow: getSlideshow.data,
    getSlideshow,
    createSlideshow: createSlideshowMutation.mutate,
    updateSlideshow: updateSlideshowMutation.mutate,
    deleteSlideshow: deleteSlideshowMutation.mutate,
    isEmptySlideshow,
    isLoading: getSlideshow.isLoading || createSlideshowMutation.isLoading || updateSlideshowMutation.isLoading || deleteSlideshowMutation.isLoading,
    error: getSlideshow.error || createSlideshowMutation.error || updateSlideshowMutation.error || deleteSlideshowMutation.error,
  };
};