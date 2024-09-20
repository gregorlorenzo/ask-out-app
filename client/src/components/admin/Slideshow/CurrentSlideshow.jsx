import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import SlideItem from './SlideItem';

const CurrentSlideshow = ({ slides }) => {
    return (
        <Droppable droppableId="current">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[300px] rounded-lg border-2 border-dashed transition-all ${snapshot.isDraggingOver
                            ? 'border-zinc-500 bg-zinc-200 shadow-inner'
                            : 'border-zinc-300 bg-zinc-100'
                        }`}
                >
                    {slides.length === 0 && (
                        <p className="text-zinc-500 text-center py-8 italic">
                            Drag slides here to create a slideshow
                        </p>
                    )}
                    <div className="space-y-3 p-3">
                        {slides.map((slide, index) => (
                            <SlideItem key={slide._id} slide={slide} index={index} listType="current" />
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default CurrentSlideshow;