import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './root';
import { protectedRoute } from './protectedRoute';
import { loginRoute } from './login';
import { dashboardRoute } from './dashboard';
import { quizRoute } from './quiz';
import { letterRoute } from './letter';
import { slideshowRoute } from './slideshow';

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    quizRoute,
    letterRoute,
    slideshowRoute,
  ])
]);

export const router = createRouter({ routeTree });