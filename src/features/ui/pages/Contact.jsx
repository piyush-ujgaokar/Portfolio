import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { PERSONAL_INFO } from '../../api/portfolioData';
import { submitContactMessage } from '../../api/contactService';
import { KineticHeadline } from '../components/KineticHeadline';
import { GlassCard } from '../components/GlassCard';
import { usePortfolioState } from '../../state/PortfolioContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const Contact = () => {
  const { setCursorHover, resetCursor } = usePortfolioState();
  const { playHover, playClick, playSuccess } = useSoundEffect();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedField, setCopiedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleCopy = (text, fieldName) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await submitContactMessage(formData);
      playSuccess();
      setSubmitStatus({
        success: true,
        message: response.message,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: err.message || 'Something went wrong. Please reach out directly via email.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
      {/* Header section */}
      <div className="space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E5DC] text-xs font-mono text-[#1E1E1C] shadow-pill">
          <Sparkles size={14} className="text-[#8C8A82]" />
          <span>DIRECT DISPATCH CHANNELS</span>
        </div>

        <KineticHeadline
          text="LET'S CONNECT"
          highlightWord="CONNECT"
          className="text-4xl sm:text-6xl font-sans font-extrabold text-[#1E1E1C]"
        />

        <p className="text-[#6E6E6A] text-base sm:text-lg max-w-2xl leading-relaxed font-body">
          Whether you have a technical question, an open position for a Full Stack or Gen-AI developer, or a contract project—my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Direct Contact Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Availability Status Card */}
          <GlassCard className="p-5 border-emerald-600/30 bg-emerald-50/50">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1E1E1C]">Current Availability</span>
                <span className="text-xs text-emerald-800 font-mono">Available for Full-Time Roles & Freelance</span>
              </div>
            </div>
          </GlassCard>

          {/* Email Copy Card */}
          <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] flex items-center justify-center text-[#1E1E1C]">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C8A82]">Email Address</span>
                <p className="text-sm font-semibold text-[#1E1E1C] mt-0.5">{PERSONAL_INFO.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
              onMouseEnter={() => {
                playHover();
                setCursorHover('COPY');
              }}
              onMouseLeave={resetCursor}
              className="p-2 rounded-xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] hover:bg-white transition-all shadow-sm"
              title="Copy email to clipboard"
            >
              {copiedField === 'email' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
          </GlassCard>

          {/* Phone Copy & Call Card */}
          <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] flex items-center justify-center text-[#1E1E1C]">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C8A82]">Phone / WhatsApp</span>
                <p className="text-sm font-semibold text-[#1E1E1C] mt-0.5">{PERSONAL_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                onMouseEnter={() => {
                  playHover();
                  setCursorHover('COPY');
                }}
                onMouseLeave={resetCursor}
                className="p-2 rounded-xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] hover:bg-white transition-all shadow-sm"
                title="Copy phone number"
              >
                {copiedField === 'phone' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
              <a
                href={PERSONAL_INFO.socialLinks.phone}
                onClick={playClick}
                className="p-2 rounded-xl bg-[#1E1E1C] text-[#F5F2EA] hover:bg-[#2D2D2A] transition-all"
                title="Direct call"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>
          </GlassCard>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={() => {
                playHover();
                setCursorHover('LINKEDIN');
              }}
              onMouseLeave={resetCursor}
              className="p-5 rounded-3xl bg-white border border-[#E8E5DC] hover:border-[#1E1E1C] shadow-sm transition-all flex flex-col justify-between h-28 group"
            >
              <div className="flex items-center justify-between">
                <LinkedinIcon size={20} className="text-[#1E1E1C]" />
                <ArrowUpRight size={15} className="text-[#8C8A82] group-hover:text-[#1E1E1C] transition-colors" />
              </div>
              <span className="text-xs font-mono text-[#1E1E1C] font-semibold">
                LinkedIn Profile
              </span>
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={() => {
                playHover();
                setCursorHover('GITHUB');
              }}
              onMouseLeave={resetCursor}
              className="p-5 rounded-3xl bg-white border border-[#E8E5DC] hover:border-[#1E1E1C] shadow-sm transition-all flex flex-col justify-between h-28 group"
            >
              <div className="flex items-center justify-between">
                <GithubIcon size={20} className="text-[#1E1E1C]" />
                <ArrowUpRight size={15} className="text-[#8C8A82] group-hover:text-[#1E1E1C] transition-colors" />
              </div>
              <span className="text-xs font-mono text-[#1E1E1C] font-semibold">
                GitHub Repos
              </span>
            </a>
          </div>

          {/* Location details */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E5DC] flex items-center gap-2.5 text-xs font-mono text-[#6E6E6A]">
            <MapPin size={15} className="text-[#1E1E1C]" />
            <span>Nagpur, Maharashtra, India (IST UTC+5:30)</span>
          </div>
        </div>

        {/* Right Col: Editorial Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1E1E1C] font-semibold">
                <MessageSquare size={15} />
                <span>SEND DIRECT ENQUIRY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#1E1E1C] tracking-tight">
                Transmit a Message
              </h3>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    submitStatus.success
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-body">{submitStatus.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] placeholder-[#8C8A82] focus:outline-none focus:border-[#1E1E1C] text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] placeholder-[#8C8A82] focus:outline-none focus:border-[#1E1E1C] text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Full Stack Engineering Role / Collaboration"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] placeholder-[#8C8A82] focus:outline-none focus:border-[#1E1E1C] text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#8C8A82] font-semibold">
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Piyush, I saw your portfolio and would like to connect regarding..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F2EA] border border-[#E8E5DC] text-[#1E1E1C] placeholder-[#8C8A82] focus:outline-none focus:border-[#1E1E1C] text-sm transition-all resize-none font-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  onMouseEnter={() => {
                    playHover();
                    setCursorHover('TRANSMIT');
                  }}
                  onMouseLeave={resetCursor}
                  className="w-full py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider text-[#F5F2EA] bg-[#1E1E1C] hover:bg-[#2D2D2A] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>TRANSMITTING MESSAGE...</span>
                    </span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
