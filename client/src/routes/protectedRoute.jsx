import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import { authService } from '../services/authService';
import NotFound from '@/pages/NotFound';

export const protectedRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'protected',
    beforeLoad: () => {
      if (!authService.isAuthenticated()) {
        throw redirect({
          to: '/',
          search: { redirect: location.pathname },
        });
      }
    },
    notFoundComponent: NotFound,
  });
  