import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SlideList = ({ slides, isLoading }) => {
    return (
        <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-4">Available Slides</h2>
            <Droppable droppableId="slideList">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-2 min-h-[200px] border border-dashed p-4 ${snapshot.isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                    >
                        {isLoading ? (
                            Array(5).fill().map((_, index) => (
                                <Skeleton key={index} className="h-16 w-full" />
                            ))
                        ) : (
                            slides.map((slide, index) => (
                                <Draggable key={slide._id} draggableId={slide._id} index={index}>
                                    {(provided, snapshot) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`cursor-move ${snapshot.isDragging ? 'shadow-lg' : ''
                                                }`}
                                        >
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">{slide.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(slide.date).toLocaleDateString()}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};