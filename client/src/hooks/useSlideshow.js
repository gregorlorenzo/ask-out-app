import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { slideshowService } from '../services/slideshowService';

export const useSlideshows = () => {
  const queryClient = useQueryClient();

  const getSlideshows = useQuery({
    queryKey: ['slideshows'],
    queryFn: () => slideshowService.getSlideshows(),
});

  const getSlideshow = (id) => useQuery({
    queryKey: ['slideshow', id],
    queryFn: () => slideshowService.getSlideshow(id),
  });

  const createSlideshowMutation = useMutation({
    mutationFn: slideshowService.createSlideshow,
    onSuccess: () => {
      queryClient.invalidateQueries(['slideshows']);
    },
  });

  const updateSlideshowMutation = useMutation({
    mutationFn: ({ id, slideshowData }) => slideshowService.updateSlideshow(id, slideshowData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['slideshow', variables.id]);
      queryClient.invalidateQueries(['slideshows']);
    },
  });

  const deleteSlideshowMutation = useMutation({
    mutationFn: slideshowService.deleteSlideshow,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['slideshows']);
      queryClient.removeQueries(['slideshow', id]);
    },
  });

  return {
    slideshows: getSlideshows.data,
    getSlideshows,
    getSlideshow,
    createSlideshow: createSlideshowMutation.mutate,
    updateSlideshow: updateSlideshowMutation.mutate,
    deleteSlideshow: deleteSlideshowMutation.mutate,
    isLoading: getSlideshows.isLoading || createSlideshowMutation.isLoading || updateSlideshowMutation.isLoading || deleteSlideshowMutation.isLoading,
    error: getSlideshows.error || createSlideshowMutation.error || updateSlideshowMutation.error || deleteSlideshowMutation.error,
  };
};