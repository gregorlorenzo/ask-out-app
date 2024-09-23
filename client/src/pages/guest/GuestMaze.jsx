import React, { useState, useEffect, useCallback } from 'react';
import { generateMaze } from '@/utils/helpers';
import MazeGrid from '@/components/guest/Maze/MazeGrid';
import MazeControls from '@/components/guest/Maze/MazeControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GuestMaze = () => {
    const [maze, setMaze] = useState(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
    const [mazeSize, setMazeSize] = useState({ width: 15, height: 15 });

    useEffect(() => {
        const newMaze = generateMaze(mazeSize.width, mazeSize.height);
        setMaze(newMaze);
        setPlayerPosition({ x: 1, y: 1 });
    }, [mazeSize]);

    const handleMove = useCallback((direction) => {
        if (!maze) return;

        setPlayerPosition((prevPosition) => {
            const newPosition = { ...prevPosition };

            switch (direction) {
                case 'up': newPosition.y -= 1; break;
                case 'down': newPosition.y += 1; break;
                case 'left': newPosition.x -= 1; break;
                case 'right': newPosition.x += 1; break;
            }

            if (maze[newPosition.y][newPosition.x] !== 1) {  // Not a wall
                if (maze[newPosition.y][newPosition.x] === 3) {  // End point
                    alert('Congratulations! You completed the maze!');
                    // Generate a new maze
                    const newMaze = generateMaze(mazeSize.width, mazeSize.height);
                    setMaze(newMaze);
                    return { x: 1, y: 1 };
                }
                return newPosition;
            }
            return prevPosition;
        });
    }, [maze, mazeSize]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp': handleMove('up'); break;
                case 'ArrowDown': handleMove('down'); break;
                case 'ArrowLeft': handleMove('left'); break;
                case 'ArrowRight': handleMove('right'); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleMove]);

    if (!maze) return <div>Loading maze...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Maze Game</CardTitle>
            </CardHeader>
            <CardContent>
                <MazeGrid
                    maze={maze}
                    playerPosition={playerPosition}
                />
                <MazeControls onMove={handleMove} />
            </CardContent>
        </Card>
    );
};

export default GuestMaze;