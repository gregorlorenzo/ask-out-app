import { createRoute } from '@tanstack/react-router'
import { protectedRoute } from './protectedRoute';
import { lazy } from 'react'

const DashboardLayout = lazy(() => import('@/components/admin/Dashboard/DashboardLayout'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard/Dashboard'))
const Quiz = lazy(() => import('@/pages/admin/Quiz/Quiz'))
const Letter = lazy(() => import('@/pages/admin/Letter/Letter'))
const AddLetter = lazy(() => import('@/pages/admin/Letter/AddLetter'))
const EditLetter = lazy(() => import('@/pages/admin/Letter/EditLetter'))
const Slide = lazy(() => import('@/pages/admin/Slide/Slide'))
const AddSlide = lazy(() => import('@/pages/admin/Slide/AddSlide'))
const EditSlide = lazy(() => import('@/pages/admin/Slide/EditSlide'))

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

const addLetterRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/letter/add',
  component: AddLetter,
});

const editLetterRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/letter/$letterId',
  component: EditLetter,
});

const slideRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/slide',
  component: Slide,
});

const addSlideRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/slide/add',
  component: AddSlide,
});

const editSlideRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/slide/$slideId',
  component: EditSlide,
});

export const adminRoutes = [
  dashboardRoute,
  dashboardIndexRoute,
  quizRoute,
  letterRoute,
  addLetterRoute,
  editLetterRoute,
  slideRoute,
  addSlideRoute,
  editSlideRoute
];