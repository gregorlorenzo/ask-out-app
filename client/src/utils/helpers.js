export function ensureAbsoluteUrl(url) {
    if (!url) return url;

    // If it's already an absolute URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // If it's a protocol-relative URL, prepend the current protocol
    if (url.startsWith('//')) {
        return `${window.location.protocol}${url}`;
    }

    // If it's a relative URL, make it absolute
    const baseUrl = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
    return new URL(url, baseUrl).href;
}

export function getFileNameFromUrl(url) {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
}

// Slideshow utility functions
export function createNewSlideshow(slides, createSlideshow, toast) {
    const newSlides = slides
        .filter(slide => slide && slide._id)
        .map((slide, index) => ({
            id: slide._id,
            position: index + 1
        }));

    if (newSlides.length > 0) {
        createSlideshow(
            { slides: newSlides },
            {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Slideshow created successfully",
                    });
                },
                onError: (error) => {
                    toast({
                        title: "Error",
                        description: `Error creating slideshow: ${error.message}`,
                        variant: "destructive",
                    });
                }
            }
        );
    }
}

export function updateSlideshowPositions(slides, updateSlideshow, toast) {
    const updatedSlides = slides
        .filter(slide => slide && slide._id)
        .map((slide, index) => ({
            id: slide._id,
            position: index + 1
        }));

    if (updatedSlides.length > 0) {
        updateSlideshow(
            { slides: updatedSlides },
            {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Slideshow updated successfully",
                    });
                },
                onError: (error) => {
                    toast({
                        title: "Error",
                        description: `Error updating slideshow: ${error.message}`,
                        variant: "destructive",
                    });
                }
            }
        );
    }
}

export function deleteSlideshowIfEmpty(deleteSlideshow, toast) {
    deleteSlideshow(
        {},
        {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Empty slideshow deleted successfully",
                });
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description: `Error deleting empty slideshow: ${error.message}`,
                    variant: "destructive",
                });
            }
        }
    );
}

export function generateMaze(width, height) {
    const maze = initializeMaze(width, height);
    generateMazePath(maze, 1, 1);

    // Set start and end points
    maze[1][1] = 2; // Start
    maze[height - 2][width - 2] = 3; // End

    return maze;
}

function initializeMaze(width, height) {
    return Array(height).fill().map(() => Array(width).fill(1));
}

function generateMazePath(maze, x, y) {
    const directions = [
        [0, -1], [1, 0], [0, 1], [-1, 0]
    ].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if (isValidCell(maze, nx, ny)) {
            maze[y + dy][x + dx] = 0;
            maze[ny][nx] = 0;
            generateMazePath(maze, nx, ny);
        }
    }
}

function isValidCell(maze, x, y) {
    return x > 0 && y > 0 && x < maze[0].length - 1 && y < maze.length - 1 && maze[y][x] === 1;
}