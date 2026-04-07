'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { projectsData } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { navigation } from '../data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Projects Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Projects
            </h3>
            <ul className="space-y-3">
              {projectsData.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {project.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Pages
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
