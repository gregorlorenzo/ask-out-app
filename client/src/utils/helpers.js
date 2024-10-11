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

export function formatDate(isoDate, options = {}, locale = 'en-US') {
    if (!isoDate) return 'Invalid Date';

    const dateObject = new Date(isoDate);
    if (isNaN(dateObject.getTime())) {
        return 'Invalid Date';
    }

    // Default options if none are provided
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Use provided options or default options
    const formatOptions = Object.keys(options).length ? options : defaultOptions;

    return dateObject.toLocaleDateString(locale, formatOptions);
}

export function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}