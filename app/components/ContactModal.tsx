'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, X, Copy, Check } from 'lucide-react';

const CYAN = '#22d3ee';
const TEAL = '#14b8a6';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactMethods = [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: 'mailto:not.jitin@gmail.com',
      value: 'not.jitin@gmail.com',
      gradient: `linear-gradient(135deg, ${CYAN}20, ${CYAN}05)`,
      borderColor: `${CYAN}30`,
      hoverBorder: `${CYAN}60`,
    },
    {
      id: 'call',
      label: 'Call',
      icon: Phone,
      href: 'tel:+919008898642',
      value: '+91 90088 98642',
      gradient: `linear-gradient(135deg, ${TEAL}20, ${TEAL}05)`,
      borderColor: `${TEAL}30`,
      hoverBorder: `${TEAL}60`,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/919008898642',
      value: '+91 90088 98642',
      gradient: `linear-gradient(135deg, ${CYAN}15, ${TEAL}15)`,
      borderColor: `${CYAN}25`,
      hoverBorder: `${TEAL}50`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(10, 10, 15, 0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl"
              style={{
                background: 'rgba(18, 18, 26, 0.95)',
                border: `1px solid ${CYAN}20`,
                boxShadow: `0 0 60px ${CYAN}10, 0 25px 50px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  {/* Avatar/Icon */}
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${CYAN}20, ${TEAL}10)`,
                      border: `1px solid ${CYAN}30`,
                    }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={CYAN}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">Choose how to connect</h3>
                    <p className="text-sm text-slate-400">Direct contact options</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid rgba(255,255,255,0.1)`,
                  }}
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Contact Methods Grid */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={method.id}
                        href={method.href}
                        target={method.id === 'whatsapp' ? '_blank' : undefined}
                        rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        className="group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: method.gradient,
                          border: `1px solid ${method.borderColor}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = method.hoverBorder;
                          e.currentTarget.style.boxShadow = `0 0 20px ${method.borderColor}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = method.borderColor;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            background: method.id === 'call' ? `${TEAL}15` : `${CYAN}15`,
                          }}
                        >
                          <Icon 
                            className="w-6 h-6" 
                            style={{ color: method.id === 'call' ? TEAL : CYAN }}
                          />
                        </div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: method.id === 'call' ? TEAL : CYAN }}
                        >
                          {method.label}
                        </span>
                      </a>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 h-px" style={{ background: `linear-gradient(to right, transparent, ${CYAN}20, transparent)` }} />

                {/* Contact Details */}
                <div className="space-y-3">
                  {/* Email */}
                  <button
                    onClick={() => handleCopy('not.jitin@gmail.com', 'email')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl transition-all group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid rgba(255,255,255,0.06)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${CYAN}30`;
                      e.currentTarget.style.background = `${CYAN}05`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${CYAN}15` }}
                    >
                      <Mail className="w-5 h-5" style={{ color: CYAN }} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm text-slate-400 block">Email</span>
                      <span className="text-white font-medium">not.jitin@gmail.com</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === 'email' ? (
                        <Check className="w-5 h-5" style={{ color: TEAL }} />
                      ) : (
                        <Copy className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {/* Phone */}
                  <button
                    onClick={() => handleCopy('+91 90088 98642', 'phone')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl transition-all group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid rgba(255,255,255,0.06)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${TEAL}30`;
                      e.currentTarget.style.background = `${TEAL}05`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${TEAL}15` }}
                    >
                      <Phone className="w-5 h-5" style={{ color: TEAL }} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm text-slate-400 block">Phone</span>
                      <span className="text-white font-medium">+91 90088 98642</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === 'phone' ? (
                        <Check className="w-5 h-5" style={{ color: TEAL }} />
                      ) : (
                        <Copy className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer Glow */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(to right, transparent, ${CYAN}40, ${TEAL}40, transparent)`,
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Example usage component (trigger button)
export function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${CYAN}, ${TEAL})`,
          color: '#0a0a0f',
        }}
      >
        Get in Touch
      </button>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
