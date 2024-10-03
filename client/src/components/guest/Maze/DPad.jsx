import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DPad = ({ onMove, activeDirection }) => {
    const [pressedDirection, setPressedDirection] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const buttonClass = (direction) => `
        ${activeDirection === direction ? 'bg-blue-600' : 'bg-blue-700'} 
        rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-colors
        flex items-center justify-center absolute w-10 h-10 p-0
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
        <div className="relative w-36 h-36 bg-blue-800 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-700 rounded-full flex items-center justify-center relative">
                <Button
                    onMouseDown={() => handleMouseDown('up')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('up')} top-1 left-1/2 transform -translate-x-1/2`}
                    variant="ghost"
                >
                    <ArrowUp className="w-6 h-6 text-white" />
                </Button>
                <Button
                    onMouseDown={() => handleMouseDown('down')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('down')} bottom-1 left-1/2 transform -translate-x-1/2`}
                    variant="ghost"
                >
                    <ArrowDown className="w-6 h-6 text-white" />
                </Button>
                <Button
                    onMouseDown={() => handleMouseDown('left')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('left')} left-1 top-1/2 transform -translate-y-1/2`}
                    variant="ghost"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Button>
                <Button
                    onMouseDown={() => handleMouseDown('right')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('right')} right-1 top-1/2 transform -translate-y-1/2`}
                    variant="ghost"
                >
                    <ArrowRight className="w-6 h-6 text-white" />
                </Button>
                <div className="absolute inset-0 m-auto w-8 h-8 bg-blue-800 rounded-full"></div>
            </div>
        </div>
    );
};

export default DPad;