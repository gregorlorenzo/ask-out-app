import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MazeScreen from './MazeScreen';
import DPad from './DPad';
import { generateMaze } from '@/utils/mazeGenerator';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RetroMazeConsole = React.memo(({ stage, onComplete, currentStageIndex, totalStages, onContinue }) => {
    const [maze, setMaze] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
    const [moveCount, setMoveCount] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [activeDirection, setActiveDirection] = useState(null);
    const [gameState, setGameState] = useState('playing'); // 'playing' or 'completed'

    const generateNewMaze = useCallback(() => {
        const { width, height } = stage.mazeSize;
        const difficulty = stage.difficulty;
        const generatedMaze = generateMaze(height, width, difficulty);
        setMaze(generatedMaze);
        setPlayerPosition({ x: 1, y: 1 });
        setMoveCount(0);
        setTimeElapsed(0);
        setGameState('playing');
    }, [stage]);

    useEffect(() => {
        generateNewMaze();
    }, [generateNewMaze]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (gameState === 'playing') {
                setTimeElapsed((prev) => prev + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [gameState]);

    const movePlayer = useCallback((direction) => {
        if (gameState === 'completed') return;

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
                default: break;
            }

            if (maze[newY] && maze[newY][newX] !== 1) {
                setMoveCount((prev) => prev + 1);
                if (maze[newY][newX] === 3) {
                    if (currentStageIndex === totalStages - 1) {
                        setGameState('completed');
                        onComplete(moveCount, timeElapsed);
                    } else {
                        onComplete(moveCount, timeElapsed);
                    }
                }
                return { x: newX, y: newY };
            }
            return prevPosition;
        });
    }, [maze, moveCount, timeElapsed, onComplete, currentStageIndex, totalStages, gameState]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault(); // Prevent scrolling
                    movePlayer('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault(); // Prevent scrolling
                    movePlayer('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault(); // Prevent scrolling
                    movePlayer('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault(); // Prevent scrolling
                    movePlayer('right');
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer]);

    const handleRegenerate = useCallback(() => {
        generateNewMaze();
    }, [generateNewMaze]);

    const handleReset = useCallback(() => {
        setPlayerPosition({ x: 1, y: 1 });
        setMoveCount(0);
        setTimeElapsed(0);
        setGameState('playing');
    }, []);

    const memoizedMazeScreen = useMemo(() => (
        <MazeScreen
            maze={maze}
            playerPosition={playerPosition}
            timeElapsed={timeElapsed}
            moveCount={moveCount}
            currentStage={currentStageIndex + 1}
            totalStages={totalStages}
            gameState={gameState}
            onContinue={onContinue}
        />
    ), [maze, playerPosition, timeElapsed, moveCount, currentStageIndex, totalStages, gameState, onContinue]);

    return (
        <Card className="bg-zinc-800 w-full max-w-md mx-auto border-4 border-zinc-700 rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-zinc-100 text-center">Maze Challenge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="bg-zinc-700 p-4 rounded-2xl mb-6 w-full border-2 border-zinc-700">
                    {memoizedMazeScreen}
                </div>
                {gameState === 'playing' && (
                    <>
                        <DPad onMove={movePlayer} activeDirection={activeDirection} />
                        <div className="flex justify-center mt-6 space-x-6">
                            <Button
                                onClick={handleRegenerate}
                                className="w-12 h-12 rounded-full bg-zinc-700 border-2 border-zinc-600 p-0"
                                variant="ghost"
                                aria-label="Regenerate Maze"
                            >
                                <RefreshCw className="w-6 h-6 text-zinc-300" />
                            </Button>
                            <Button
                                onClick={handleReset}
                                className="w-12 h-12 rounded-full bg-zinc-700 border-2 border-zinc-600 p-0"
                                variant="ghost"
                                aria-label="Reset Maze"
                            >
                                <RotateCcw className="w-6 h-6 text-zinc-300" />
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
});

export default RetroMazeConsole;
