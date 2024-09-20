import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import SlideItem from './SlideItem';

const AvailableSlides = ({ slides }) => {
    return (
        <Droppable droppableId="available">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[300px] rounded-lg transition-all ${snapshot.isDraggingOver ? 'bg-zinc-200 shadow-inner' : 'bg-zinc-100'
                        }`}
                >
                    {slides.length === 0 && (
                        <p className="text-zinc-500 text-center py-8 italic">No available slides</p>
                    )}
                    <div className="space-y-3 p-3">
                        {slides.map((slide, index) => (
                            <SlideItem key={slide._id} slide={slide} index={index} listType="available" />
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default AvailableSlides;