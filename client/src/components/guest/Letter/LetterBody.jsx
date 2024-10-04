import React from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

const LetterBody = ({ content }) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 text-zinc-300 leading-relaxed overflow-auto"
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default LetterBody;
