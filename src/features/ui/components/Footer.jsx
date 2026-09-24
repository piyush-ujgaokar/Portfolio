import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../../api/portfolioData';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const Footer = () => {
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-[#E8E5DC] bg-[#F5F2EA] overflow-hidden">
      {/* Editorial Infinite Ticker */}
      <div className="relative py-4 border-b border-[#E8E5DC] bg-[#FFFFFF] overflow-hidden select-none">
        <div className="flex w-max animate-marquee space-x-8 font-sans font-extrabold text-sm tracking-[0.2em] uppercase text-[#1E1E1C]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 shrink-0">
              <span>PIYUSH UJGAOKAR</span>
              <span className="text-[#8C8A82]">✦</span>
              <span>FULL STACK DEVELOPER</span>
              <span className="text-[#8C8A82]">✦</span>
              <span>MERN + AI INTEGRATIONS</span>
              <span className="text-[#8C8A82]">✦</span>
              <span className="text-emerald-600">OPEN TO WORK</span>
              <span className="text-[#8C8A82]">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Col 1: Bio & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E1E1C] flex items-center justify-center font-mono font-bold text-xs text-[#F5F2EA]">
                PU
              </div>
              <span className="font-sans font-bold text-xl text-[#1E1E1C]">Piyush Ujgaokar</span>
            </div>
            <p className="text-[#6E6E6A] text-sm max-w-md leading-relaxed">
              Full Stack Web Developer crafting scalable MERN applications with real-time Socket.io channels, Gemini AI integrations, and tactile editorial design.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
                <MapPin size={13} className="text-[#6E6E6A]" />
                <span>Nagpur, India</span>
                <span className="text-[#8C8A82]">|</span>
                <span className="font-semibold text-[#1E1E1C]">{time} IST</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8C8A82]">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'Skills & Stack', path: '/skills' },
                { name: 'About & Story', path: '/about' },
                { name: 'Contact & Inquiries', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onMouseEnter={() => {
                      playHover();
                      setCursorHover(link.name);
                    }}
                    onMouseLeave={resetCursor}
                    className="text-[#6E6E6A] hover:text-[#1E1E1C] font-medium transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8C8A82]">Connect</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('GITHUB');
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-2 text-[#6E6E6A] hover:text-[#1E1E1C] font-medium transition-colors"
              >
                <GithubIcon size={15} />
                <span>github.com/piyush-ujgaokar</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('LINKEDIN');
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-2 text-[#6E6E6A] hover:text-[#1E1E1C] font-medium transition-colors"
              >
                <LinkedinIcon size={15} />
                <span>linkedin.com/in/piyush-ujgaokar</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.email}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('EMAIL');
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-2 text-[#6E6E6A] hover:text-[#1E1E1C] font-medium transition-colors"
              >
                <Mail size={15} />
                <span>piyushuj@gmail.com</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.phone}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('CALL');
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-2 text-[#6E6E6A] hover:text-[#1E1E1C] font-medium transition-colors"
              >
                <Phone size={15} />
                <span>+91-9822070357</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E8E5DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8C8A82] font-mono text-center sm:text-left">
            © {new Date().getFullYear()} Piyush Ujgaokar. Handcrafted with React 19 & 4-Layer Architecture.
          </p>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => {
              playHover();
              setCursorHover('TOP');
            }}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] hover:border-[#1E1E1C] transition-all shadow-pill"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
