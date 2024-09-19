import React, { Suspense } from 'react';
import { SlideshowManager } from '@/components/admin/Slideshow/SlideshowManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Slideshow = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Slideshow Manager</h1>
            <Suspense fallback={<SkeletonList />}>
                <SlideshowManager />
            </Suspense>
        </div>
    );
};

export default Slideshow;