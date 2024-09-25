export function generateMaze(height, width) {
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
                maze[Math.floor((y + ny) / 2)][Math.floor((x + nx) / 2)] = 0;
                carve(nx, ny);
            }
        }
    }

    carve(startX, startY);

    // Set start and end points
    maze[startY][startX] = 2; // Start
    maze[height - 2][width - 2] = 3; // End

    return maze;
}