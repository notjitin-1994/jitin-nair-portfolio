"use client";

import { useState } from "react";
import { Share2, Twitter, Linkedin, Link2, Check } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
