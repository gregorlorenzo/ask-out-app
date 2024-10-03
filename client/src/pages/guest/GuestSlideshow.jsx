import React, { useState, useEffect, useCallback } from 'react';
import Slide from '@/components/guest/Slideshow/Slide';
import SlideNavigation from '@/components/guest/Slideshow/SlideNavigation';
import { useSlideshow } from '@/hooks/useSlideshow';
import { AnimatePresence, motion } from 'framer-motion';
import { Repeat, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useGuestProgress } from '@/contexts/GuestProgressContext'

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
    } else {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
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
      intervalId = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, nextSlide, showFinalOptions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!slides.length) return <div>No slides available</div>;

  const currentSlideData = slides[currentSlide].slide;

  return (
    <Card
      className="w-full max-w-4xl mx-auto bg-white/20 backdrop-blur-lg border-none shadow-lg mt-8 overflow-hidden rounded-lg"
    >
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {showFinalOptions ? (
            <motion.div
              key="final-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto"
            >
              <p className="text-xl text-white mb-4">Would you like to:</p>
              <div className="flex items-center space-x-4">
                <Button onClick={replaySlideshow} variant="secondary" className="px-4 py-2">
                  <Repeat className="mr-2 h-4 w-4" />
                  Replay Slideshow
                </Button>
                <Button onClick={continueToLetter} variant="ghost" className="text-white">
                  <span>Continue to Letter</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

          ) : (
            <Slide key={currentSlide} slide={currentSlideData} />
          )}
        </AnimatePresence>
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
  );
}
