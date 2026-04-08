'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';

interface ProjectNavigationProps {
  currentId: string;
}

export function ProjectNavigation({ currentId }: ProjectNavigationProps) {
  const currentIndex = projectsData.findIndex((p) => p.id === currentId);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  if (!prevProject && !nextProject) return null;

  return (
    <section className="py-8 px-4 sm:px-8 relative z-10 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="group flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">Previous</p>
              <p className="font-bold tracking-tight">{prevProject.shortName}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="group flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all text-right"
          >
            <div className="hidden sm:block">
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">Next</p>
              <p className="font-bold tracking-tight">{nextProject.shortName}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all">
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}

export default ProjectNavigation;