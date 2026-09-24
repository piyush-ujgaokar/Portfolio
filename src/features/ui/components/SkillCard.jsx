import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Atom,
  FileCode,
  Layers,
  Palette,
  Layout,
  Scissors,
  Server,
  Cpu,
  Database,
  Zap,
  Network,
  ShieldCheck,
  Container,
  Boxes,
  Cloud,
  Globe,
  RefreshCw,
  Sparkles,
  Radio,
  FileText,
  Send,
  GitBranch,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

const ICON_MAP = {
  Code2,
  Atom,
  FileCode,
  Layers,
  Palette,
  Layout,
  Scissors,
  Server,
  Cpu,
  Database,
  Zap,
  Network,
  ShieldCheck,
  Container,
  Boxes,
  Cloud,
  Globe,
  RefreshCw,
  Sparkles,
  Radio,
  FileText,
  Send,
  GitBranch,
  Terminal,
};

export const SkillCard = ({ skill, index = 0 }) => {
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover } = useSoundEffect();
  const IconComponent = ICON_MAP[skill.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -3, scale: 1.01 }}
      onMouseEnter={() => {
        playHover();
        setCursorHover(skill.name);
      }}
      onMouseLeave={resetCursor}
      className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E5DC] hover:border-[#8C8A82] shadow-sm hover:shadow-card transition-all duration-200"
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Icon Container */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] group-hover:scale-105 transition-transform">
          <IconComponent size={20} />
        </div>

        {/* Skill Name & Level - Minimum 16px font as mandated */}
        <div className="flex flex-col">
          <span className="text-[16px] sm:text-[17px] font-bold text-[#1E1E1C] tracking-tight group-hover:text-black transition-colors">
            {skill.name}
          </span>
          <span className="text-xs font-mono text-[#6E6E6A] flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>{skill.level}</span>
          </span>
        </div>
      </div>

      {/* Role / Type Badge */}
      {skill.badge && (
        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-mono text-[#6E6E6A] bg-[#F5F2EA] border border-[#E8E5DC] group-hover:border-[#8C8A82] transition-all">
          {skill.badge}
        </span>
      )}
    </motion.div>
  );
};
