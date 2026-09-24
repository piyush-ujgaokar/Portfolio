import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2 } from 'lucide-react';
import { PROJECTS } from '../../api/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { KineticHeadline } from '../components/KineticHeadline';
import { GlassCard } from '../components/GlassCard';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

const FILTER_CATEGORIES = ['All', 'Gen-AI', 'AI Chat', 'Frontend'];

export const Projects = () => {
  const { activeProjectFilter, setActiveProjectFilter, setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeProjectFilter === 'All') return true;
    return project.category.toLowerCase() === activeProjectFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Header section */}
      <div className="space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
          <Sparkles size={14} className="text-[#8C8A82]" />
          <span>PRODUCTION PORTFOLIO & CASE STUDIES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <KineticHeadline
              text="ENGINEERED PROJECTS"
              highlightWord="PROJECTS"
              className="text-4xl sm:text-6xl font-sans font-extrabold text-[#1E1E1C]"
            />
            <p className="text-[#6E6E6A] text-base sm:text-lg max-w-2xl mt-3 leading-relaxed font-body">
              Real-world systems engineered with MERN stack, real-time WebSockets, Gemini AI, Puppeteer, and clean 4-layer React architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#E8E5DC] shadow-pill shrink-0">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setActiveProjectFilter(cat);
                }}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover(cat);
                }}
                onMouseLeave={resetCursor}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 ${
                  activeProjectFilter === cat
                    ? 'bg-[#1E1E1C] text-[#F5F2EA] shadow-sm'
                    : 'text-[#6E6E6A] hover:text-[#1E1E1C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Developer note: Easy to extend data card */}
      <GlassCard className="p-6 sm:p-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#1E1E1C] font-semibold">
          <Code2 size={16} />
          <span>CLEAN & EASY TO EXTEND</span>
        </div>
        <h4 className="text-base font-sans font-bold text-[#1E1E1C]">
          Adding More Projects in the Future?
        </h4>
        <p className="text-xs sm:text-sm text-[#6E6E6A] max-w-xl mx-auto font-body">
          Open <code className="text-[#1E1E1C] bg-[#F5F2EA] px-2 py-0.5 rounded text-xs font-mono border border-[#E8E5DC]">src/features/api/portfolioData.js</code> and add your new project object to the <code className="text-[#1E1E1C] bg-[#F5F2EA] px-2 py-0.5 rounded text-xs font-mono border border-[#E8E5DC]">PROJECTS</code> array. All routes, 3D device viewers, and case study pages generate automatically.
        </p>
      </GlassCard>
    </div>
  );
};
