import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Layers, Radio, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useSoundEffect } from '../../hooks/useSoundEffect';

const tabs = [
  { id: 'architecture', label: '4-Layer Core', icon: Layers },
  { id: 'realtime', label: 'Socket Stream', icon: Radio },
  { id: 'genai', label: 'Gemini AI', icon: Sparkles },
];

export const HeroWorkstationDeck = () => {
  const [activeTab, setActiveTab] = useState('architecture');
  const { playClick } = useSoundEffect();

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#E8E5DC] shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Top Titlebar */}
      <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#E8E5DC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs text-[#6E6E6A] ml-2 font-medium">
            piyush@workstation: ~/portfolio
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-[11px] font-mono text-emerald-700 shadow-pill">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LIVE // IST</span>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-3 border-b border-[#E8E5DC] bg-[#FAF8F5]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-white text-[#1E1E1C] font-semibold border-b-2 border-[#1E1E1C]'
                  : 'text-[#8C8A82] hover:text-[#1E1E1C]'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body */}
      <div className="p-6 bg-white min-h-[290px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DC]">
                <span className="font-mono text-xs font-semibold text-[#1E1E1C] uppercase tracking-wider">
                  4-Layer Client Architecture Flow
                </span>
                <span className="text-[11px] font-mono text-[#8C8A82]">STRICT ISOLATION</span>
              </div>

              <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                {[
                  { tag: 'L1: UI', name: 'Presentational Components', detail: 'Tailwind + Semantic HTML', color: 'bg-white' },
                  { tag: 'L2: HOOKS', name: 'Business Logic & Streams', detail: 'useChatSocket, useAudio', color: 'bg-[#F5F2EA]' },
                  { tag: 'L3: STATE', name: 'Redux Toolkit Store', detail: 'Predictable Caching', color: 'bg-white' },
                  { tag: 'L4: API', name: 'Services & Automation', detail: 'Express, Gemini, Puppeteer', color: 'bg-[#F5F2EA]' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-xl border border-[#E8E5DC] ${item.color}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#F5F2EA] text-[10px] font-bold">
                        {item.tag}
                      </span>
                      <span className="font-sans font-semibold text-[#1E1E1C]">{item.name}</span>
                    </div>
                    <span className="text-[11px] text-[#6E6E6A] hidden sm:inline">{item.detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'realtime' && (
            <motion.div
              key="realtime"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DC]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#1E1E1C] uppercase tracking-wider">
                    Xhancy Socket.io Pipeline
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-700 font-semibold">LATENCY: 85ms</span>
              </div>

              <div className="rounded-2xl p-3.5 bg-[#1E1E1C] text-[#F5F2EA] font-mono text-xs space-y-2 shadow-soft">
                <div className="flex items-center justify-between text-[11px] text-[#8C8A82] pb-1 border-b border-[#2E2E2A]">
                  <span>EVENT: "chat:stream_token"</span>
                  <span className="text-emerald-400 font-bold">ACK 200</span>
                </div>
                <p className="text-emerald-300">&gt; Connecting to Gemini 1.5 Flash WebSocket...</p>
                <p className="text-[#8C8A82]">&gt; Payload buffer throttled to 30ms per batch.</p>
                <p className="text-[#F5F2EA] font-sans font-medium">
                  "Architecture verified: 0 UI frame drops during high-speed streaming."
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#6E6E6A] pt-1">
                <span>RECONNECT: AUTO (EXP BACKOFF)</span>
                <span>STATE: SYNCHRONIZED</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'genai' && (
            <motion.div
              key="genai"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DC]">
                <span className="font-mono text-xs font-semibold text-[#1E1E1C] uppercase tracking-wider">
                  Interview-AI Evaluation Engine
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] font-semibold border border-emerald-200">
                  94% ATS SCORE
                </span>
              </div>

              <div className="space-y-2 text-xs font-body">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DC] flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1E1E1C]">Dynamic Role Questioning:</span>
                    <p className="text-[#6E6E6A] text-[11px] mt-0.5">Gemini Flash generates role-specific interview dilemmas tailored to JD.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DC] flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1E1E1C]">Automated Resume Compiler:</span>
                    <p className="text-[#6E6E6A] text-[11px] mt-0.5">Pre-warmed Puppeteer worker pool compiles ATS resumes in &lt;1.8s.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between font-mono text-[11px] text-[#8C8A82]">
                <span>STATUS: BENCHMARKED</span>
                <span className="text-[#1E1E1C] font-semibold">10,000+ SESSIONS</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deck Footer Tag */}
        <div className="pt-4 border-t border-[#E8E5DC] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#1E1E1C] font-medium">
            <ShieldCheck size={14} />
            <span>MERN + AI PRODUCTION SPEC</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E5DC] text-[#1E1E1C] text-[10px] font-medium uppercase">
            VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
};
