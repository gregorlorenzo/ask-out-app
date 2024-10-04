import React, { useState, useEffect, useCallback } from 'react';
import Slide from '@/components/guest/Slideshow/Slide';
import SlideNavigation from '@/components/guest/Slideshow/SlideNavigation';
import { useSlideshow } from '@/hooks/useSlideshow';
import { AnimatePresence, motion } from 'framer-motion';
import { Repeat, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { fadeIn, scaleFade } from '@/utils/animationVariants';

export default function GuestSlideshow() {
  const { slideshow, isLoading, error } = useSlideshow();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);

  const slides = slideshow?.slides || [];

  const navigate = useNavigate();
  const { updateProgress } = useGuestProgress();

  const nextSlide = useCallback(() => {
    if (currentSlide === slides.length - 1) {
      setShowFinalOptions(true);
      setIsPlaying(false);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setShowFinalOptions(false);
  }, [slides.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const replaySlideshow = () => {
    setCurrentSlide(0);
    setShowFinalOptions(false);
    setIsPlaying(true);
  };

  const continueToLetter = () => {
    updateProgress({ hasCompletedSlideshow: true });
    navigate({ to: '/guest/letter' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePlay]);

  useEffect(() => {
    let intervalId;
    if (isPlaying && !showFinalOptions) {
      intervalId = setInterval(nextSlide, 5000); // Adjust duration as needed
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, nextSlide, showFinalOptions]);

  if (isLoading)
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-100 px-4 sm:px-6 lg:px-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        Loading...
      </motion.div>
    );
  if (error)
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-zinc-900 text-red-500 px-4 sm:px-6 lg:px-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        Error: {error.message}
      </motion.div>
    );
  if (!slides.length)
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-100 px-4 sm:px-6 lg:px-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        No slides available
      </motion.div>
    );

  const currentSlideData = slides[currentSlide].slide;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card
        className="w-full max-w-4xl bg-zinc-800/20 backdrop-blur-lg border-none shadow-lg mt-8 overflow-hidden rounded-lg"
      >
        <CardContent className="p-6">
          {/* Internal Slide Animations */}
          <AnimatePresence mode="wait">
            {showFinalOptions ? (
              <motion.div
                key="final-options"
                variants={scaleFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto px-4 sm:px-6 lg:px-8"
              >
                <p className="text-xl text-zinc-100 mb-4">Would you like to:</p>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                  <Button
                    onClick={replaySlideshow}
                    variant="secondary"
                    className="flex items-center justify-center px-4 py-2 bg-zinc-700 text-zinc-100 hover:bg-zinc-600 border-zinc-600 transition-transform transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Repeat className="mr-2 h-4 w-4" />
                    Replay Slideshow
                  </Button>
                  <Button
                    onClick={continueToLetter}
                    variant="ghost"
                    className="flex items-center justify-center px-4 py-2 bg-zinc-700 text-zinc-100 hover:bg-zinc-600 border-zinc-600 transition-transform transform hover:scale-105 w-full sm:w-auto"
                  >
                    <span>Continue to Letter</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Slide key={currentSlide} slide={currentSlideData} />
            )}
          </AnimatePresence>
          {/* Slide Navigation */}
          {!showFinalOptions && (
            <SlideNavigation
              currentSlide={currentSlide}
              totalSlides={slides.length}
              onPrev={prevSlide}
              onNext={nextSlide}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
