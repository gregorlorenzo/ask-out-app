import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
import { GripVertical, Calendar, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SlideViewDialog from './SlideViewDialog';

const SlideItem = ({ slide, index, listType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const formattedDate = format(new Date(slide.date), 'MMM d, yyyy');

    if (!slide || !slide._id) {
        return null; // or some placeholder component
    }

    return (
        <Draggable draggableId={slide._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`p-4 rounded-md shadow-sm transition-all select-none ${snapshot.isDragging ? 'bg-zinc-300 shadow-md' : 'bg-zinc-50 hover:bg-zinc-100'
                        }`}
                >
                    <div className="flex items-center space-x-3">
                        <div
                            {...provided.dragHandleProps}
                            className="cursor-move p-1 -m-1 rounded hover:bg-zinc-200"
                        >
                            <GripVertical className="text-zinc-400" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-medium text-lg text-zinc-800">{slide.title}</h3>
                            <div className="flex items-center text-sm text-zinc-500 mt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        {listType === 'current' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-200 text-zinc-800">
                                Position: {index + 1}
                            </span>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
                            <Eye className="w-4 h-4" />
                        </Button>
                    </div>
                    <SlideViewDialog slide={slide} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            )}
        </Draggable>
    );
};

export default SlideItem;