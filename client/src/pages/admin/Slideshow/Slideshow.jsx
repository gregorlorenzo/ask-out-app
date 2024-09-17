import React, { Suspense } from 'react';
import { SlideshowManager } from '@/components/admin/Slideshow/SlideshowManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Quiz = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonList />}>
        <SlideshowManager />
      </Suspense>
    </div>
  );
};

export default Quiz;