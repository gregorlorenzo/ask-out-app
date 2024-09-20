import { useState, useEffect, useCallback } from 'react';
import { useSlide } from '@/hooks/useSlide';
import { useSlideshow } from '@/hooks/useSlideshow';
import { useToast } from "@/hooks/use-toast";

export const useSlideshowState = () => {
    const { slides: allSlides, isLoading: isLoadingSlides } = useSlide();
    const { slideshow, createSlideshow, updateSlideshow, deleteSlideshow, isLoading: isLoadingSlideshow } = useSlideshow();
    const [availableSlides, setAvailableSlides] = useState([]);
    const [currentSlideshow, setCurrentSlideshow] = useState([]);
    const { toast } = useToast();

    const updateSlidesState = useCallback(() => {
        if (allSlides) {
            if (slideshow && slideshow.slides && Array.isArray(slideshow.slides)) {
                const currentSlides = slideshow.slides
                    .filter(item => item && item.slide)
                    .map(item => item.slide);
                setCurrentSlideshow(currentSlides);
                setAvailableSlides(allSlides.filter(slide => !currentSlides.some(s => s && s._id === slide._id)));
            } else {
                setAvailableSlides(allSlides);
                setCurrentSlideshow([]);
            }
        }
    }, [allSlides, slideshow]);

    useEffect(() => {
        updateSlidesState();
    }, [updateSlidesState]);

    return {
        availableSlides,
        currentSlideshow,
        setAvailableSlides,
        setCurrentSlideshow,
        isLoadingSlides,
        isLoadingSlideshow,
        createSlideshow,
        updateSlideshow,
        deleteSlideshow,
        toast
    };
};