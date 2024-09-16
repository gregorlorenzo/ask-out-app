import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'
import { RouterDevtools } from './components/common/RouterDevtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterDevtools />
    </QueryClientProvider>
  )
}

export default App