import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { WelcomeTitle } from './WelcomeTitle';
import { WelcomeMessage } from './WelcomeMessage';
import { StartButton } from './StartButton';
import { fadeIn } from '@/utils/animationVariants';
import { useWindowSize } from '@/hooks/useWindowSize';

const Welcome = ({ onStartClick }) => {
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const { width, height } = useWindowSize();

    const handleStartClick = () => {
        setIsConfettiActive(true);
        setTimeout(() => setIsConfettiActive(false), 5000);
        if (onStartClick) {
            onStartClick();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full bg-zinc-900 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center overflow-hidden relative box-border"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            {isConfettiActive && (
                <Confetti
                    width={width}
                    height={height}
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                />
            )}
            <div className="flex flex-col items-center justify-center w-full">
                <WelcomeTitle />
                <WelcomeMessage />
                <StartButton onClick={handleStartClick} />
            </div>
        </motion.div>
    );
};

export default Welcome;
