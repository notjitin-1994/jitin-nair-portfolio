'use client';

import { motion } from 'framer-motion';

export type PixelLetter = number[][];

interface PixelBannerProps {
  letters: PixelLetter[];
  colors?: string[];
  badgeText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const DEFAULT_COLORS = ['#22d3ee', '#14b8a6', '#2dd4bf', '#22d3ee'];

export function PixelBanner({ letters, colors = DEFAULT_COLORS, badgeText, size = 'md' }: PixelBannerProps) {
  const pixelSize = size === 'sm' ? '3px' : size === 'md' ? '4px' : '5px';
  const gap = size === 'sm' ? '1.5px' : size === 'md' ? '2px' : '3px';

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6 items-end">
      {letters.map((letter, letterIndex) => (
        <motion.div
          key={letterIndex}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${letter[0].length}, ${pixelSize})`,
            gridTemplateRows: `repeat(${letter.length}, ${pixelSize})`,
            gap: gap,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: letterIndex * 0.08 }}
        >
          {letter.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={pixel ? 'rounded-full' : ''}
                style={{ width: pixelSize, height: pixelSize }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: pixel ? 1 : 0,
                  scale: pixel ? 1 : 0,
                  backgroundColor: pixel
                    ? colors
                    : 'transparent',
                }}
                transition={{
                  opacity: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.1 },
                  scale: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.2 },
                  backgroundColor: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: letterIndex * 0.2,
                  },
                }}
              />
            ))
          )}
        </motion.div>
      ))}
      
      {badgeText && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="flex items-end mb-1"
        >
          <span className="px-2 py-0.5 rounded bg-cyan-500 text-[10px] font-black tracking-tighter text-[#0a0a0f] uppercase">
            {badgeText}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default PixelBanner;