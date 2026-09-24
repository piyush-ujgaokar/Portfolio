import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0, // -1 to 1
    normalizedY: 0, // -1 to 1
  });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (event) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = event;
        const width = window.innerWidth;
        const height = window.innerHeight;

        setMousePosition({
          x: clientX,
          y: clientY,
          normalizedX: (clientX / width) * 2 - 1,
          normalizedY: -(clientY / height) * 2 + 1,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePosition;
};
