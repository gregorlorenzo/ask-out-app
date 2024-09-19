import React, { useState, useEffect } from 'react';
import { useSlide } from '@/hooks/useSlide';
import { useSlideshows } from '@/hooks/useSlideshow';
import { toast } from '@/hooks/use-toast';
import { SlideshowForm } from './SlideshowForm';

export const SlideshowManager = () => {
    const [slideshow, setSlideshow] = useState({ name: '', slides: [] });
    const [availableSlides, setAvailableSlides] = useState([]);
    const {
        slides,
        setLimit,
        isLoading: slidesLoading,
        error: slidesError
    } = useSlide();
    const {
        slideshows,
        getSlideshows,
        createSlideshow,
        updateSlideshow,
        isLoading: slideshowLoading,
        error: slideshowError
    } = useSlideshows();

    useEffect(() => {
        setLimit(1000);
    }, [setLimit]);

    useEffect(() => {
        if (slideshows && slideshows.length > 0) {
            setSlideshow(slideshows[0]);
        }
    }, [slideshows]);

    useEffect(() => {
        if (slides && slideshow) {
            const slideshowSlideIds = slideshow.slides.map(slide => slide.slide);
            setAvailableSlides(slides.filter(slide => !slideshowSlideIds.includes(slide._id)));
        }
    }, [slides, slideshow]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === 'slideList' && destination.droppableId === 'slideshow') {
            const draggedSlide = availableSlides[source.index];
            setSlideshow(prev => ({
                ...prev,
                slides: [...prev.slides, { slide: draggedSlide._id, position: prev.slides.length + 1 }]
            }));
            setAvailableSlides(prev => prev.filter((_, index) => index !== source.index));
        } else if (source.droppableId === 'slideshow' && destination.droppableId === 'slideshow') {
            const newSlides = Array.from(slideshow.slides);
            const [reorderedSlide] = newSlides.splice(source.index, 1);
            newSlides.splice(destination.index, 0, reorderedSlide);
            setSlideshow(prev => ({
                ...prev,
                slides: newSlides.map((slide, index) => ({ ...slide, position: index + 1 }))
            }));
        } else if (source.droppableId === 'slideshow' && destination.droppableId === 'slideList') {
            const [removedSlide] = slideshow.slides.splice(source.index, 1);
            setSlideshow(prev => ({
                ...prev,
                slides: prev.slides.filter((_, index) => index !== source.index)
            }));
            const originalSlide = slides.find(slide => slide._id === removedSlide.slide);
            setAvailableSlides(prev => [...prev, originalSlide]);
        }
    };

    const handleSave = async () => {
        try {
            if (slideshow._id) {
                await updateSlideshow({ id: slideshow._id, slideshowData: slideshow });
                toast({ title: "Slideshow updated successfully" });
            } else {
                await createSlideshow(slideshow);
                toast({ title: "Slideshow created successfully" });
            }
            getSlideshows.refetch();
        } catch (error) {
            toast({ title: "Error saving slideshow", description: error.message, variant: "destructive" });
        }
    };

    if (slidesError || slideshowError) {
        return <div>Error: {slidesError?.message || slideshowError?.message}</div>;
    }

    return (
        <SlideshowForm
            slideshow={slideshow}
            setSlideshow={setSlideshow}
            availableSlides={availableSlides}
            setAvailableSlides={setAvailableSlides}
            slidesLoading={slidesLoading}
            slideshowLoading={slideshowLoading}
            handleSave={handleSave}
            onDragEnd={onDragEnd}
        />
    );
};