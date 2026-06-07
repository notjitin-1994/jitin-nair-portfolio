'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Newspaper, Clock, ExternalLink, AlertTriangle } from 'lucide-react';

const NewsItem = memo(function NewsItem({ news }: { news: any }) {
  const isHighImpact = news.headline.match(/CPI|NFP|FOMC|Fed|Interest Rate|Inflation/i);
  
  return (
    <div className={`p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors group relative overflow-hidden ${isHighImpact ? 'border-amber-500/20' : ''}`}>
      {isHighImpact && (
        <div className="absolute top-0 right-0 p-1">
          <AlertTriangle className="w-2 h-2 text-amber-500 opacity-50" />
        </div>
      )}
      
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className={`text-[7px] font-bold px-1 py-0.5 rounded ${isHighImpact ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'} uppercase`}>
            {news.category || 'Forex'}
          </span>
          <span className="text-[7px] font-mono text-slate-600 uppercase truncate">
            {news.source}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Clock className="w-2 h-2 text-slate-600" />
          <span className="text-[7px] font-mono text-slate-600 italic whitespace-nowrap">
            {new Date(news.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      
      <h4 className="text-[10px] leading-relaxed text-slate-300 font-medium group-hover:text-white transition-colors line-clamp-2">
        {news.headline}
      </h4>
      
      {news.url && (
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-midnight/40 backdrop-blur-[1px] transition-opacity"
        >
          <ExternalLink className="w-3 h-3 text-cyan-400" />
        </a>
      )}
    </div>
  );
});

const NewsStream = memo(function NewsStream() {
  const { news, connectionStatus } = useDashboard();
  const isLoading = connectionStatus === 'connecting';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden flex flex-col"
    >
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Newspaper className="w-3 h-3 text-blue-400" />
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Agent Intelligence Feed
          </h3>
        </div>
      </div>

      <div className="p-3 max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {news.map((item, idx) => (
                <motion.div
                  key={item.timestamp + idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NewsItem news={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Newspaper className="w-6 h-6 text-slate-700 mx-auto mb-2 opacity-20" />
            <p className="text-[10px] text-slate-600 italic">No recent headlines found.</p>
          </div>
        )}
      </div>
      
      <div className="px-3 py-2 bg-void/30 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[7px] text-slate-600 uppercase font-bold tracking-widest flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
          Live Sentiment
        </span>
        <span className="text-[7px] text-slate-600 italic font-mono uppercase">Finnhub Stream</span>
      </div>
    </motion.div>
  );
});

export default NewsStream;
