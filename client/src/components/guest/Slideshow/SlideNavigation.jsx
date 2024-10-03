import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SlideNavigation({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    isPlaying,
    onTogglePlay,
}) {
    return (
        <div className="flex justify-between items-center mt-6">
            <Button
                variant="outline"
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white border-2 border-white transition-all focus:ring-2 focus:ring-white"
                onClick={onPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white border-2 border-white transition-all focus:ring-2 focus:ring-white"
                    onClick={onTogglePlay}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                    {isPlaying ? (
                        <Pause className="h-6 w-6" />
                    ) : (
                        <Play className="h-6 w-6" />
                    )}
                </Button>
                <span className="text-sm text-white min-w-[60px] text-center">
                    {currentSlide + 1} / {totalSlides}
                </span>
            </div>
            <Button
                variant="outline"
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white border-2 border-white transition-all focus:ring-2 focus:ring-white"
                onClick={onNext}
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
}