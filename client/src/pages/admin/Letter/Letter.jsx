import React, { Suspense } from 'react';
import { LetterManager } from '@/components/admin/Letter/LetterManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Quiz = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonList />}>
        <LetterManager />
      </Suspense>
    </div>
  );
};

export default Quiz;