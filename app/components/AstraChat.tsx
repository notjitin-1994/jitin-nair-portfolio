"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "astra";
  text: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What is Jitin's most impressive build?",
  "Tell me about Predator Nexus V4.0.",
  "Is Jitin really an AI expert?",
  "How does Astra help Jitin?"
];

export function AstraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "astra",
      text: "Greetings. I am Astra, Jitin Nair's Digital Chief of Staff. How can I enlighten you regarding his agentic architecture today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    console.log("🚀 Astra Digital Chief of Staff: Neural Interface Initialized.");
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const ASTRA_API_URL = "https://api.glitchzerolabs.com/api/chat";
      const SHARED_SECRET = "astra-hype-secret-2026";

      const response = await fetch(ASTRA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SHARED_SECRET}`
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "astra",
        text: data.reply,
        timestamp: new Date()
      }]);
      
      if (data.sessionId) setSessionId(data.sessionId);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "astra",
        text: "My neural relays are currently under heavy load. Jitin has architected my recovery protocols, but for now, please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] p-4 rounded-full shadow-2xl transition-all duration-500",
          isOpen 
            ? "bg-slate-800 text-white rotate-90" 
            : "bg-gradient-to-br from-cyan-500 to-teal-500 text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[9999] w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-[#0f111a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0f111a] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">Astra</h3>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Digital Chief of Staff</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono">SANDBOX_V1</div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-cyan-500 text-white rounded-tr-none shadow-lg shadow-cyan-500/20" 
                      : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1.5 px-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions & Footer */}
            <div className="p-5 bg-gradient-to-t from-black/20 to-transparent">
              {messages.length < 3 && !isTyping && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 group"
                    >
                      <Sparkles className="w-3 h-3" />
                      {q}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Inquire about the architecture..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-50 disabled:bg-slate-700 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">
                  OpenClaw Agentic Bridge — v4.0.2
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
