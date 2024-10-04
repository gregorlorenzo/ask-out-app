import React from 'react';
import { motion } from 'framer-motion';
import { slideDown } from '@/utils/animationVariants';

export const WelcomeTitle = () => (
    <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-4 lg:mb-6 text-zinc-100 px-2 sm:px-4"
        variants={slideDown}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
    >
        Welcome to the Ultimate Game Show!
    </motion.h1>
);
