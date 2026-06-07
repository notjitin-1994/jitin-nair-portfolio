'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language: string;
  filePath?: string;
  showLineNumbers?: boolean;
}

const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: 'rgba(13, 13, 18, 0.95)',
    margin: 0,
    borderRadius: '0 0 12px 12px',
    fontSize: '12px',
    lineHeight: '1.5',
    '@media (min-width: 640px)': {
      fontSize: '13px',
    },
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
};

export function CodeBlock({ code, language, filePath, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d0d12]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border-b border-white/[0.08]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
          </div>
          
          {filePath && (
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono truncate">{filePath}</span>
          )}
        </div>
        
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs text-slate-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-all flex-shrink-0"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 sm:gap-1.5 text-emerald-400"
              >
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Copied</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 sm:gap-1.5"
              >
                <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {/* Code Content - Scrollable */}
      <div className="overflow-x-auto scrollbar-hide">
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{ 
            color: '#475569', 
            paddingRight: '12px', 
            minWidth: '2.5em',
            fontSize: 'inherit'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
