import React, { lazy, Suspense } from 'react';
import { SkeletonDashboard } from '@/components/common/SkeletonComponents';

const DashboardContent = lazy(() => import('@/components/admin/Dashboard/DashboardContent'));

const Dashboard = () => {
  return (
    <Suspense fallback={<SkeletonDashboard />}>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;