import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from '@tanstack/react-router';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;