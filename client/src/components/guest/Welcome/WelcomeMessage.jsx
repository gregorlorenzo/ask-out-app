import React from 'react';
import { motion } from 'framer-motion';

export const WelcomeMessage = () => (
    <motion.p
        className="text-lg sm:text-xl mb-8 sm:mb-12 text-white max-w-md px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
    >
        Get ready for an unforgettable experience filled with excitement, challenges, and amazing prizes!
    </motion.p>
);