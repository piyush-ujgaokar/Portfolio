import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { GlassCard } from './GlassCard';
import { Project3DMockup } from '../three/Project3DMockup';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const ProjectCard = ({ project, index = 0 }) => {
  const navigate = useNavigate();
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  const handleCardClick = () => {
    playClick();
    navigate(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full flex"
    >
      <GlassCard
        onClick={handleCardClick}
        className="w-full flex flex-col justify-between p-6 sm:p-7 group cursor-pointer"
        onMouseEnter={() => {
          playHover();
          setCursorHover('EXPLORE');
        }}
        onMouseLeave={resetCursor}
      >
        <div>
          {/* Card Header: Category & Live Indicator */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C]">
              {project.category}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-[#8C8A82]">DEPLOYED</span>
            </div>
          </div>

          {/* 3D Device Viewport */}
          <div className="rounded-2xl overflow-hidden bg-[#F5F2EA] border border-[#E8E5DC] mb-5 pointer-events-none">
            <Project3DMockup
              accentColor={project.accentColor}
              mockupType={project.mockupType}
              className="h-44 sm:h-50 w-full"
            />
          </div>

          {/* Project Title & Subtitle */}
          <h3 className="font-sans font-bold text-2xl text-[#1E1E1C] group-hover:text-black transition-colors mb-2 flex items-center justify-between">
            <span>{project.title}</span>
            <span className="text-xs font-mono text-[#8C8A82] font-normal">
              #0{index + 1}
            </span>
          </h3>

          <p className="text-sm text-[#6E6E6A] line-clamp-2 mb-5 leading-relaxed font-body">
            {project.subtitle}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 rounded-md text-xs font-mono text-[#8C8A82] bg-[#F5F2EA]">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Action Links */}
        <div className="pt-4 border-t border-[#E8E5DC] flex items-center justify-between gap-3 mt-auto">
          {/* Deep dive detail link */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1E1E1C] hover:text-[#6E6E6A] transition-colors"
          >
            <span>Explore Project</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick external buttons */}
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                }}
                className="p-2 rounded-xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] hover:bg-white transition-all shadow-sm"
              >
                <GithubIcon size={14} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Live site for ${project.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1E1E1C] text-[#F5F2EA] text-xs font-mono hover:bg-[#2D2D2A] transition-all"
              >
                <span>Live</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
