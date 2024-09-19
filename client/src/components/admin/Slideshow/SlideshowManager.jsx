import React, { useState, useEffect } from 'react';
import { useSlide } from '@/hooks/useSlide';
import { useSlideshows } from '@/hooks/useSlideshow';
import { toast } from '@/hooks/use-toast';
import { SlideshowForm } from './SlideshowForm';

export const SlideshowManager = () => {
    const [slideshow, setSlideshow] = useState(null);
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
        if (getSlideshows.error) {
            toast({
                title: "Error fetching slideshows",
                description: getSlideshows.error.message,
                variant: "destructive"
            });
        }
    }, [getSlideshows.error]);

    useEffect(() => {
        setLimit(1000);
    }, [setLimit]);

    useEffect(() => {
        if (slideshows && slideshows.length > 0) {
            setSlideshow(slideshows[0]);
        } else {
            setSlideshow({ slides: [] });
        }
    }, [slideshows]);

    useEffect(() => {
        if (slides && slideshow) {
            const slideshowSlideIds = slideshow.slides.map(slide => {
                return (slide.slide && slide.slide._id) || slide.slide || slide._id;
            }).filter(Boolean);
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
                slides: prev.slides.filter((_, index) => index !== source.index).map((slide, index) => ({ ...slide, position: index + 1 }))
            }));
            const slideToAdd = slides.find(s => s._id === (removedSlide.slide && removedSlide.slide._id) || removedSlide.slide || removedSlide._id);
            if (slideToAdd) {
                setAvailableSlides(prev => [...prev, slideToAdd]);
            }
        }
    };

    const handleSave = async () => {
        try {
            if (slideshow._id) {
                await updateSlideshow({ id: slideshow._id, slideshowData: slideshow });
                toast({ title: "Slideshow updated successfully" });
            } else {
                const newSlideshow = await createSlideshow(slideshow);
                setSlideshow(newSlideshow);
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

    if (getSlideshows.isLoading || slidesLoading || slideshowLoading) {
        return <div>Loading...</div>;
    }

    return (
        <SlideshowForm
            slideshow={slideshow}
            availableSlides={availableSlides}
            slidesLoading={slidesLoading}
            slideshowLoading={slideshowLoading}
            handleSave={handleSave}
            onDragEnd={onDragEnd}
        />
    );
};