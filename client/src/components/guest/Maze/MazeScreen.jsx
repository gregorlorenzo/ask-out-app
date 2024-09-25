import React from 'react';

const MazeScreen = ({ maze, playerPosition, currentStage, totalStages, moveCount, timeElapsed }) => {
    return (
        <div className="bg-green-100 p-4 rounded-lg mb-4 w-full aspect-square max-w-md mx-auto">
            <div className="grid gap-px bg-green-200 w-full h-full" style={{
                gridTemplateColumns: `repeat(${maze[0]?.length || 1}, 1fr)`,
                gridTemplateRows: `repeat(${maze.length || 1}, 1fr)`
            }}>
                {maze.map((row, y) =>
                    row.map((cell, x) => (
                        <div
                            key={`${x}-${y}`}
                            className={`
                                ${x === playerPosition.x && y === playerPosition.y
                                    ? 'bg-red-500 animate-pulse'
                                    : cell === 0
                                        ? 'bg-green-100'
                                        : cell === 1
                                            ? 'bg-green-900'
                                            : cell === 2
                                                ? 'bg-blue-500'
                                                : 'bg-yellow-500'
                                }
                                w-full h-full rounded-sm
                            `}
                        />
                    ))
                )}
            </div>
            <div className="text-green-700 text-center mt-2 font-semibold">
                Level {currentStage} / {totalStages}
            </div>
            <div className="text-green-600 text-center text-sm">
                Moves: {moveCount} | Time: {timeElapsed}s
            </div>
        </div>
    );
};

export default MazeScreen;