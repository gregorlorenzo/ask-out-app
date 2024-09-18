import { createRoute, redirect } from '@tanstack/react-router'
import { protectedRoute } from './protectedRoute';
import { lazy } from 'react'
import { getGuestProgress } from '@/contexts/GuestProgressContext';

const GuestLayout = lazy(() => import('@/components/guest/Guest/GuestLayout'))
const GuestWelcome = lazy(() => import('@/pages/guest/GuestWelcome'))
const GuestQuiz = lazy(() => import('@/pages/guest/GuestQuiz'))

const guestRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/guest',
  component: GuestLayout,
});

const guestWelcomeRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: '/',
  component: GuestWelcome,
});

const guestQuizRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: '/quiz',
  component: GuestQuiz,
  loader: async () => {
    const progress = getGuestProgress();
    if (!progress.hasCompletedWelcome) {
      throw redirect({
        to: '/guest',
      });
    }
    return null;
  },
});

export const guestRoutes = [
  guestRoute,
  guestWelcomeRoute,
  guestQuizRoute,
];