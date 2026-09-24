import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../api/portfolioData';
import { SkillCard } from '../components/SkillCard';
import { Skills3DOrbit } from '../three/Skills3DOrbit';
import { KineticHeadline } from '../components/KineticHeadline';
import { GlassCard } from '../components/GlassCard';

export const Skills = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.badge?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => activeTab === 'all' || cat.id === activeTab);

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
      {/* ========================================================================= */}
      {/* 1. HEADER & 3D INTERACTIVE TECH CONSTELLATION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
            <Sparkles size={14} className="text-[#8C8A82]" />
            <span>CORE COMPETENCIES ({totalSkillsCount}+ VERIFIED TECHNOLOGIES)</span>
          </div>

          <KineticHeadline
            text="TECHNICAL ARSENAL"
            highlightWord="ARSENAL"
            className="text-4xl sm:text-6xl font-sans font-extrabold text-[#1E1E1C]"
          />

          <p className="text-[#6E6E6A] text-base sm:text-lg max-w-xl leading-relaxed font-body">
            Strictly engineered for clarity, speed, and real-world deployment. Every skill below is backed by shipped production code, deep architectural understanding, and automated test patterns.
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8A82]">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search skills (e.g. React, MongoDB, Gemini, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E8E5DC] text-[#1E1E1C] placeholder-[#8C8A82] focus:outline-none focus:border-[#1E1E1C] text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* 3D Tech Orbit Alongside Skills */}
        <div className="lg:col-span-5">
          <Skills3DOrbit />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORY SELECTOR TABS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#E8E5DC]">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-[#1E1E1C] text-[#F5F2EA] shadow-sm'
              : 'bg-white text-[#6E6E6A] border border-[#E8E5DC] hover:text-[#1E1E1C]'
          }`}
        >
          All Skills ({totalSkillsCount})
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
              activeTab === cat.id
                ? 'bg-[#1E1E1C] text-[#F5F2EA] shadow-sm'
                : 'bg-white text-[#6E6E6A] border border-[#E8E5DC] hover:text-[#1E1E1C]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. THREE CLEARLY LABELED CATEGORIES WITH 16PX+ HIGH-CONTRAST CHIPS */}
      {/* ========================================================================= */}
      <div className="space-y-16">
        {filteredCategories.map((category) => {
          if (category.skills.length === 0) return null;

          return (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#E8E5DC]">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#1E1E1C] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E1E1C]" />
                    <span>{category.title}</span>
                  </h2>
                  <p className="text-sm text-[#6E6E6A] mt-1 max-w-2xl font-body">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#1E1E1C] bg-white border border-[#E8E5DC] px-3 py-1 rounded-full self-start sm:self-auto shadow-pill">
                  {category.skills.length} VERIFIED SKILLS
                </span>
              </div>

              {/* Skills Cards Grid - 16px high contrast */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          );
        })}

        {filteredCategories.every((cat) => cat.skills.length === 0) && (
          <div className="text-center py-16 space-y-3">
            <p className="text-lg font-sans text-[#6E6E6A]">
              No skills found matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-[#1E1E1C] underline font-semibold"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. PRACTICAL APPLICATION HIGHLIGHT */}
      {/* ========================================================================= */}
      <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-base text-[#1E1E1C] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Zero Fragile Setups</span>
            </h3>
            <p className="text-xs text-[#6E6E6A] leading-relaxed font-body">
              Every technology is applied according to strict production conventions, with environment isolation and reliable error boundaries.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-base text-[#1E1E1C] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#1E1E1C]" />
              <span>Full-Stack Synergy</span>
            </h3>
            <p className="text-xs text-[#6E6E6A] leading-relaxed font-body">
              Seamless data handshake between MongoDB aggregation pipelines, Express middleware, Socket.io event buses, and Redux Toolkit slices.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-base text-[#1E1E1C] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#6E6E6A]" />
              <span>Modern AI Toolchains</span>
            </h3>
            <p className="text-xs text-[#6E6E6A] leading-relaxed font-body">
              Hands-on mastery of Google Gemini Flash & Pro APIs, prompt engineering, structured JSON outputs, and Puppeteer headless browser pipelines.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
