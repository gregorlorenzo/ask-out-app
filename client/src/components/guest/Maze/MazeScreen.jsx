import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const MazeScreen = ({ maze, playerPosition, currentStage, totalStages, moveCount, timeElapsed, gameState, onContinue }) => {
    if (gameState === 'completed') {
        return (
            <Card className="bg-gray-900 w-full max-w-md mx-auto border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-yellow-400 text-center">Congratulations!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white text-center mb-2">You've completed all maze challenges!</p>
                    <p className="text-gray-300 text-sm mb-4 text-center">
                        Final Stage: {currentStage} / {totalStages}
                    </p>
                    <p className="text-gray-300 text-sm mb-6 text-center">
                        Moves: {moveCount} | Time: {timeElapsed}s
                    </p>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={onContinue}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-300 rounded-md px-4 py-2 font-bold text-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Continue
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-900 w-full max-w-md mx-auto border-2 border-blue-400">
            <CardContent className="p-4">
                <div className="grid gap-px bg-gray-800 w-full aspect-square" style={{
                    gridTemplateColumns: `repeat(${maze[0]?.length || 1}, 1fr)`,
                    gridTemplateRows: `repeat(${maze.length || 1}, 1fr)`
                }}>
                    {maze.map((row, y) =>
                        row.map((cell, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`
                                    ${x === playerPosition.x && y === playerPosition.y
                                        ? 'bg-red-500'
                                        : cell === 0
                                            ? 'bg-emerald-300'
                                            : cell === 1
                                                ? 'bg-gray-800'
                                                : cell === 2
                                                    ? 'bg-blue-400'
                                                    : 'bg-yellow-400'
                                    }
                                    w-full h-full
                                `}
                            />
                        ))
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex-col">
                <div className="text-white text-center font-semibold">
                    Level {currentStage} / {totalStages}
                </div>
                <div className="text-gray-300 text-center text-sm">
                    Moves: {moveCount} | Time: {timeElapsed}s
                </div>
            </CardFooter>
        </Card>
    );
};

export default MazeScreen;