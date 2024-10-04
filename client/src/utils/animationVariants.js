export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export const slideDown = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export const buttonHover = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
};

export const scaleFade = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

