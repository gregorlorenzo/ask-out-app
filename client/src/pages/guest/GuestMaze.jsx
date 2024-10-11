import React from 'react';
import MazeGame from '@/components/guest/Maze/MazeGame';
import { useMaze } from '@/hooks/useMaze';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animationVariants';
import { useGuestProgress } from '@/contexts/GuestProgressContext';
import { useNavigate } from '@tanstack/react-router';

const GuestMaze = () => {
    const { stages, isLoading, error } = useMaze();
    const { progress, updateProgress } = useGuestProgress();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <motion.div
                className="flex items-center justify-center p-4 sm:p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <div className="text-zinc-100 text-base sm:text-lg">Loading maze stages...</div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="flex items-center justify-center p-4 sm:p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <div className="text-red-500 text-base sm:text-lg">Error loading maze stages: {error.message}</div>
            </motion.div>
        );
    }

    const sortedStages = [...stages].sort((a, b) => a.number - b.number);

    const currentStage =
        sortedStages.find(stage => !progress[`hasCompletedStage${stage.number}`]) || sortedStages[0];

    if (!currentStage) {
        return (
            <motion.div
                className="flex items-center justify-center p-4 sm:p-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <div className="text-zinc-100 text-base sm:text-lg">No maze stages available.</div>
            </motion.div>
        );
    }

    const handleGameComplete = async (stageNumber) => {
        console.log(`Stage ${stageNumber} completed.`);
        await updateProgress({
            [`hasCompletedStage${stageNumber}`]: true,
            hasCompletedMaze: true
        });
        console.log('Progress updated, navigating to slideshow');
        navigate({ to: '/guest/slideshow' });
    };

    return (
        <motion.div
            className="flex flex-col items-center w-full h-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
        >
            <MazeGame
                width={currentStage.mazeSize.width}
                height={currentStage.mazeSize.height}
                stage={currentStage.number}
                totalStages={sortedStages.length}
                onComplete={handleGameComplete}
            />
        </motion.div>
    );
};

export default GuestMaze;