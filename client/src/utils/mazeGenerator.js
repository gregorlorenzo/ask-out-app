export function generateMaze(width, height, difficulty) {
    // Ensure dimensions are odd numbers
    width = width % 2 === 0 ? width - 1 : width;
    height = height % 2 === 0 ? height - 1 : height;

    // Initialize maze grid with walls
    const maze = Array.from({ length: height }, () => Array(width).fill(1));

    // Starting cell
    const startX = 1;
    const startY = 1;

    // Possible directions
    const directions = [
        { x: 0, y: -1 }, // Up
        { x: 1, y: 0 },  // Right
        { x: 0, y: 1 },  // Down
        { x: -1, y: 0 }  // Left
    ];

    // Check if cell is within bounds
    function isInBounds(x, y) {
        return x > 0 && x < width - 1 && y > 0 && y < height - 1;
    }

    // Shuffle directions based on difficulty
    function shuffle(array) {
        if (difficulty === 'easy') {
            // For easy difficulty, bias towards certain directions
            // For example, prefer right and down to create longer corridors
            return array.sort((a, b) => {
                if ((a.x === 1 && a.y === 0) || (a.x === 0 && a.y === 1)) return -1;
                return 1;
            });
        } else if (difficulty === 'medium') {
            // Medium difficulty uses standard random shuffling
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        } else if (difficulty === 'hard') {
            // Hard difficulty maximizes randomness
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array;
    }

    // Recursive function to carve passages
    function carvePassagesFrom(x, y) {
        maze[y][x] = 0; // Mark cell as passage

        let dirs = [...directions];

        // Shuffle directions
        dirs = shuffle(dirs);

        for (const dir of dirs) {
            const nx = x + dir.x * 2;
            const ny = y + dir.y * 2;

            if (isInBounds(nx, ny) && maze[ny][nx] === 1) {
                maze[y + dir.y][x + dir.x] = 0; // Remove wall between cells
                carvePassagesFrom(nx, ny);      // Recurse
            }
        }
    }

    // Start maze generation
    carvePassagesFrom(startX, startY);

    // Set entrance and exit
    maze[startY][startX] = 2; // Start point
    maze[height - 2][width - 2] = 3; // End point

    return maze;
}
