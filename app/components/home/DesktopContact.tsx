"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  ChevronRight, 
  X, 
  Users 
} from "lucide-react";

export function DesktopContact() {
  const [isConnectExpanded, setIsConnectExpanded] = useState(false);

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

  const staticLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/notjitin-1994", description: "View Public Repos" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/notjitin/", description: "Connect professionally" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/not_jitin", description: "@not_jitin" },
  ];

  return (
     <section id="contact" className="py-6 md:py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
            >
              Get In Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Let&apos;s Build Something <span className="text-cyan-400">Extraordinary</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-slate-400 text-lg mb-8 max-w-lg"
            >
              Ready to architect autonomous systems? I&apos;m available for full-time roles,
              contracts, and advisory engagements.
            </motion.p>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 transition-all inline-block"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium">Available for new opportunities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Full-time", "Contract", "Advisory"].map((t, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Static Links */}
            {staticLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.3)" }}
                className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <link.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-slate-500">{link.description}</p>
              </motion.a>
            ))}

            {/* Interactive Connect Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                isConnectExpanded 
                  ? 'col-span-1 sm:col-span-1 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-500/40' 
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06]'
              }`}
            >
              <AnimatePresence mode="wait">
                {!isConnectExpanded ? (
                  <motion.button
                    key="connect-collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsConnectExpanded(true)}
                    className="w-full p-6 text-left cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors relative">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-[#0a0a0f]" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      Connect
                    </h3>
                    <p className="text-sm text-slate-500">Click to see options</p>
                  </motion.button>
                ) : (
                  <motion.div
                    key="connect-expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                          <Users className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white">Choose how to connect</p>
                          <p className="text-xs text-slate-400">Direct contact options</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsConnectExpanded(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    {/* Contact Options Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {contactOptions.map((option, index) => (
                        <motion.a
                          key={option.label}
                          href={option.href}
                          target={option.label === "WhatsApp" ? "_blank" : undefined}
                          rel={option.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-gradient-to-br ${option.color} ${option.borderColor} transition-all duration-200`}
                        >
                          <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                          <span className="text-sm font-medium text-slate-200">{option.label}</span>
                        </motion.a>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span>not.jitin@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Phone className="w-4 h-4 text-teal-400" />
                        <span>+91 90088 98642</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
     </section>
  );
}
