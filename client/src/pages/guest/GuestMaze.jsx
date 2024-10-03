import React, { useState, useCallback } from 'react';
import { useMaze } from '@/hooks/useMaze';
import RetroMazeConsole from '@/components/guest/Maze/RetroMazeConsole';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { useNavigate } from '@tanstack/react-router';

const GuestMaze = () => {
    const navigate = useNavigate();
    const { updateProgress } = useGuestProgress();
    const { allStages, isLoading, error } = useMaze();
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    const handleMazeComplete = useCallback(() => {
        if (allStages.data && currentStageIndex < allStages.data.length - 1) {
            setCurrentStageIndex(prevIndex => prevIndex + 1);
        } else {
            updateProgress({ hasCompletedMaze: true });
        }
    }, [currentStageIndex, allStages, updateProgress]);

    const handleContinue = useCallback(() => {
        navigate({ to: '/guest/slideshow' });
    }, [navigate]);

    if (isLoading) return <div>Loading maze challenges...</div>;
    if (error) return <div>Error loading maze: {error.message}</div>;
    if (!allStages.data || allStages.data.length === 0) return <div>No maze challenges available.</div>;

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <RetroMazeConsole
                stage={allStages.data[currentStageIndex]}
                onComplete={handleMazeComplete}
                onContinue={handleContinue}
                currentStageIndex={currentStageIndex}
                totalStages={allStages.data.length}
            />
        </div>
    );
};

export default GuestMaze;