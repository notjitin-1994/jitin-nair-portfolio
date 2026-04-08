'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SmartslateRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projects/smarslate');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 font-mono text-sm tracking-widest">REDIRECTING TO SMARSLATE...</p>
      </div>
    </div>
  );
}