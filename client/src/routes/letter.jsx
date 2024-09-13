// import { createRoute, redirect } from '@tanstack/react-router';
// import { protectedRoute } from './protectedRoute';
// import { LetterPage } from '../features/backend/letter/pages/LetterPage';
// import { authService } from '../services/authService';

// export const letterRoute = createRoute({
//   getParentRoute: () => protectedRoute,
//   path: '/letters',
//   component: LetterPage,
//   beforeLoad: () => {
//     if (!authService.isAuthenticated()) {
//       throw redirect({
//         to: '/',
//         search: {
//           redirect: '/letters',
//         },
//       });
//     }
//   },
// });

import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from './protectedRoute';
import { LetterPage } from '../features/backend/letter/pages/LetterPage';

export const letterRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/letter",
  component: LetterPage,
});