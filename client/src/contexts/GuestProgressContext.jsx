import React, { createContext, useContext, useState } from 'react';

const GuestProgressContext = createContext();

let currentProgress = {
    hasCompletedWelcome: false,
    hasCompletedQuiz: false,
    // hasCompletedMaze: false,
    hasCompletedSlideshow: false,
    hasCompletedLetter: false,
    hasCompletedAskOut: false,
};

export const GuestProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(currentProgress);

    // Modified to return a Promise
    const updateProgress = (newProgress) => {
        return new Promise((resolve) => {
            const updatedProgress = { ...progress, ...newProgress };
            setProgress(updatedProgress);
            currentProgress = updatedProgress;
            resolve();
        });
    };

    return (
        <GuestProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </GuestProgressContext.Provider>
    );
};

export const useGuestProgress = () => useContext(GuestProgressContext);

export const getGuestProgress = () => currentProgress;

export default GuestProgressContext;