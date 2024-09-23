import React from 'react';
import { Flag, Trophy, Circle } from 'lucide-react';

const MazeGrid = ({ maze, playerPosition }) => {
    if (!maze) return null;

    const getCellStyle = (cellValue) => {
        const baseStyle = {
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        switch (cellValue) {
            case 0: return { ...baseStyle, background: 'linear-gradient(145deg, #f0f0f0, #e6e6e6)' }; // Empty
            case 1: return { ...baseStyle, background: 'linear-gradient(145deg, #2c3e50, #34495e)' }; // Wall
            case 2: return { ...baseStyle, background: '#4CAF50' }; // Start
            case 3: return { ...baseStyle, background: '#F44336' }; // End
            default: return baseStyle;
        }
    };

    return (
        <div className="maze-grid" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${maze[0].length}, 1fr)`,
            gap: '2px',
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            {maze.map((row, y) =>
                row.map((cell, x) => (
                    <div
                        key={`${x}-${y}`}
                        style={getCellStyle(cell)}
                    >
                        {cell === 2 && <Flag size={20} color="white" />}
                        {cell === 3 && <Trophy size={20} color="white" />}
                        {x === playerPosition.x && y === playerPosition.y && (
                            <Circle size={20} fill="#3498db" color="#3498db" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MazeGrid;