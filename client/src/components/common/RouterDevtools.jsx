import React, { Suspense } from 'react';

export const RouterDevtools = () => {
    if (import.meta.env.VITE_ENV === 'production') {
        return null;
    }

    const TanStackRouterDevtools = React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
            default: res.TanStackRouterDevtools,
        }))
    );

    return (
        <Suspense fallback={null}>
            <TanStackRouterDevtools />
        </Suspense>
    );
};