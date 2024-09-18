import React, { Suspense } from 'react';
import { SlideManager } from '@/components/admin/Slide/SlideManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Quiz = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonList />}>
        <SlideManager />
      </Suspense>
    </div>
  );
};

export default Quiz;