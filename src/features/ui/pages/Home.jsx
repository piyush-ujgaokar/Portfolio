import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, COMPACT_SKILLS } from '../../api/portfolioData';
import { KineticHeadline } from '../components/KineticHeadline';
import { HeroWorkstationDeck } from '../components/HeroWorkstationDeck';
import { KineticKnot3D } from '../three/KineticKnot3D';
import { ProjectCard } from '../components/ProjectCard';
import { GlassCard } from '../components/GlassCard';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const Home = () => {
  const navigate = useNavigate();
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const [heroCenterpiece, setHeroCenterpiece] = useState('3d');

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH WORKSTATION DECK & KINETIC TYPOGRAPHY */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Kinetic Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E5DC] shadow-pill text-xs font-mono text-[#1E1E1C]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AVAILABLE FOR FULL-TIME ROLES & CONTRACTS</span>
            </motion.div>

            {/* Giant Kinetic Name */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C8A82] mb-2 font-medium">
                ENGINEERING & ARCHITECTURE
              </p>
              <KineticHeadline
                text="PIYUSH UJGAOKAR"
                highlightWord="PIYUSH"
                className="text-4xl sm:text-6xl xl:text-7xl font-sans font-extrabold leading-[1.05]"
              />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-semibold text-[#6E6E6A] mt-3 flex items-center flex-wrap gap-2">
                <span>Full Stack Developer</span>
                <span className="text-[#8C8A82]">✦</span>
                <span className="text-[#1E1E1C] font-bold">
                  MERN + AI Integrations
                </span>
              </h2>
            </div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#6E6E6A] text-base sm:text-lg max-w-xl leading-relaxed font-body"
            >
              Crafting production-grade web applications with scalable <strong className="text-[#1E1E1C] font-semibold">4-layer React architecture</strong>, real-time <strong className="text-[#1E1E1C] font-semibold">Socket.io</strong> channels, and state-of-the-art <strong className="text-[#1E1E1C] font-semibold">Gemini AI</strong> automations.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* Explore Projects Button */}
              <button
                onClick={() => {
                  playClick();
                  navigate('/projects');
                }}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('WORK');
                }}
                onMouseLeave={resetCursor}
                className="group flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Contact Me Button */}
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
                className="group flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-[#1E1E1C] bg-white border border-[#E8E5DC] hover:border-[#1E1E1C] transition-all duration-200 hover:scale-105 active:scale-95 shadow-pill"
              >
                <span>GET IN TOUCH</span>
              </button>

              {/* View Resume Button */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                onClick={playClick}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('RESUME');
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-mono text-[#6E6E6A] hover:text-[#1E1E1C] transition-colors"
                title="Download Piyush's Official Resume"
              >
                <Download size={14} />
                <span>RESUME.PDF</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Kinetic Model Centerpiece (5 cols) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center relative">
            {/* Centerpiece Mode Switcher */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#E8E5DC] shadow-pill">
                <button
                  onClick={() => {
                    playClick();
                    setHeroCenterpiece('3d');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                    heroCenterpiece === '3d'
                      ? 'bg-[#1E1E1C] text-[#F5F2EA] font-semibold shadow-sm'
                      : 'text-[#8C8A82] hover:text-[#1E1E1C]'
                  }`}
                >
                  ✦ 3D KINETIC KNOT
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setHeroCenterpiece('deck');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                    heroCenterpiece === 'deck'
                      ? 'bg-[#1E1E1C] text-[#F5F2EA] font-semibold shadow-sm'
                      : 'text-[#8C8A82] hover:text-[#1E1E1C]'
                  }`}
                >
                  WORKSTATION DECK
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#8C8A82] hidden sm:inline">
                {heroCenterpiece === '3d' ? 'CODROPS 3D WEBGL' : 'LIVE 4-LAYER CORE'}
              </span>
            </div>

            {/* Dynamic View: 3D Kinetic Knot by default, or Workstation Deck */}
            {heroCenterpiece === '3d' ? (
              <KineticKnot3D />
            ) : (
              <HeroWorkstationDeck />
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-[#E8E5DC]">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <GlassCard
              key={i}
              className="p-5 text-center transition-all"
            >
              <div className="font-sans font-extrabold text-2xl sm:text-3xl text-[#1E1E1C]">
                {stat.value}
                <span className="text-[#8C8A82] text-lg font-normal">{stat.suffix}</span>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] mt-1">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. COMPACT SKILLS STRIP */}
      {/* ========================================================================= */}
      <section className="border-y border-[#E8E5DC] py-6 bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C8A82] shrink-0 font-semibold">
            <Cpu size={15} className="text-[#1E1E1C]" />
            <span>PRIMARY TECH STACK:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {COMPACT_SKILLS.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] hover:border-[#8C8A82] transition-all"
              >
                {skill}
              </span>
            ))}
            <button
              onClick={() => {
                playClick();
                navigate('/skills');
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#1E1E1C] bg-[#E8E5DC] hover:bg-[#8C8A82] hover:text-white transition-all flex items-center gap-1 font-semibold"
            >
              <span>View All 24+</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED PROJECTS SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C8A82] mb-1.5 font-semibold">
              <span>SELECTED CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#1E1E1C] tracking-tight">
              Production Work
            </h2>
          </div>

          <button
            onClick={() => {
              playClick();
              navigate('/projects');
            }}
            onMouseEnter={() => {
              playHover();
              setCursorHover('ALL WORK');
            }}
            onMouseLeave={resetCursor}
            className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1E1E1C] hover:text-[#6E6E6A] transition-colors"
          >
            <span>VIEW ALL PROJECTS ({PROJECTS.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. REACT 4-LAYER ARCHITECTURE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C]">
              <Terminal size={14} />
              <span>ENGINEERING BLUEPRINT</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#1E1E1C] tracking-tight">
              Scalable 4-Layer React Architecture
            </h3>

            <p className="text-[#6E6E6A] text-sm sm:text-base leading-relaxed font-body">
              Every codebase is built with strict separation of concerns, ensuring high maintainability, isolated unit testing, and instant performance under load:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Layer 1: UI Components", desc: "Pure presentational components, accessible semantic markup, responsive layouts, and zero business logic pollution." },
                { title: "Layer 2: Custom Hooks", desc: "Encapsulating asynchronous flows, WebSocket streams, audio synthesizers, and lifecycle effects cleanly." },
                { title: "Layer 3: State Management", desc: "Predictable central stores (Redux Toolkit & Context) with normalized cache and memoized selectors." },
                { title: "Layer 4: API & Services", desc: "Resilient RESTful and WebSocket clients, schema validation, interceptors, and headless browser automation." },
              ].map((layer, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC]">
                  <h4 className="text-sm font-sans font-bold text-[#1E1E1C] mb-1">{layer.title}</h4>
                  <p className="text-xs text-[#6E6E6A] leading-relaxed font-body">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-white border border-[#E8E5DC] shadow-card text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#1E1E1C] tracking-tight">
              Have an Open Role or a High-Impact Project?
            </h2>
            <p className="text-[#6E6E6A] text-base font-body">
              I am actively interviewing for full-time engineering positions and select freelance partnerships. Let's discuss how I can contribute to your team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  playClick();
                  navigate('/contact');
                }}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('LET\'S TALK');
                }}
                onMouseLeave={resetCursor}
                className="px-7 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                START A CONVERSATION
              </button>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="px-6 py-3 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-[#1E1E1C] bg-[#F5F2EA] border border-[#E8E5DC] hover:border-[#1E1E1C] transition-all"
              >
                CONNECT ON LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
