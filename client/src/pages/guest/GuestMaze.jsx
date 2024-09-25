import React, { useState, useEffect } from 'react';
import { useMaze } from '@/hooks/useMaze';
import RetroMazeConsole from '@/components/guest/Maze/RetroMazeConsole';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { useGuestProgress } from '@/contexts/GuestProgressContext';

const GuestMaze = () => {
    const { updateProgress } = useGuestProgress();
    const { allStages, isLoading, error } = useMaze();
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isCompleted) {
            updateProgress({ hasCompletedMaze: true });
            setShowModal(true);
        }
    }, [isCompleted, updateProgress]);

    if (isLoading) return <div>Loading maze challenges...</div>;
    if (error) return <div>Error loading maze: {error.message}</div>;
    if (allStages.data.length === 0) return <div>No maze challenges available.</div>;

    const handleNextStage = () => {
        if (currentStageIndex < allStages.data.length - 1) {
            setCurrentStageIndex(currentStageIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleMazeComplete = () => {
        if (currentStageIndex === allStages.data.length - 1) {
            setIsCompleted(true);
        } else {
            handleNextStage();
        }
    };

    return (
        <>
            <div className="w-full max-w-2xl mx-auto mt-8">
                <RetroMazeConsole
                    stage={allStages.data[currentStageIndex]}
                    onComplete={handleMazeComplete}
                    currentStageIndex={currentStageIndex}
                    totalStages={allStages.data.length}
                />
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Maze Master!</DialogTitle>
                        <DialogDescription>
                            Congratulations! You've conquered all the maze challenges. Your spatial skills are truly impressive!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowModal(false)}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GuestMaze;