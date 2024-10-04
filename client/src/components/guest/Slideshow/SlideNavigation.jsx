import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  isPlaying,
  onTogglePlay,
}) {
  return (
    <motion.div
      className="flex justify-between items-center mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="outline"
        className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-zinc-500"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-zinc-500"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <span className="text-sm text-zinc-100 min-w-[60px] text-center">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
      <Button
        variant="outline"
        className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-zinc-500"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}
