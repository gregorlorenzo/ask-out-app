import { createRoute, redirect } from '@tanstack/react-router';
import { protectedRoute } from './protectedRoute';
import Dashboard from '../pages/Dashboard';
import { authService } from '../services/authService';

export const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: Dashboard,
  beforeLoad: () => {
    if (!authService.isAuthenticated()) {
      throw redirect({
        to: '/',
        search: {
          redirect: '/dashboard',
        },
      });
    }
  },
});