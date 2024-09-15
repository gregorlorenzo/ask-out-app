import { createRoute } from '@tanstack/react-router'
import { protectedRoute } from './protectedRoute';
import { lazy } from 'react'

const DashboardLayout = lazy(() => import('@/components/admin/Dashboard/DashboardLayout'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const Quiz = lazy(() => import('@/pages/admin/Quiz'))
const Letter = lazy(() => import('@/pages/admin/Letter'))
const Slideshow = lazy(() => import('@/pages/admin/Slideshow'))

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: Dashboard,
});

const quizRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/quiz',
  component: Quiz,
});

const letterRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/letter',
  component: Letter,
});

const slideshowRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/slideshow',
  component: Slideshow,
});

export const adminRoutes = [
  dashboardRoute,
  dashboardIndexRoute,
  quizRoute,
  letterRoute,
  slideshowRoute
];