import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { WelcomeTitle } from './WelcomeTitle';
import { WelcomeMessage } from './WelcomeMessage';
import { StartButton } from './StartButton';

const Welcome = ({ onStartClick }) => {
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    const handleStartClick = () => {
        setIsConfettiActive(true);
        setTimeout(() => setIsConfettiActive(false), 5000);
        if (onStartClick) {
            onStartClick();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-purple-400 to-pink-500 p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {isConfettiActive && <Confetti />}
            <WelcomeTitle />
            <WelcomeMessage />
            <StartButton onClick={handleStartClick} />
        </motion.div>
    );
};

export default Welcome;