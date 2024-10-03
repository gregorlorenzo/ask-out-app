import React from 'react';

const LetterBody = ({ content }) => {
    return (
        <div
            className="mb-6 text-gray-700 leading-relaxed"
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default LetterBody;
