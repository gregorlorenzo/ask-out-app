// import { createRoute, redirect } from '@tanstack/react-router';
// import { protectedRoute } from './protectedRoute';
// import { QuizPage } from '../features/backend/quiz/pages/QuizPage';
// import { authService } from '../services/authService';

// export const quizRoute = createRoute({
//   getParentRoute: () => protectedRoute,
//   path: '/quiz',
//   component: QuizPage,
//   beforeLoad: () => {
//     if (!authService.isAuthenticated()) {
//       throw redirect({
//         to: '/',
//         search: {
//           redirect: '/quiz',
//         },
//       });
//     }
//   },
// });

import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from './protectedRoute';
import { QuizPage } from '../features/backend/quiz/pages/QuizPage';

export const quizRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/quiz',
  component: QuizPage,
});