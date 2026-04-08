'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ChevronRight, Copy, Check, Terminal } from 'lucide-react';
import { codeSnippets } from '../data/codeSnippets';

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(codeSnippets[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet = codeSnippets.find(s => s.id === activeTab) || codeSnippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden text-slate-200">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Implementation</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-white">The RAG Core</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            LocalMind is engineered for speed and privacy, featuring a custom hybrid-search pipeline and incremental indexing logic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 min-h-[500px]">
          {/* Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
                  activeTab === snippet.id
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-white shadow-lg shadow-cyan-500/5'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:bg-white/[0.05] hover:border-white/[0.1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    activeTab === snippet.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-500'
                  }`}>
                    <FileCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{snippet.title}</p>
                    <p className="text-[10px] font-mono opacity-50 truncate max-w-[180px]">{snippet.filePath}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === snippet.id ? 'rotate-90 text-cyan-400' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col rounded-2xl bg-[#0d0d12] border border-white/[0.08] overflow-hidden shadow-2xl"
              >
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-4 text-[10px] sm:text-xs font-mono text-slate-500">{activeSnippet.filePath}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Code Content */}
                <div className="flex-1 p-4 sm:p-6 overflow-auto font-mono text-[12px] sm:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                  <pre className="text-slate-300">
                    <code className={`language-${activeSnippet.language}`}>
                      {activeSnippet.code}
                    </code>
                  </pre>
                </div>

                {/* Description Footer */}
                <div className="p-4 sm:p-6 bg-cyan-500/[0.02] border-t border-white/[0.05]">
                  <div className="flex items-start gap-3">
                    <Terminal className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic">
                      {activeSnippet.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;