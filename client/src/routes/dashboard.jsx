// import { createRoute, redirect } from '@tanstack/react-router';
// import { protectedRoute } from './protectedRoute';
// import Dashboard from '../features/backend/dashboard/pages/DashboardPage';
// import { authService } from '../services/authService';

// export const dashboardRoute = createRoute({
//   getParentRoute: () => protectedRoute,
//   path: '/dashboard',
//   component: Dashboard,
//   beforeLoad: () => {
//     if (!authService.isAuthenticated()) {
//       throw redirect({
//         to: '/',
//         search: {
//           redirect: '/dashboard',
//         },
//       });
//     }
//   },
// });

import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from './protectedRoute';
import Dashboard from '../features/backend/dashboard/pages/DashboardPage';

export const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: Dashboard,
});