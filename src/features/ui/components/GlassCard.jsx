import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  tiltEnabled = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeaveInner = (e) => {
    setRotateX(0);
    setRotateY(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeaveInner}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative rounded-3xl bg-[#FFFFFF] border border-[#E8E5DC] shadow-card hover:shadow-card-hover hover:border-[#8C8A82]/50 transition-all duration-300 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
