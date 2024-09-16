import React, { Suspense } from 'react';
import { QuizManager } from '@/components/admin/Quiz/QuizManager';
import { SkeletonList } from '@/components/common/SkeletonComponents';

const Quiz = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonList />}>
        <QuizManager />
      </Suspense>
    </div>
  );
};

export default Quiz;