import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS } from '../../api/portfolioData';
import { Project3DMockup } from '../three/Project3DMockup';
import { GlassCard } from '../components/GlassCard';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick } = useSoundEffect();

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-3xl font-sans font-bold text-[#1E1E1C]">Project Not Found</h2>
        <p className="text-[#6E6E6A]">The requested project case study does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-3 rounded-full bg-[#1E1E1C] text-[#F5F2EA] font-semibold text-xs font-mono uppercase"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            playClick();
            navigate('/projects');
          }}
          onMouseEnter={() => {
            playHover();
            setCursorHover('BACK');
          }}
          onMouseLeave={resetCursor}
          className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#6E6E6A] hover:text-[#1E1E1C] transition-colors"
        >
          <ArrowLeft size={15} />
          <span>BACK TO ALL PROJECTS</span>
        </button>

        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-white border border-[#E8E5DC] text-[#1E1E1C] shadow-pill">
          {project.category}
        </span>
      </div>

      {/* Main Title & Action Bar */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-sans font-black text-[#1E1E1C] tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-[#6E6E6A] max-w-3xl leading-relaxed font-body">
          {project.subtitle}
        </p>

        {/* Live and Source Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={() => {
                playHover();
                setCursorHover('LIVE DEMO');
              }}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ExternalLink size={14} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={() => {
                playHover();
                setCursorHover('CODE REPO');
              }}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-[#1E1E1C] bg-white border border-[#E8E5DC] hover:border-[#1E1E1C] transition-all duration-200 hover:scale-105 active:scale-95 shadow-pill"
            >
              <GithubIcon size={15} />
              <span>SOURCE CODE</span>
            </a>
          )}
        </div>
      </div>

      {/* 3D Interactive Device Showcase */}
      <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E8E5DC] shadow-card relative overflow-hidden">
        <div className="absolute top-4 left-6 text-xs font-mono text-[#8C8A82]">
          3D WORKSTATION VIEWPORT // DRAG TO ROTATE
        </div>
        <Project3DMockup
          accentColor={project.accentColor}
          mockupType={project.mockupType}
          className="h-64 sm:h-96 w-full"
        />
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {project.keyMetrics.map((metric, i) => (
          <GlassCard key={i} className="p-4 sm:p-5 text-center">
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#1E1E1C]">
              {metric.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] mt-1">
              {metric.label}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Project Overview */}
      <GlassCard className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E1E1C] font-semibold">
          <Terminal size={15} />
          <span>SYSTEM ARCHITECTURE & DEEP DIVE</span>
        </div>
        <h2 className="text-2xl font-sans font-bold text-[#1E1E1C]">System Overview</h2>
        <p className="text-[#6E6E6A] leading-relaxed text-base font-body">
          {project.overview}
        </p>

        {/* Feature List */}
        <div className="pt-4 space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C8A82]">
            Core Technical Capabilities
          </h3>
          <ul className="space-y-2">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#1E1E1C] font-body">
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>

      {/* 4-Layer React Architecture Breakdown */}
      {project.architecture && (
        <GlassCard className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#1E1E1C] font-semibold">
            <Layers size={16} />
            <span>4-LAYER REACT CODEBASE BREAKDOWN</span>
          </div>
          <h2 className="text-2xl font-sans font-bold text-[#1E1E1C]">
            Architecture Implementation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC]">
              <span className="text-xs font-mono text-[#1E1E1C] uppercase tracking-wider font-bold">1. UI Layer</span>
              <p className="text-xs text-[#6E6E6A] mt-1.5 leading-relaxed font-body">{project.architecture.ui}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC]">
              <span className="text-xs font-mono text-[#1E1E1C] uppercase tracking-wider font-bold">2. Custom Hooks Layer</span>
              <p className="text-xs text-[#6E6E6A] mt-1.5 leading-relaxed font-body">{project.architecture.hooks}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC]">
              <span className="text-xs font-mono text-[#1E1E1C] uppercase tracking-wider font-bold">3. State Layer</span>
              <p className="text-xs text-[#6E6E6A] mt-1.5 leading-relaxed font-body">{project.architecture.state}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC]">
              <span className="text-xs font-mono text-[#1E1E1C] uppercase tracking-wider font-bold">4. API & Service Layer</span>
              <p className="text-xs text-[#6E6E6A] mt-1.5 leading-relaxed font-body">{project.architecture.api}</p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Engineering Challenges & Solutions */}
      {project.challenges && (
        <div className="space-y-4">
          <h2 className="text-2xl font-sans font-bold text-[#1E1E1C] flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#1E1E1C]" />
            <span>Engineering Challenges Solved</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {project.challenges.map((ch, i) => (
              <GlassCard key={i} className="p-6 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle size={17} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#1E1E1C]">Challenge:</h4>
                    <p className="text-xs sm:text-sm text-[#6E6E6A] mt-1 font-body">{ch.problem}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#E8E5DC]">
                  <CheckCircle size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-emerald-800">Solution Implemented:</h4>
                    <p className="text-xs sm:text-sm text-[#6E6E6A] mt-1 font-body">{ch.solution}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Pills */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DC] shadow-sm space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C8A82]">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Previous / Next Project Navigation */}
      <div className="pt-8 border-t border-[#E8E5DC] flex items-center justify-between">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            onClick={playClick}
            className="flex items-center gap-2 text-sm text-[#6E6E6A] hover:text-[#1E1E1C] transition-colors font-medium"
          >
            <ArrowLeft size={15} />
            <span>Previous: {prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={playClick}
            className="flex items-center gap-2 text-sm text-[#6E6E6A] hover:text-[#1E1E1C] transition-colors font-medium"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight size={15} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
