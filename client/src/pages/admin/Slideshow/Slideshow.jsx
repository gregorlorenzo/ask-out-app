import React, { Suspense } from 'react';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Letter = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonList />}>
        <h1>Slideshow Management</h1>
      </Suspense>
    </div>
  );
};

export default Letter;