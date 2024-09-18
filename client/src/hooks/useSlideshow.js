import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideshowService } from '../services/slideshowService';

export const useSlideshows = () => {
  const queryClient = useQueryClient();

  const getSlideshow = (id) => useQuery({
    queryKey: ['slideshow', id],
    queryFn: () => slideshowService.getSlideshow(id),
  });

  const createSlideshowMutation = useMutation({
    mutationFn: slideshowService.createSlideshow,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshow']);
    },
  });

  const updateSlideshowMutation = useMutation({
    mutationFn: ({ id, slideshowData }) => slideshowService.updateSlideshow(id, slideshowData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['slideshow', variables.id]);
    },
  });

  const deleteSlideshowMutation = useMutation({
    mutationFn: slideshowService.deleteSlideshow,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['slideshow']);
      queryClient.removeQueries(['slideshow', id]);
    },
  });

  return {
    getSlideshow,
    createSlideshow: createSlideshowMutation.mutate,
    updateSlideshow: updateSlideshowMutation.mutate,
    deleteSlideshow: deleteSlideshowMutation.mutate,
    isLoading: createSlideshowMutation.isLoading || updateSlideshowMutation.isLoading || deleteSlideshowMutation.isLoading,
    error: createSlideshowMutation.error || updateSlideshowMutation.error || deleteSlideshowMutation.error,
  };
};