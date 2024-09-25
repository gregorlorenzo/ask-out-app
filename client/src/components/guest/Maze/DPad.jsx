import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const DPad = ({ onMove, activeDirection }) => {
    const [pressedDirection, setPressedDirection] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const buttonClass = (direction) => `
        ${activeDirection === direction ? 'bg-gray-600' : 'bg-gray-700'} 
        rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors
        flex items-center justify-center absolute
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
        <div className="relative w-36 h-36 bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center relative">
                <button
                    onMouseDown={() => handleMouseDown('up')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('up')} top-1 left-1/2 transform -translate-x-1/2 w-10 h-10`}
                >
                    <ArrowUp className="w-6 h-6 text-green-400" />
                </button>
                <button
                    onMouseDown={() => handleMouseDown('down')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('down')} bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-10`}
                >
                    <ArrowDown className="w-6 h-6 text-green-400" />
                </button>
                <button
                    onMouseDown={() => handleMouseDown('left')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('left')} left-1 top-1/2 transform -translate-y-1/2 w-10 h-10`}
                >
                    <ArrowLeft className="w-6 h-6 text-green-400" />
                </button>
                <button
                    onMouseDown={() => handleMouseDown('right')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`${buttonClass('right')} right-1 top-1/2 transform -translate-y-1/2 w-10 h-10`}
                >
                    <ArrowRight className="w-6 h-6 text-green-400" />
                </button>
                <div className="absolute inset-0 m-auto w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
        </div>
    );
};

export default DPad;