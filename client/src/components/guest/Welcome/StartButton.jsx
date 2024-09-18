import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const StartButton = ({ onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Button
            onClick={onClick}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-400 text-purple-800 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:bg-yellow-300 transition-colors duration-300"
        >
            Let's Get Started!
        </Button>
    </motion.div>
);