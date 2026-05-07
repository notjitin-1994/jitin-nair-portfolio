"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  ChevronDown, 
  X, 
  ArrowRight,
  Users
} from "lucide-react";

export function MobileContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:not.jitin@gmail.com",
      color: "from-cyan-500/20 to-cyan-400/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400"
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+919008898642",
      color: "from-teal-500/20 to-teal-400/10",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919008898642",
      color: "from-cyan-500/15 to-teal-500/15",
      borderColor: "border-cyan-500/25",
      iconColor: "text-cyan-400"
    },
  ];

  if (!mounted) return null;

  return (
     <section id="contact" className="py-8 px-5 pb-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          Get In Touch
        </p>

        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Extraordinary</span>
        </h2>

        <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-md">
          Ready to architect autonomous systems? I&apos;m available for full-time roles, contracts, and advisory engagements.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/notjitin/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-cyan-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-2">
              <Linkedin className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">LinkedIn</span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/not_jitin"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-teal-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-2">
              <Instagram className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-tighter">Instagram</span>
          </motion.a>
        </div>

        {/* Connect Expandable Card */}
        <div 
          className={`relative rounded-[32px] border transition-all duration-500 overflow-hidden shadow-2xl ${
            isExpanded 
              ? 'bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border-cyan-500/40 ring-1 ring-cyan-500/20' 
              : 'bg-white/[0.02] border-white/[0.08] active:scale-[0.98]'
          }`}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(true)}
                className="w-full flex items-center justify-between p-6 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-[#0a0a0f]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold text-white tracking-tight">Connect</span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Direct Options</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white tracking-tight">Connect</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Choose a channel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Vertical Options - Better for mobile than horizontal icons */}
                <div className="space-y-3">
                  {contactOptions.map((option, idx) => (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      target={option.label === "WhatsApp" ? "_blank" : undefined}
                      rel={option.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-between p-5 rounded-2xl border bg-gradient-to-r ${option.color} ${option.borderColor} group shadow-lg`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-active:bg-white/10 transition-colors">
                          <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-white">{option.label}</span>
                          <span className="text-xs text-slate-400">
                            {option.label === "Email" ? "not.jitin@gmail.com" : option.label === "Call" ? "+91 90088 98642" : "Quick chat"}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-active:text-white transition-all group-active:translate-x-1" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Encrypted Communication</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Availability Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-emerald-500/40 transition-all duration-300 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <p className="text-base text-emerald-400 font-semibold uppercase tracking-tight">Available for new opportunities</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Full-time", "Contract", "Advisory"].map((t, i) => (
            <span key={i} className="px-4 py-2 text-xs font-bold bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 uppercase tracking-widest">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
     </section>
  );
}
