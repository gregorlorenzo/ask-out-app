export function generateMaze(width, height) {
    const maze = [];
    const visited = [];

    // Initialize maze and visited arrays
    for (let y = 0; y < height; y++) {
        maze[y] = [];
        visited[y] = [];
        for (let x = 0; x < width; x++) {
            maze[y][x] = { top: true, right: true, bottom: true, left: true };
            visited[y][x] = false;
        }
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function carvePassages(cx, cy) {
        visited[cy][cx] = true;
        const directions = ['N', 'S', 'E', 'W'];
        shuffle(directions);

        directions.forEach((direction) => {
            let nx = cx;
            let ny = cy;

            if (direction === 'N') ny -= 1;
            else if (direction === 'S') ny += 1;
            else if (direction === 'E') nx += 1;
            else if (direction === 'W') nx -= 1;

            if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny][nx]) {
                // Remove walls between current cell and next cell
                if (direction === 'N') {
                    maze[cy][cx].top = false;
                    maze[ny][nx].bottom = false;
                } else if (direction === 'S') {
                    maze[cy][cx].bottom = false;
                    maze[ny][nx].top = false;
                } else if (direction === 'E') {
                    maze[cy][cx].right = false;
                    maze[ny][nx].left = false;
                } else if (direction === 'W') {
                    maze[cy][cx].left = false;
                    maze[ny][nx].right = false;
                }
                carvePassages(nx, ny);
            }
        });
    }

    carvePassages(0, 0); // Start carving from the top-left corner

    return maze;
}
