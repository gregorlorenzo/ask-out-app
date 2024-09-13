import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import Login from '../features/auth/pages/LoginPage';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});