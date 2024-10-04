import React from 'react';
import { motion } from 'framer-motion';
import { ensureAbsoluteUrl, formatDate } from '@/utils/helpers';

export default function Slide({ slide }) {
  const formattedDate = formatDate(slide.date);

  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start h-auto md:h-[400px]"
    >
      <div className="w-full h-full overflow-hidden rounded-lg">
        <motion.img
          src={ensureAbsoluteUrl(slide.imageUrl)}
          alt={slide.title}
          className="object-cover w-full h-full max-w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <p className="text-sm text-zinc-300 mb-2">{formattedDate}</p>
        <h2 className="text-3xl font-bold mb-4 text-zinc-100 line-clamp-2">
          {slide.title}
        </h2>
        <div className="flex-grow overflow-auto">
          <p className="text-zinc-200 text-lg leading-relaxed">
            {slide.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
