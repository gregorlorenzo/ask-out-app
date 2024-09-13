import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardContent from '../components/DashboardContent';

const DashboardPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContent />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;