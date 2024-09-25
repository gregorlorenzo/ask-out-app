import React, { useState, useEffect, useCallback } from 'react';
import MazeScreen from './MazeScreen';
import DPad from './DPad';
import { generateMaze } from '@/utils/mazeGenerator';

const RetroMazeConsole = ({ stage, onComplete, currentStageIndex, totalStages }) => {
    const [maze, setMaze] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
    const [moveCount, setMoveCount] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [activeDirection, setActiveDirection] = useState(null);

    useEffect(() => {
        const { width, height } = stage.mazeSize;
        const generatedMaze = generateMaze(height, width);
        setMaze(generatedMaze);
        setPlayerPosition({ x: 1, y: 1 });
        setMoveCount(0);
        setTimeElapsed(0);
    }, [stage]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const movePlayer = useCallback((direction) => {
        setActiveDirection(direction);
        setTimeout(() => setActiveDirection(null), 100);

        setPlayerPosition((prevPosition) => {
            const { x, y } = prevPosition;
            let newX = x, newY = y;

            switch (direction) {
                case 'up': newY = Math.max(0, y - 1); break;
                case 'down': newY = Math.min(maze.length - 1, y + 1); break;
                case 'left': newX = Math.max(0, x - 1); break;
                case 'right': newX = Math.min(maze[0].length - 1, x + 1); break;
            }

            if (maze[newY] && maze[newY][newX] !== 1) {
                setMoveCount((prev) => prev + 1);
                checkCompletion(newX, newY);
                return { x: newX, y: newY };
            }
            return prevPosition;
        });
    }, [maze]);

    const checkCompletion = (x, y) => {
        if (maze[y][x] === 3) {
            onComplete(moveCount, timeElapsed);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': movePlayer('up'); break;
                case 'ArrowDown': movePlayer('down'); break;
                case 'ArrowLeft': movePlayer('left'); break;
                case 'ArrowRight': movePlayer('right'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer]);

    return (
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-3xl shadow-2xl max-w-md mx-auto">
            <h2 className="text-xl font-bold text-green-400 mb-4">Maze Challenge</h2>
            <div className="bg-gray-700 p-4 rounded-2xl mb-4 w-full">
                <MazeScreen
                    maze={maze}
                    playerPosition={playerPosition}
                    timeElapsed={timeElapsed}
                    moveCount={moveCount}
                    currentStage={currentStageIndex + 1}
                    totalStages={totalStages}
                />
            </div>
            <DPad onMove={movePlayer} activeDirection={activeDirection} />
        </div>
    );
};

export default RetroMazeConsole;