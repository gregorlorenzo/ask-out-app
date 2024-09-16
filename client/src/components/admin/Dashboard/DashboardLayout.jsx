import React, { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import { SkeletonDashboard } from '@/components/common/SkeletonComponents';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-800">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-200 p-4">
        <Suspense fallback={<SkeletonDashboard />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardLayout;