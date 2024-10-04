import React from 'react';
import { formatDate } from '@/utils/helpers';
import { motion } from 'framer-motion';

const LetterHeader = ({ date, title }) => {
    const formattedDate = formatDate(date);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
        >
            <p className="text-right text-zinc-400 italic">{formattedDate}</p>
            <h1 className="text-3xl font-serif font-semibold text-zinc-100 mt-2">{title}</h1>
            <hr className="mt-4 border-zinc-500" />
        </motion.div>
    );
};

export default LetterHeader;
