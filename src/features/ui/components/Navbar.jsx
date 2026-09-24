import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, mobileMenuOpen, setMobileMenuOpen, setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <NavLink
          to="/"
          onMouseEnter={() => {
            playHover();
            setCursorHover('PIYUSH');
          }}
          onMouseLeave={resetCursor}
          onClick={playClick}
          className="group relative flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-[#E8E5DC] shadow-pill hover:border-[#8C8A82] transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1E1E1C] flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider">
            PU
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-tight text-[#1E1E1C] flex items-center gap-1.5">
              Piyush Ujgaokar
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" title="Available for hire" />
            </span>
            <span className="text-[11px] font-mono text-[#8C8A82] tracking-wide">
              Full Stack • MERN & AI
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E5DC] shadow-pill">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover(link.name);
                }}
                onMouseLeave={resetCursor}
                onClick={playClick}
                className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full bg-[#1E1E1C] shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-[#F5F2EA]' : 'text-[#6E6E6A] hover:text-[#1E1E1C]'}`}>
                  {link.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Group: Sound Toggle + CTA + Hamburger */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playClick();
            }}
            onMouseEnter={() => {
              playHover();
              setCursorHover('AUDIO');
            }}
            onMouseLeave={resetCursor}
            aria-label={soundEnabled ? 'Disable UI sound' : 'Enable UI sound'}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2.5 rounded-full bg-white border transition-all duration-200 shadow-pill ${
              soundEnabled
                ? 'border-[#1E1E1C] text-[#1E1E1C]'
                : 'border-[#E8E5DC] text-[#8C8A82] hover:text-[#1E1E1C]'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={() => {
              playClick();
              navigate('/contact');
            }}
            onMouseEnter={() => {
              playHover();
              setCursorHover('CONTACT');
            }}
            onMouseLeave={resetCursor}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-full bg-white border border-[#E8E5DC] text-[#1E1E1C] shadow-pill"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 p-4 rounded-3xl bg-white border border-[#E8E5DC] shadow-elevated pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      playClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1E1E1C] text-[#F5F2EA]'
                        : 'text-[#6E6E6A] hover:bg-[#F5F2EA] hover:text-[#1E1E1C]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={15} />
                  </NavLink>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#E8E5DC] flex items-center justify-between text-xs font-mono text-[#8C8A82]">
                <span>STATUS: AVAILABLE</span>
                <span>NAGPUR, INDIA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
