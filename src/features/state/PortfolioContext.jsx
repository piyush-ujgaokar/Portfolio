import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default' | 'hover' | 'pointer' | 'text' | 'hidden'
  const [cursorText, setCursorText] = useState('');
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const setCursorHover = (text = '') => {
    setCursorVariant('hover');
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  const value = {
    soundEnabled,
    toggleSound,
    mobileMenuOpen,
    setMobileMenuOpen,
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorHover,
    resetCursor,
    activeProjectFilter,
    setActiveProjectFilter,
    prefersReducedMotion,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioState = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioState must be used within a PortfolioProvider');
  }
  return context;
};
