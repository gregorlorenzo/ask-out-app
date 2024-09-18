import { createRouter, createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { protectedRoute } from './protectedRoute';
import { lazy } from 'react'
import { adminRoutes } from './adminRoutes'
import { guestRoutes } from './guestRoutes'

const Login = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([
    ...adminRoutes,
    ...guestRoutes,
  ]),
  notFoundRoute,
]);

export const router = createRouter({ routeTree });