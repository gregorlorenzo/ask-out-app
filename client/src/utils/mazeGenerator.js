export function generateMaze(height, width, difficulty) {
    // Ensure odd dimensions for proper maze generation
    height = height % 2 === 0 ? height + 1 : height;
    width = width % 2 === 0 ? width + 1 : width;

    const maze = Array(height).fill().map(() => Array(width).fill(1));
    const stack = [];
    const startY = 1;
    const startX = 1;

    function isValid(x, y) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    function getNeighbors(x, y) {
        const neighbors = [
            [x, y - 2], // Up
            [x + 2, y], // Right
            [x, y + 2], // Down
            [x - 2, y], // Left
        ];
        return neighbors.filter(([nx, ny]) => isValid(nx, ny) && maze[ny][nx] === 1);
    }

    function carve(x, y) {
        maze[y][x] = 0;
        const neighbors = getNeighbors(x, y);
        for (let i = neighbors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
        }
        for (const [nx, ny] of neighbors) {
            if (maze[ny][nx] === 1) {
                // Adjust the probability of carving based on difficulty
                let carveProb;
                switch (difficulty) {
                    case 'easy':
                        carveProb = 0.8;
                        break;
                    case 'medium':
                        carveProb = 0.6;
                        break;
                    case 'hard':
                        carveProb = 0.4;
                        break;
                    default:
                        carveProb = 0.6; // Default to medium
                }
                if (Math.random() < carveProb) {
                    maze[Math.floor((y + ny) / 2)][Math.floor((x + nx) / 2)] = 0;
                    carve(nx, ny);
                }
            }
        }
    }

    carve(startX, startY);

    // Set start and end points
    maze[startY][startX] = 2; // Start
    maze[height - 2][width - 2] = 3; // End

    // Add some random walls for harder difficulties
    if (difficulty === 'medium' || difficulty === 'hard') {
        const extraWalls = difficulty === 'medium' ? width : width * 2;
        for (let i = 0; i < extraWalls; i++) {
            const wx = Math.floor(Math.random() * (width - 2)) + 1;
            const wy = Math.floor(Math.random() * (height - 2)) + 1;
            if (maze[wy][wx] === 0) {
                maze[wy][wx] = 1;
            }
        }
    }

    return maze;
}