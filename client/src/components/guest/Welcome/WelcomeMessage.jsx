import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animationVariants';

export const WelcomeMessage = () => (
    <motion.p
        className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 text-zinc-300 max-w-lg px-2 sm:px-4 lg:px-6"
        variants={slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
        Get ready for an unforgettable experience filled with excitement, challenges, and amazing prizes!
    </motion.p>
);
