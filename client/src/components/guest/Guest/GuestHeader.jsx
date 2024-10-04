import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animationVariants';

const GuestHeader = () => {
    const { logout } = useAuth();

    return (
        <motion.header
            className="flex justify-end p-4 bg-zinc-950"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
        >
            <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-300"
                aria-label="Logout"
            >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Logout
            </Button>
        </motion.header>
    );
};

export default GuestHeader;
