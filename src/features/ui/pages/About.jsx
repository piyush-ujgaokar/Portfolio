import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Sparkles,
  Download,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, CERTIFICATIONS } from '../../api/portfolioData';
import { KineticHeadline } from '../components/KineticHeadline';
import { GlassCard } from '../components/GlassCard';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const About = () => {
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
      {/* ========================================================================= */}
      {/* 1. HERO BIO & HIGH-RES PORTRAIT */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
        {/* Left: Bio Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
            <Sparkles size={14} className="text-[#8C8A82]" />
            <span>BACKGROUND & PERSPECTIVE</span>
          </div>

          <KineticHeadline
            text="PIYUSH UJGAOKAR"
            highlightWord="PIYUSH"
            className="text-4xl sm:text-6xl font-sans font-extrabold text-[#1E1E1C]"
          />

          <h2 className="text-xl sm:text-2xl font-sans font-semibold text-[#6E6E6A]">
            Engineering High-Performance Web Applications
          </h2>

          <div className="space-y-4 text-[#6E6E6A] text-base leading-relaxed font-body">
            <p>
              I am a <strong className="text-[#1E1E1C] font-semibold">Full Stack Web Developer</strong> based in Nagpur, India, specializing in the modern <strong className="text-[#1E1E1C] font-semibold">MERN stack</strong> and cutting-edge <strong className="text-[#1E1E1C] font-semibold">AI integrations</strong>.
            </p>
            <p>
              My engineering philosophy is anchored in building software that delivers immediate responsiveness, predictable state flow, and clean operational architecture. Whether simulating real-time AI interview evaluations with Google Gemini, architecting WebSocket streaming feeds in Socket.io, or tuning headless Puppeteer Chromium execution, I write code designed for production reliability.
            </p>
            <p>
              I strictly organize client code around a <strong className="text-[#1E1E1C] font-semibold">4-layer React architecture</strong> (UI, Custom Hooks, Redux State, and API Services), ensuring each system is decoupled, testable, and effortless to expand.
            </p>
          </div>

          {/* Quick Info Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
              <MapPin size={14} className="text-[#6E6E6A]" />
              <span>Nagpur, Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
              <GraduationCap size={14} className="text-[#1E1E1C]" />
              <span>BCA Candidate (CGPA 8.27)</span>
            </div>
          </div>

          {/* Download Resume Action */}
          <div className="pt-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              onClick={playClick}
              onMouseEnter={() => {
                playHover();
                setCursorHover('DOWNLOAD');
              }}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <Download size={15} />
              <span>DOWNLOAD OFFICIAL RESUME.PDF</span>
            </a>
          </div>
        </div>

        {/* Right: High-Res Glass Cyber Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-sm sm:max-w-md w-full">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8E5DC] p-3 shadow-card">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#E8E5DC]">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt="Piyush Ujgaokar"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Floating Editorial Badges */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#1E1E1C] border border-[#E8E5DC] shadow-pill">
                  PIYUSH UJGAOKAR // DEV
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#E8E5DC] shadow-pill flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1E1E1C]">Full Stack & AI</span>
                    <span className="text-[10px] font-mono text-[#8C8A82]">MERN • Gemini • Sockets</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDUCATION TIMELINE */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
            <GraduationCap size={15} className="text-[#1E1E1C]" />
            <span>ACADEMIC TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#1E1E1C] tracking-tight">
            Education
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8E5DC] space-y-8">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#F5F2EA] border-2 border-[#1E1E1C] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E1E1C]" />
              </div>

              <GlassCard className="p-6 sm:p-7 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-sans font-bold text-xl text-[#1E1E1C]">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] font-semibold">
                      {edu.grade}
                    </span>
                    <span className="text-xs font-mono text-[#8C8A82]">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#6E6E6A]">
                  {edu.institution} <span className="text-[#8C8A82] font-normal">({edu.location})</span>
                </div>

                <ul className="space-y-1.5 pt-2">
                  {edu.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#6E6E6A] font-body">
                      <CheckCircle2 size={15} className="text-[#1E1E1C] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CERTIFICATIONS */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
            <Award size={15} className="text-[#1E1E1C]" />
            <span>INDUSTRY CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#1E1E1C] tracking-tight">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <GlassCard key={idx} className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] font-semibold">
                  {cert.badge}
                </span>
                <span className="text-xs font-mono text-[#8C8A82]">{cert.issueDate}</span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-lg text-[#1E1E1C]">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-[#6E6E6A] mt-0.5">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#6E6E6A] leading-relaxed font-body">
                {cert.description}
              </p>

              <div className="pt-2 text-[11px] font-mono text-[#8C8A82] border-t border-[#E8E5DC]">
                CREDENTIAL ID: {cert.credentialId}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
