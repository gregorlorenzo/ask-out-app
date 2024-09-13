import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import Login from '../pages/Login';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});