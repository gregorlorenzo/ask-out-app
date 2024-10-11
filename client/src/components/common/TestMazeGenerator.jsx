import React, { useEffect } from 'react';
import { generateMaze } from '@/utils/mazeGenerator';

const TestMazeGenerator = () => {
    useEffect(() => {
        const width = 10;
        const height = 10;
        const maze = generateMaze(width, height);
        console.log('Generated Maze:', maze);

        // Simple verification
        if (maze.length !== height) {
            console.error('Maze height mismatch!');
        }

        for (let row of maze) {
            if (row.length !== width) {
                console.error('Maze width mismatch!');
            }
            for (let cell of row) {
                if (!cell.walls) {
                    console.error(`Cell at (${cell.row}, ${cell.col}) is missing walls.`);
                }
            }
        }

        console.log('Maze generation test completed.');
    }, []);

    return <div>Check the console for maze generation logs.</div>;
};

export default TestMazeGenerator;