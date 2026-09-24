import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioState } from '../../state/PortfolioContext';

export const CustomCursor = () => {
  const { cursorVariant, cursorText, prefersReducedMotion } = usePortfolioState();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      width: 10,
      height: 10,
      backgroundColor: '#1E1E1C',
      transition: { type: 'spring', damping: 25, stiffness: 450, mass: 0.1 },
    },
    hover: {
      x: mousePosition.x - 34,
      y: mousePosition.y - 34,
      width: 68,
      height: 68,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1.5px solid #1E1E1C',
      boxShadow: '0 8px 24px rgba(30, 30, 28, 0.12)',
      transition: { type: 'spring', damping: 22, stiffness: 320 },
    },
  };

  const trailVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: 'spring', damping: 28, stiffness: 220, mass: 0.5 },
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 1.15,
      borderColor: 'rgba(140, 138, 130, 0.5)',
      transition: { type: 'spring', damping: 25, stiffness: 220, mass: 0.5 },
    },
  };

  return (
    <>
      {/* Outer follow-ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-[#8C8A82]/40 w-8 h-8"
        animate={cursorVariant}
        variants={trailVariants}
      />

      {/* Main Cursor Core */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full flex items-center justify-center font-mono text-[9px] font-bold text-[#1E1E1C] tracking-wider uppercase"
        animate={cursorVariant}
        variants={variants}
      >
        {cursorVariant === 'hover' && cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-[#1E1E1C]">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
