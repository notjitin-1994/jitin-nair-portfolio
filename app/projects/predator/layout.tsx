"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PredatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Command Center", path: "/projects/predator/dashboard" },
    { name: "Live Logs", path: "/projects/predator/logs" },
    { name: "Database", path: "/projects/predator/database" },
  ];

  return (
    <div className="min-h-screen bg-void text-zinc-300 font-sans selection:bg-cyan-400/30">
      <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-void/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center animate-pulse-slow">
              <span className="text-cyan-400 font-bold font-mono">XAU</span>
            </div>
            <h1 className="text-xl font-bold font-serif tracking-tight text-zinc-100">
              PREDATOR<span className="text-cyan-400">SCALPING</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-mono rounded-md transition-colors duration-200 \${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-surface"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
}
