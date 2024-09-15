import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;