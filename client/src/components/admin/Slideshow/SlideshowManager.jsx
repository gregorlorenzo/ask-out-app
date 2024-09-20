import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import AvailableSlides from './AvailableSlides';
import CurrentSlideshow from './CurrentSlideshow';
import { useSlideshowState } from '@/hooks/useSlideshowState';
import { createNewSlideshow, updateSlideshowPositions, deleteSlideshowIfEmpty } from '@/utils/helpers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const SlideshowManager = () => {
    const {
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
    } = useSlideshowState();

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

        if (newCurrent.length > 0) {
            if (currentSlideshow.length > 0) {
                updateSlideshowPositions(newCurrent, updateSlideshow, toast);
            } else {
                createNewSlideshow(newCurrent, createSlideshow, toast);
            }
        } else if (currentSlideshow.length > 0) {
            deleteSlideshowIfEmpty(deleteSlideshow, toast);
        }
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