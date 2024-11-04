import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'
import { RouterDevtools } from '@/components/common/RouterDevtools'
import { GuestProgressProvider } from '@/contexts/GuestProgressContext'
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <GuestProgressProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
          <Toaster />
          {import.meta.env.VITE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
          )}
          <RouterDevtools />
        </GuestProgressProvider>
      </QueryClientProvider>
  )
}

export default App