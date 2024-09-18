import React from 'react';
import { motion } from 'framer-motion';

export const WelcomeTitle = () => (
    <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-white px-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
    >
        Welcome to the Ultimate Game Show!
    </motion.h1>
);