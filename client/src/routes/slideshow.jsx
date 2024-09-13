import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from './protectedRoute';
import SlideshowPage from '../features/backend/slideshow/pages/SlideshowPage';

export const slideshowRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/slideshow',
  component: SlideshowPage,
});