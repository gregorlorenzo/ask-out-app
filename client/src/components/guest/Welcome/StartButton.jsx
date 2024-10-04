import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { buttonHover } from '@/utils/animationVariants';

export const StartButton = ({ onClick }) => (
    <motion.div
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
        className="w-full sm:w-auto mt-2 sm:mt-4" 
    >
        <Button
            onClick={onClick}
            variant="primary"
            className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 bg-zinc-800 text-zinc-100 rounded-full text-base sm:text-lg font-semibold shadow transition-colors duration-300"
        >
            Let's Get Started!
        </Button>
    </motion.div>
);
