import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LetterHeader from '@/components/guest/Letter/LetterHeader';
import LetterBody from '@/components/guest/Letter/LetterBody';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { useLetter } from '@/hooks/useLetter';

const GuestLetter = () => {
  const navigate = useNavigate();
  const { updateProgress } = useGuestProgress();
  
  // Use the useLetter hook to fetch the featured letter
  const { featuredLetter, isLoading, error } = useLetter();

  const handleContinue = () => {
    updateProgress({ hasCompletedLetter: true });
    navigate({ to: '/guest/nextRoute' }); // Replace with the actual next route
  };

  // Handle loading state
  if (isLoading) {
    return <div className="text-center mt-8">Loading your letter...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center mt-8 text-red-500">Error loading your letter.</div>;
  }

  // Handle case where no featured letter is found
  if (!featuredLetter) {
    return <div className="text-center mt-8">No featured letter available.</div>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg mt-8 p-6 rounded-lg border border-gray-200">
      <CardContent>
        <LetterHeader date={featuredLetter.date} title={featuredLetter.title} />
        <LetterBody content={featuredLetter.content} />
        <div className="mt-8 text-center">
          <Button onClick={handleContinue} className="px-6 py-2">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestLetter;
