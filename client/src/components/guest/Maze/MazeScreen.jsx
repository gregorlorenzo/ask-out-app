import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const MazeScreen = ({ maze, playerPosition, currentStage, totalStages, moveCount, timeElapsed, gameState, onContinue }) => {
    if (gameState === 'completed') {
        return (
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <Card className="bg-zinc-800 w-full max-w-md mx-auto border-2 border-zinc-700 rounded-lg shadow-md">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-yellow-400 text-center">Congratulations!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-100 text-center mb-2">You've completed all maze challenges!</p>
                        <p className="text-zinc-300 text-sm mb-4 text-center">
                            Final Stage: {currentStage} / {totalStages}
                        </p>
                        <p className="text-zinc-300 text-sm mb-6 text-center">
                            Moves: {moveCount} | Time: {timeElapsed}s
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={onContinue}
                            className="w-full bg-zinc-700 text-zinc-100 hover:bg-zinc-600 border-zinc-600 rounded-md px-4 py-2 font-bold text-lg shadow transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
                        >
                            Continue
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
    }

    return (
        <Card className="bg-zinc-800 w-full max-w-md mx-auto border-2 border-zinc-700 rounded-lg shadow-md">
            <CardContent className="p-4">
                <div className="relative grid gap-0.5 bg-zinc-700 w-full aspect-square" style={{
                    gridTemplateColumns: `repeat(${maze[0]?.length || 1}, 1fr)`,
                    gridTemplateRows: `repeat(${maze.length || 1}, 1fr)`
                }}>
                    {maze.map((row, y) =>
                        row.map((cell, x) => {
                            const isPlayer = x === playerPosition.x && y === playerPosition.y;
                            let cellColor = 'bg-zinc-300';

                            switch (cell) {
                                case 1:
                                    cellColor = 'bg-zinc-800'; // Wall
                                    break;
                                case 2:
                                    cellColor = 'bg-zinc-600'; // Start
                                    break;
                                case 3:
                                    cellColor = 'bg-zinc-500'; // End
                                    break;
                                default:
                                    cellColor = 'bg-zinc-300'; // Path
                            }

                            return (
                                <div
                                    key={`${x}-${y}`}
                                    className={`relative w-full aspect-square ${cellColor}`}
                                >
                                    {isPlayer && (
                                        <div className="absolute inset-0 bg-red-500 rounded-full flex items-center justify-center">
                                            {/* Player Icon or Marker */}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
                <div className="text-zinc-100 text-center font-semibold">
                    Level {currentStage} / {totalStages}
                </div>
                <div className="text-zinc-400 text-center text-sm">
                    Moves: {moveCount} | Time: {timeElapsed}s
                </div>
            </CardFooter>
        </Card>
    );
};

export default MazeScreen;
