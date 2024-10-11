import React from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';

const LetterBody = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const parsedContent = parse(sanitizedContent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      tabIndex="0"
      className="letter-body mb-6 text-zinc-300 leading-relaxed overflow-y-auto focus:outline-none"
      style={{
        whiteSpace: 'pre-wrap',
        maxHeight: '60vh', // Adjust as needed
      }}
    >
      {parsedContent}
    </motion.div>
  );
};

export default LetterBody;
