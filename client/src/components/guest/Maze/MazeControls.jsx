import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const MazeControls = ({ onMove }) => {
    const [activeDirection, setActiveDirection] = useState(null);
    const [isMoving, setIsMoving] = useState(false);
    const [longPressTimer, setLongPressTimer] = useState(null);

    const handleMouseDown = useCallback((direction) => {
        setActiveDirection(direction);

        const timer = setTimeout(() => {
            setIsMoving(true);
        }, 250); // Adjust this delay as needed

        setLongPressTimer(timer);
    }, []);

    const handleMouseUp = useCallback(() => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }

        if (!isMoving && activeDirection) {
            // This was a quick click, so perform a single move
            onMove(activeDirection);
        }

        setActiveDirection(null);
        setIsMoving(false);
        setLongPressTimer(null);
    }, [isMoving, activeDirection, onMove, longPressTimer]);

    useEffect(() => {
        let intervalId;

        if (isMoving && activeDirection) {
            intervalId = setInterval(() => {
                onMove(activeDirection);
            }, 100); // Adjust this value to control movement speed
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isMoving, activeDirection, onMove]);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleMouseUp]);

    const createButtonProps = (direction) => ({
        onMouseDown: () => handleMouseDown(direction),
        onTouchStart: () => handleMouseDown(direction),
        onClick: () => { }, // Prevents default behavior, actual click is handled in handleMouseUp
        className: "p-2"
    });

    return (
        <div className="grid grid-cols-3 gap-2 mt-4">
            <div></div>
            <Button {...createButtonProps('up')}>
                <ChevronUp className="h-6 w-6" />
            </Button>
            <div></div>
            <Button {...createButtonProps('left')}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <div></div>
            <Button {...createButtonProps('right')}>
                <ChevronRight className="h-6 w-6" />
            </Button>
            <div></div>
            <Button {...createButtonProps('down')}>
                <ChevronDown className="h-6 w-6" />
            </Button>
            <div></div>
        </div>
    );
};

export default MazeControls;