import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import Welcome from '@/components/guest/Welcome/Welcome';

const GuestWelcome = () => {
  const navigate = useNavigate();
  const { updateProgress } = useGuestProgress();

  const handleProceed = () => {
    updateProgress({ hasCompletedWelcome: true });
    navigate({ to: '/guest/quiz' });
  };

  return <Welcome onStartClick={handleProceed} />;
};

export default GuestWelcome;