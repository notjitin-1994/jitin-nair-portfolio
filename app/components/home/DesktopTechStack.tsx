"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, ChevronLeft, ChevronRight, Wrench, Boxes, Award, Target, Calendar } from "lucide-react";
import { toolCategories, primaryStack } from "@/app/data/homeData";

const categories = ["Primary Stack", "All", ...toolCategories.map((cat) => cat.category)];

export function DesktopTechStack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Primary Stack");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [mainPage, setMainPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ITEMS_PER_PAGE = 12;

  // Reset pagination when filter/search changes
  useEffect(() => {
    setMainPage(1);
  }, [selectedCategory, searchQuery]);

  // Flatten all skills for "All" view - memoized for speed
  const allSkills = useMemo(() => toolCategories.flatMap((cat) =>
    cat.tools.map((tool) => ({ ...tool, category: cat.category, Icon: cat.icon }))
  ), []);

  // Memoized filtered skills for high performance
  const displaySkills = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      // Search across all skills
      return allSkills.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }
    if (selectedCategory === "Primary Stack") {
      return primaryStack.map((skill) => ({ ...skill, Icon: skill.icon }));
    }
    if (selectedCategory === "All") {
      return allSkills;
    }
    // Specific category selected
    const cat = toolCategories.find(c => c.category === selectedCategory);
    if (cat) {
      return cat.tools.map(tool => ({ ...tool, category: cat.category, Icon: cat.icon }));
    }
    return [];
  }, [searchQuery, selectedCategory, allSkills]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSelectedSkill(null);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case "Expert": return 100;
      case "Advanced": return 75;
      default: return 50;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "from-cyan-500 to-cyan-400";
      case "Advanced": return "from-emerald-500 to-emerald-400";
      default: return "from-amber-500 to-amber-400";
    }
  };

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Advanced": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const SkillCard = ({ tool, category, Icon, index }: { tool: { name: string; level: string; description: string }; category: string; Icon: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      onClick={() => setSelectedSkill(selectedSkill === tool.name ? null : tool.name)}
      className={`group relative rounded-xl border backdrop-blur-[2px] p-4 cursor-pointer transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06] ${
        selectedSkill === tool.name ? "border-cyan-500/50 ring-1 ring-cyan-500/20 bg-white/[0.05]" : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <h4 className="font-medium text-sm text-slate-200 group-hover:text-white transition-colors">
              {tool.name}
            </h4>
            <span className="text-[10px] text-slate-500">{category}</span>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLevelBgColor(tool.level)}`}>
          {tool.level}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getLevelPercentage(tool.level)}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full bg-gradient-to-r ${getLevelColor(tool.level)} rounded-full`}
          />
        </div>
      </div>

      {/* Expanded Description */}
      <AnimatePresence>
        {selectedSkill === tool.name && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
              {tool.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {selectedSkill === tool.name ? (
          <X className="w-3 h-3 text-slate-500" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500/30" />
        )}
      </div>
    </motion.div>
  );

  return (
     <section id="techstack" className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Capabilities Matrix
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl"
          >
            Production-grade stack meticulously selected for building enterprise-scale
            AI systems and autonomous platforms
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools, technologies..."
              className="w-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-[2px] rounded-xl py-3.5 pl-12 pr-32 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-[2px] ${
                  selectedCategory === category
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200 hover:border-cyan-500/20"
                }`}
              >
                {category}
                {category === "Primary Stack" && (
                  <span className="ml-2 text-[10px] text-slate-500">20</span>
                )}
                {category !== "All" && category !== "Primary Stack" && (
                  <span className="ml-2 text-[10px] text-slate-500">
                    {toolCategories.find((c) => c.category === category)?.tools.length}
                  </span>
                )}
                {category === "All" && (
                  <span className="ml-2 text-[10px] text-slate-500">{allSkills.length}</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="text-sm text-slate-500">
            {searchQuery ? (
              <span>
                Found <span className="text-cyan-400">{displaySkills.length}</span> skills matching &quot;
                {searchQuery}&quot;
              </span>
            ) : selectedCategory === "Primary Stack" ? (
              <span>
                <span className="text-cyan-400">{primaryStack.length}</span> technologies in Primary Stack
              </span>
            ) : selectedCategory === "All" ? (
              <span>
                Showing all <span className="text-cyan-400">{allSkills.length}</span> skills
              </span>
            ) : (
              <span>
                <span className="text-cyan-400">
                  {displaySkills.length}
                </span>{" "}
                skills in {selectedCategory}
              </span>
            )}
            {displaySkills.length > ITEMS_PER_PAGE && (
              <span className="ml-2 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider">
                Page {mainPage} of {Math.ceil(displaySkills.length / ITEMS_PER_PAGE)}
              </span>
            )}
          </div>
          {(searchQuery || selectedCategory !== "Primary Stack") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Primary Stack");
              }}
              className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Show Primary Stack
            </button>
          )}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery + mainPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displaySkills
                .slice((mainPage - 1) * ITEMS_PER_PAGE, mainPage * ITEMS_PER_PAGE)
                .map((tool, index) => (
                  <SkillCard
                    key={tool.name}
                    tool={tool}
                    category={(tool as any).category}
                    Icon={(tool as any).Icon}
                    index={index}
                  />
                ))}
            </div>

            {Math.ceil(displaySkills.length / ITEMS_PER_PAGE) > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setMainPage(prev => Math.max(prev - 1, 1))}
                  disabled={mainPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:hover:text-inherit transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.ceil(displaySkills.length / ITEMS_PER_PAGE) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setMainPage(i + 1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono transition-all ${
                        mainPage === i + 1
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-white/[0.03] text-slate-500 border border-white/[0.08] hover:text-slate-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setMainPage(prev => Math.min(prev + 1, Math.ceil(displaySkills.length / ITEMS_PER_PAGE)))}
                  disabled={mainPage === Math.ceil(displaySkills.length / ITEMS_PER_PAGE)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:hover:text-inherit transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {displaySkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 md:py-8"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">No skills found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-5 gap-4"
        >
          {[
            { value: "38", label: "Technologies", icon: Wrench },
            { value: "6", label: "Categories", icon: Boxes },
            { value: "15", label: "Expert Level", icon: Award },
            { value: "12", label: "Advanced", icon: Target },
            { value: "11", label: "Intermediate", icon: Calendar },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
     </section>
  );
}
