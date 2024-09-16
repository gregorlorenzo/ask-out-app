import { createRootRoute } from '@tanstack/react-router';
import App from '../App';
import { RouterDevtools } from '@/components/common/RouterDevtools';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <App />
      <RouterDevtools />
    </>
  ),
});