import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import { authService } from '../services/authService';
import DashboardLayout from '../features/backend/dashboard/components/DashboardLayout';

export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: DashboardLayout,
  beforeLoad: () => {
    if (!authService.isAuthenticated()) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});