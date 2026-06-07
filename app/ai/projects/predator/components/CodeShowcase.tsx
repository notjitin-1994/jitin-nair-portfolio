'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ChevronLeft, ChevronRight, Lock, Unlock, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import CodeBlock from './ui/CodeBlock';
import { codeSnippets } from '../data/codeSnippets';

// Access Request Form Component
function AccessRequestForm({ onUnlock }: { onUnlock: () => void }) {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const validate = () => {
    const newErrors = { email: '', phone: '' };
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Valid phone required';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Collect data and unlock session
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Glass Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30"
          >
            <Lock className="w-7 h-7 text-cyan-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Institutional Access</h3>
          <p className="text-slate-400 text-xs font-light leading-relaxed">
            Proprietary MLARD algorithms are protected. <br/>Unlock technical implementation details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
                placeholder="Email Address"
              />
            </div>
            {errors.email && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-mono">{errors.email}</p>}
          </div>

          <div>
            <div className="relative group">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-mono">{errors.phone}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400 transition-all text-sm font-black uppercase tracking-widest disabled:opacity-50 mt-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Initialize Session
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

// Code Block with Session-Wide Unlock
function CodeBlockContainer({ 
  code, 
  language, 
  filePath,
  isUnlocked,
  onUnlock
}: { 
  code: string; 
  language: string; 
  filePath: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}) {
  return (
    <div className="relative min-h-[400px] sm:min-h-[550px] rounded-3xl overflow-hidden bg-[#050505] border border-white/[0.06] shadow-2xl">
      {/* Code Header */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between px-6 z-20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          <span className="ml-4 text-[10px] font-mono text-slate-500 tracking-wider uppercase">{filePath}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">{language}</span>
        </div>
      </div>

      {/* Code Content - Always rendered, blur controlled by isUnlocked */}
      <motion.div
        animate={{
          filter: isUnlocked ? 'blur(0px)' : 'blur(12px)',
          opacity: isUnlocked ? 1 : 0.4,
          scale: isUnlocked ? 1 : 0.98,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 pt-12 overflow-auto scrollbar-hide"
      >
        <div className="p-6 sm:p-8">
          <CodeBlock code={code} language={language} filePath={filePath} />
        </div>
      </motion.div>

      {/* Locked Overlay - Shows blurred code through it */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.9) 100%)'
            }}
          >
            <AccessRequestForm onUnlock={onUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlocked Badge */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.4 }}
            className="absolute top-16 right-6 z-20"
          >
            <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2 shadow-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest font-mono">Secure Session Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(codeSnippets[0].id);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const activeSnippet = codeSnippets.find((s) => s.id === activeTab);
  const activeIndex = codeSnippets.findIndex((s) => s.id === activeTab);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const nextTab = () => {
    const nextIndex = (activeIndex + 1) % codeSnippets.length;
    setActiveTab(codeSnippets[nextIndex].id);
  };

  const prevTab = () => {
    const prevIndex = (activeIndex - 1 + codeSnippets.length) % codeSnippets.length;
    setActiveTab(codeSnippets[prevIndex].id);
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent relative">
      {/* Decorative noise/grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">Technical Implementation</p>
            <div className="h-px w-12 bg-white/10" />
            {!isUnlocked ? (
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-500 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Restricted
              </span>
            ) : (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                <Unlock className="w-3 h-3" />
                Authenticated
              </motion.span>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight font-display text-white italic">The Neural Logic</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Deep dive into the core implementation of Predator&apos;s adaptive decision loop, featuring JIT-optimized indicators and production-grade MLOps monitoring.
          </p>
        </motion.div>

        {/* Desktop: Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          {/* Sidebar / Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                className={`w-full text-left p-5 rounded-[1.5rem] border transition-all duration-500 group relative overflow-hidden ${
                  activeTab === snippet.id
                    ? 'bg-cyan-500/[0.08] border-cyan-500/40 shadow-xl'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04]'
                }`}
              >
                {activeTab === snippet.id && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none"
                  />
                )}
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    activeTab === snippet.id ? 'bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5 group-hover:bg-white/10 shadow-inner'
                  }`}>
                    <FileCode className={`w-6 h-6 transition-colors duration-500 ${
                      activeTab === snippet.id ? 'text-[#0a0a0f]' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold mb-1 transition-colors duration-500 ${
                      activeTab === snippet.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {snippet.title}
                    </h3>
                    <p className={`text-[10px] font-mono uppercase tracking-widest ${activeTab === snippet.id ? 'text-cyan-400/70' : 'text-slate-600'}`}>
                      {snippet.filePath.split('/').pop()}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {activeTab === snippet.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative z-10"
                    >
                      <p className="text-slate-400 text-xs mt-4 pt-4 border-t border-cyan-500/20 font-light leading-relaxed">
                        {snippet.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
            
            {/* Visual indicator for "End of Implementation" */}
            <div className="pt-8 px-6 text-center">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono text-slate-700 tracking-[0.3em] uppercase">
                <div className="w-2 h-2 rounded-full border border-slate-800" />
                Implementation Log
                <div className="w-2 h-2 rounded-full border border-slate-800" />
              </div>
            </div>
          </motion.div>

          {/* Code Viewport */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {activeSnippet && (
                <motion.div
                  key={activeSnippet.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <CodeBlockContainer
                    code={activeSnippet.code}
                    language={activeSnippet.language}
                    filePath={activeSnippet.filePath}
                    isUnlocked={isUnlocked}
                    onUnlock={handleUnlock}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Decorative background glow for code block */}
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;
