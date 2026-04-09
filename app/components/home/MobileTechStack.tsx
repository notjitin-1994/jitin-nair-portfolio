"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toolCategories } from "@/app/data/homeData";

export function MobileTechStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [categoryPages, setCategoryPages] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setExpandedSkill(null);
  }, [activeIndex, categoryPages]);

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };
  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, toolCategories.length - 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handlePageChange = (category: string, newPage: number) => {
    setCategoryPages(prev => ({ ...prev, [category]: newPage }));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Advanced": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Expert": return "100%";
      case "Advanced": return "75%";
      default: return "50%";
    }
  };

  // Safety: reset activeIndex if out of bounds
  if (activeIndex >= toolCategories.length) {
    setActiveIndex(0);
  }

  return (
    <section id="techstack" className="overflow-hidden relative">
      <div className="px-5 sm:px-6 mb-6" suppressHydrationWarning>        <p className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}>
          Technical Arsenal
        </p>
        <h2 className={`text-3xl font-bold mb-2 ${mounted ? 'mobile-section-title' : 'opacity-0'}`}>
          Tools & Technologies
        </h2>
        <p className={`text-slate-400 text-sm ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}>
          {toolCategories.length} categories • {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} skills
        </p>
      </div>

      {/* Category Pills */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {toolCategories.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => { 
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx); 
              setExpandedSkill(null); 
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              idx === activeIndex
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.08]"
            }`}
          >
            {cat.category.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Carousel Container with Navigation */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-end gap-2 mb-3">
          <button
            onClick={goToPrev}
            disabled={activeIndex === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d0d12]/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            disabled={activeIndex === toolCategories.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d0d12]/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex-shrink-0 min-w-full px-5 py-6"
            >
              {(() => {
                const cat = toolCategories[activeIndex];
                const Icon = cat.icon;
                const currentPage = categoryPages[cat.category] || 1;
                const totalPages = Math.ceil((cat.tools?.length || 0) / ITEMS_PER_PAGE);
                const paginatedTools = (cat.tools || []).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

                return (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                          <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg leading-tight">{cat.category}</h3>
                          <p className="text-slate-500 text-xs">{cat.description}</p>
                        </div>
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-lg px-1.5 py-0.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePageChange(cat.category, Math.max(currentPage - 1, 1)); }}
                            disabled={currentPage === 1}
                            className="p-0.5 hover:text-cyan-400 disabled:opacity-30 transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[9px] font-mono text-slate-500 min-w-[2rem] text-center">
                            {currentPage}/{totalPages}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePageChange(cat.category, Math.min(currentPage + 1, totalPages)); }}
                            disabled={currentPage === totalPages}
                            className="p-0.5 hover:text-cyan-400 disabled:opacity-30 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Skills List */}
                    {paginatedTools.length > 0 ? (
                      <div className="space-y-2.5">
                        {paginatedTools.map((tool) => (
                        <div
                          key={tool.name}
                          className={`p-3 rounded-xl border transition-all ${
                            expandedSkill === `${cat.category}-${tool.name}`
                              ? "bg-white/[0.06] border-cyan-500/30"
                              : "bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/20"
                          }`}
                          onClick={() => setExpandedSkill(
                            expandedSkill === `${cat.category}-${tool.name}`
                              ? null
                              : `${cat.category}-${tool.name}`
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-slate-200">{tool.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLevelColor(tool.level)}`}>
                              {tool.level}
                            </span>
                          </div>
                          {/* Progress Bar */}
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: getLevelWidth(tool.level) }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className={`h-full rounded-full ${
                                tool.level === "Expert" ? "bg-cyan-400" :
                                tool.level === "Advanced" ? "bg-emerald-400" : "bg-amber-400"
                              }`}
                            />
                          </div>
                          {/* Description (shown when expanded) */}
                          <AnimatePresence>
                            {expandedSkill === `${cat.category}-${tool.name}` && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-slate-400 mt-2 pt-2 border-t border-white/5"
                              >
                                {tool.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm py-4">No skills listed</p>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2">
        <span className="text-slate-500 text-xs font-mono">
          {String(activeIndex + 1).padStart(2, "0")} / {String(toolCategories.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5 ml-3">
          {toolCategories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveIndex(idx); setExpandedSkill(null); }}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeIndex ? "w-4 bg-cyan-400" : "w-1.5 bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
     </section>
  );
}
