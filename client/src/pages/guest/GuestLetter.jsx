import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LetterHeader from '@/components/guest/Letter/LetterHeader';
import LetterBody from '@/components/guest/Letter/LetterBody';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { useLetter } from '@/hooks/useLetter';
import { motion } from 'framer-motion';

const GuestLetter = () => {
  const navigate = useNavigate();
  const { updateProgress } = useGuestProgress();

  // Use the useLetter hook to fetch the featured letter
  const { featuredLetter, isLoading, error } = useLetter();

  const handleContinue = () => {
    updateProgress({ hasCompletedLetter: true });
    console.log('Navigating to /guest/ask-out');
    navigate({ to: '/guest/ask-out' });
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-100">
        Loading your letter...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-red-500">
        Error loading your letter.
      </div>
    );
  }

  // Handle case where no featured letter is found
  if (!featuredLetter) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-100">
        No featured letter available.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-zinc-900 p-4 sm:p-6 lg:p-8"
    >
      <Card className="w-full max-w-3xl bg-zinc-800/20 backdrop-blur-lg border-none shadow-lg overflow-hidden rounded-lg">
        <CardContent className="p-6">
          <LetterHeader date={featuredLetter.date} title={featuredLetter.title} />
          <LetterBody content={featuredLetter.content} />
          <div className="mt-8 text-center">
            <Button
              onClick={handleContinue}
              className="px-6 py-2 bg-zinc-700 text-zinc-100 hover:bg-zinc-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              aria-label="Continue to Next Step"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GuestLetter;