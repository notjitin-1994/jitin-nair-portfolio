"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Live Terminal", href: "/projects/predator/dashboard" },
    { name: "System Logs", href: "/projects/predator/logs" },
    { name: "Data Vault", href: "/projects/predator/database" },
  ];

  return (
    <div className="min-h-screen bg-void text-zinc-400 font-sans selection:bg-cyan-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-void/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-void font-bold text-lg group-hover:rotate-12 transition-transform">P</div>
              <span className="text-white font-serif tracking-tighter uppercase text-xl">Predator</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-mono rounded-md transition-colors duration-200 ${
                      isActive 
                        ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20" 
                        : "hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Status</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Operational</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                <span className="text-xs">JS</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
