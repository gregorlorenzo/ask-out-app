import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import GuestHeader from './GuestHeader';

const GuestLayout = () => {
    return (
        <motion.div 
            className="guest-layout flex flex-col min-h-screen bg-gradient-to-b from-purple-400 to-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <GuestHeader />
            <main className="flex-grow flex items-center justify-center p-4">
                <Outlet />
            </main>
        </motion.div>
    );
};

export default GuestLayout;