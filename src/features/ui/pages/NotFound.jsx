import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';
import { KineticHeadline } from '../components/KineticHeadline';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const NotFound = () => {
  const navigate = useNavigate();
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
        <AlertTriangle size={14} className="text-[#8C8A82]" />
        <span>ERROR 404 // COORDINATES UNRESOLVED</span>
      </div>

      <div className="relative">
        <div className="text-8xl sm:text-9xl font-sans font-black text-[#E8E5DC] select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <KineticHeadline
            text="PAGE NOT FOUND"
            highlightWord="NOT"
            className="text-2xl sm:text-4xl justify-center font-sans font-bold text-[#1E1E1C]"
          />
        </div>
      </div>

      <p className="text-[#6E6E6A] text-sm sm:text-base max-w-md mx-auto leading-relaxed font-body">
        The route you are navigating to has either been deprecated, refactored, or does not exist on this portfolio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => {
            playClick();
            navigate('/');
          }}
          onMouseEnter={() => {
            playHover();
            setCursorHover('HOME');
          }}
          onMouseLeave={resetCursor}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all shadow-sm"
        >
          <Home size={15} />
          <span>RETURN TO HOME</span>
        </button>

        <button
          onClick={() => {
            playClick();
            navigate(-1);
          }}
          onMouseEnter={() => {
            playHover();
            setCursorHover('BACK');
          }}
          onMouseLeave={resetCursor}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-[#1E1E1C] bg-white border border-[#E8E5DC] hover:border-[#1E1E1C] transition-all shadow-pill"
        >
          <ArrowLeft size={15} />
          <span>PREVIOUS PAGE</span>
        </button>
      </div>
    </div>
  );
};
