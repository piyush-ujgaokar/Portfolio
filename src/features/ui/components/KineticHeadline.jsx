import React from 'react';
import { motion } from 'framer-motion';

export const KineticHeadline = ({
  text,
  className = '',
  outline = false,
  highlightWord = '',
  as = 'h1',
  staggerDelay = 0.03,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: 0.08 * i },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 160,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`font-sans font-extrabold tracking-tight flex flex-wrap gap-x-3 gap-y-1 text-[#1E1E1C] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span key={wordIndex} className="inline-flex overflow-hidden py-0.5">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={childVariants}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 450 },
                }}
                className={`inline-block cursor-default select-none transition-colors ${
                  outline
                    ? 'text-outline hover:text-[#1E1E1C]'
                    : isHighlight
                    ? 'text-[#1E1E1C] font-black'
                    : 'text-[#1E1E1C]'
                }`}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Component>
  );
};
