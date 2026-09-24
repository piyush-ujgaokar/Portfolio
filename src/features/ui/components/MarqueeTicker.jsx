import React from 'react';

export const MarqueeTicker = ({
  items = [],
  speed = 'normal', // 'slow' | 'normal' | 'fast'
  direction = 'left',
  className = '',
}) => {
  const speedClass =
    speed === 'slow'
      ? 'duration-[40s]'
      : speed === 'fast'
      ? 'duration-[16s]'
      : 'duration-[25s]';

  const animClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';

  return (
    <div className={`relative overflow-hidden py-3 select-none flex ${className}`}>
      <div className={`flex w-max shrink-0 items-center space-x-6 ${animClass} hover:[animation-play-state:paused]`}>
        {items.map((item, index) => (
          <div key={`m1-${index}`} className="flex items-center space-x-6 shrink-0">
            <span className="font-display font-bold text-sm tracking-wider uppercase text-gray-300 hover:text-accentCyan transition-colors">
              {item}
            </span>
            <span className="text-accentViolet text-xs">✦</span>
          </div>
        ))}
      </div>
      <div className={`flex w-max shrink-0 items-center space-x-6 ${animClass} hover:[animation-play-state:paused]`} aria-hidden="true">
        {items.map((item, index) => (
          <div key={`m2-${index}`} className="flex items-center space-x-6 shrink-0">
            <span className="font-display font-bold text-sm tracking-wider uppercase text-gray-300 hover:text-accentCyan transition-colors">
              {item}
            </span>
            <span className="text-accentViolet text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
