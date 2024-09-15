import { createRoute  } from '@tanstack/react-router'
import { protectedRoute } from './protectedRoute';
import { lazy } from 'react'

const GuestHome = lazy(() => import('../pages/guest/GuestHome'))

export const guestRoutes = [
  createRoute({
    getParentRoute: () => protectedRoute,
    path: '/guest',
    component: GuestHome,
  }),
  // Add more guest routes here as needed
]