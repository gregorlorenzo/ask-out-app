import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import AvailableSlides from './AvailableSlides';
import CurrentSlideshow from './CurrentSlideshow';
import { useSlide } from '@/hooks/useSlide';
import { useSlideshow } from '@/hooks/useSlideshow';
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const SlideshowManager = () => {
    const { slides: allSlides, isLoading: isLoadingSlides } = useSlide();
    const { slideshow, updateSlideshow, isLoading: isLoadingSlideshow } = useSlideshow();
    const [availableSlides, setAvailableSlides] = useState([]);
    const [currentSlideshow, setCurrentSlideshow] = useState([]);
    const { toast } = useToast();

    const updateSlidesState = useCallback(() => {
        if (allSlides) {
            if (slideshow && slideshow.slides) {
                const currentSlides = slideshow.slides.map(item => item.slide);
                setCurrentSlideshow(currentSlides);
                setAvailableSlides(allSlides.filter(slide => !currentSlides.some(s => s._id === slide._id)));
            } else {
                setAvailableSlides(allSlides);
                setCurrentSlideshow([]);
            }
        }
    }, [allSlides, slideshow]);

    useEffect(() => {
        updateSlidesState();
    }, [updateSlidesState]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        let newAvailable = [...availableSlides];
        let newCurrent = [...currentSlideshow];

        if (source.droppableId === destination.droppableId) {
            const items = source.droppableId === 'available' ? newAvailable : newCurrent;
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);
        } else {
            const sourceItems = source.droppableId === 'available' ? newAvailable : newCurrent;
            const destItems = destination.droppableId === 'available' ? newAvailable : newCurrent;
            const [movedItem] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, movedItem);
        }

        setAvailableSlides(newAvailable);
        setCurrentSlideshow(newCurrent);

        const hasChanges = detectChanges(currentSlideshow, newCurrent);

        if (hasChanges) {
            updateSlideshowPositions(newCurrent);
        }
    };

    const detectChanges = (oldSlideshow, newSlideshow) => {
        if (oldSlideshow.length !== newSlideshow.length) return true;

        return oldSlideshow.some((slide, index) => slide._id !== newSlideshow[index]._id);
    };

    const updateSlideshowPositions = (slides) => {
        const updatedSlides = slides.map((slide, index) => ({
            id: slide._id,
            position: index + 1
        }));

        updateSlideshow(
            { slides: updatedSlides },
            {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Slideshow updated successfully",
                    });
                },
                onError: (error) => {
                    toast({
                        title: "Error",
                        description: `Error updating slideshow: ${error.message}`,
                        variant: "destructive",
                    });
                    updateSlidesState();
                }
            }
        );
    };

    if (isLoadingSlides || isLoadingSlideshow) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-50 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="bg-zinc-700 p-4">
                        <CardTitle className="text-xl font-semibold text-zinc-100">Available Slides</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <AvailableSlides slides={availableSlides} />
                    </CardContent>
                </Card>
                <Card className="bg-zinc-50 shadow-md rounded-lg overflow-hidden">
                    <CardHeader className="bg-zinc-700 p-4">
                        <CardTitle className="text-xl font-semibold text-zinc-100">Current Slideshow</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CurrentSlideshow slides={currentSlideshow} />
                    </CardContent>
                </Card>
            </div>
        </DragDropContext>
    );
};

export default SlideshowManager;