import React from 'react';
import { formatDate } from '@/utils/helpers';

const LetterHeader = ({ date, title }) => {
    const formattedDate = formatDate(date);

    return (
        <div className="mb-6">
            <p className="text-right text-gray-600 italic">{formattedDate}</p>
            <h1 className="text-3xl font-serif font-semibold text-gray-800 mt-2">{title}</h1>
            <hr className="mt-4 border-gray-300" />
        </div>
    );
};

export default LetterHeader;
