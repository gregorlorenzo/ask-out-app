import React, { createContext, useContext, useState } from 'react';

const GuestProgressContext = createContext();

let currentProgress = {
    hasCompletedWelcome: false,
    hasCompletedQuiz: false,
};

export const GuestProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(currentProgress);

    const updateProgress = (newProgress) => {
        const updatedProgress = { ...progress, ...newProgress };
        setProgress(updatedProgress);
        currentProgress = updatedProgress;
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