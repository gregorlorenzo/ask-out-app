import React from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import GuestHeader from './GuestHeader';
import { fadeIn } from '@/utils/animationVariants';

const GuestLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100">
            <GuestHeader />
            <main className="flex-grow flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-4xl">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={location.pathname}
                            variants={fadeIn}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default GuestLayout;