import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Laugh } from 'lucide-react';

export default function AskOutMessage({ isAccepted, isDeclined }) {
    const messageVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
    };

    if (isAccepted) {
        return (
            <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <Heart className="mx-auto mb-4 text-zinc-500 animate-pulse" size={48} />
                <h1 className="text-2xl font-bold text-zinc-100">Yay! 💖</h1>
                <p className="mt-2 text-lg text-zinc-300">
                    I'm thrilled to be your girlfriend! 😄
                </p>
            </motion.div>
        );
    }

    if (isDeclined) {
        return (
            <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <Laugh className="mx-auto mb-4 text-zinc-500 animate-bounce" size={48} />
                <h1 className="text-2xl font-bold text-zinc-100">Oh no! 😢</h1>
                <p className="mt-2 text-lg text-zinc-300">
                    Maybe next time! Let's stay awesome friends. 😊
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <Heart className="mx-auto mb-4 text-zinc-500" size={48} />
            <h1 className="text-2xl font-bold text-zinc-100">Will you be my girlfriend? 💕</h1>
            <p className="mt-2 text-lg text-zinc-300">
                I promise to make you smile every day! 😊
            </p>
        </motion.div>
    );
}