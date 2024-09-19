import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SlideshowList = ({ slideshow, isLoading, fullWidth = false }) => {
    return (
        <div className={fullWidth ? "w-full" : "w-1/2"}>
            <h2 className="text-xl font-semibold mb-4">Current Slideshow</h2>
            <Droppable droppableId="slideshow">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-2 min-h-[200px] border border-dashed p-4 ${snapshot.isDraggingOver ? 'border-green-500 bg-green-50' : 'border-gray-300'
                            }`}
                    >
                        {isLoading ? (
                            Array(3).fill().map((_, index) => (
                                <Skeleton key={index} className="h-16 w-full" />
                            ))
                        ) : (
                            slideshow && slideshow.slides && slideshow.slides.map((slideItem, index) => {
                                const slideId = (slideItem.slide && slideItem.slide._id) || slideItem.slide || slideItem._id;
                                return slideId ? (
                                    <Draggable key={slideId} draggableId={slideId} index={index}>
                                        {(provided, snapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`cursor-move ${snapshot.isDragging ? 'shadow-lg' : ''
                                                    }`}
                                            >
                                                <CardContent className="p-4">
                                                    <h3 className="font-medium">Slide {index + 1}</h3>
                                                    {/* You might want to add more slide details here */}
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Draggable>
                                ) : null;
                            })
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};