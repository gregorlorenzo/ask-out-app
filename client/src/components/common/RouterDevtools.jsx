import React, { Suspense } from 'react';

const TanStackRouterDevtools = React.lazy(() =>
    import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
    }))
);

export const RouterDevtools = () => (
    <Suspense fallback={null}>
        <TanStackRouterDevtools />
    </Suspense>
);