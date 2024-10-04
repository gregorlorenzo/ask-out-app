import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function AskOutActions({ onAccept, onDecline }) {
    return (
        <motion.div
            className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Button
                onClick={onAccept}
                variant="primary"
                className="flex items-center justify-center px-4 py-2 bg-zinc-600 text-zinc-100 hover:bg-zinc-500 border-none transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
                <ThumbsUp className="mr-2 h-5 w-5" />
                Yes! 💖
            </Button>
            <Button
                onClick={onDecline}
                variant="secondary"
                className="flex items-center justify-center px-4 py-2 bg-zinc-600 text-zinc-100 hover:bg-zinc-500 border-none transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
                <ThumbsDown className="mr-2 h-5 w-5" />
                Maybe Later 😅
            </Button>
        </motion.div>
    );
}