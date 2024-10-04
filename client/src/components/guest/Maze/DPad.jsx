import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DPad = ({ onMove, activeDirection }) => {
    const [pressedDirection, setPressedDirection] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const buttonClass = (direction) => `
        ${activeDirection === direction ? 'bg-zinc-700' : 'bg-zinc-800'} 
        rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-colors
        flex items-center justify-center absolute w-12 h-12 p-0
    `;

    const startMoving = useCallback((direction) => {
        onMove(direction);
        setPressedDirection(direction);
        const id = setInterval(() => onMove(direction), 150);
        setIntervalId(id);
    }, [onMove]);

    const stopMoving = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setPressedDirection(null);
    }, [intervalId]);

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const handleMouseDown = (direction) => {
        startMoving(direction);
    };

    const handleMouseUp = () => {
        stopMoving();
    };

    const handleMouseLeave = () => {
        stopMoving();
    };

    return (
        <div className="relative w-40 h-40 bg-zinc-800 rounded-full flex items-center justify-center">
            <div className="w-36 h-36 bg-zinc-900 rounded-full flex items-center justify-center relative">
                {/* Up Button */}
                <Button
                    onMouseDown={() => handleMouseDown('up')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('up')} top-3 left-1/2 transform -translate-x-1/2`}
                    variant="ghost"
                    aria-label="Move Up"
                >
                    <ArrowUp className="w-6 h-6 text-zinc-100" />
                </Button>

                {/* Down Button */}
                <Button
                    onMouseDown={() => handleMouseDown('down')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('down')} bottom-3 left-1/2 transform -translate-x-1/2`}
                    variant="ghost"
                    aria-label="Move Down"
                >
                    <ArrowDown className="w-6 h-6 text-zinc-100" />
                </Button>

                {/* Left Button */}
                <Button
                    onMouseDown={() => handleMouseDown('left')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('left')} left-3 top-1/2 transform -translate-y-1/2`}
                    variant="ghost"
                    aria-label="Move Left"
                >
                    <ArrowLeft className="w-6 h-6 text-zinc-100" />
                </Button>

                {/* Right Button */}
                <Button
                    onMouseDown={() => handleMouseDown('right')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('right')} right-3 top-1/2 transform -translate-y-1/2`}
                    variant="ghost"
                    aria-label="Move Right"
                >
                    <ArrowRight className="w-6 h-6 text-zinc-100" />
                </Button>

                {/* Center Dot */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-zinc-800 rounded-full"></div>
            </div>
        </div>
    );
};

export default DPad;
