'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, Database, Cpu, Gauge, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { AnimatedCounter } from '@/app/components/ui/AnimatedCounter';

const metrics = [
  { id: "latency", label: "Ares Latency", value: 8.4, unit: "ms", suffix: " p99", description: "Signal to execution precision across institutional sockets", trend: "up", trendValue: "Institutional", category: "performance", color: "#22d3ee" },
  { id: "accuracy", label: "Regime Detection", value: 91.2, unit: "%", description: "MLARD accuracy on non-stationary XAU/USD data", trend: "up", trendValue: "+35%", category: "accuracy", color: "#14b8a6" },
  { id: "integrity", label: "Model Drift", value: 0.1, unit: " PSI", description: "Continuous feature stability monitoring via PSI", trend: "stable", trendValue: "Active", category: "integrity", color: "#2dd4bf" },
  { id: "data-volume", label: "Data Throughput", value: 5000, unit: "tps", suffix: "+", description: "Real-time tick and depth messages processed", trend: "up", trendValue: "Scalable", category: "data", color: "#06b6d4" },
  { id: "false-switches", label: "False Switches", value: 12.5, unit: "%", description: "Reduction in regime flickering via Hysteresis memory", trend: "down", trendValue: "-60%", category: "accuracy", color: "#14b8a6" },
  { id: "compute", label: "Compute Speed", value: 10, unit: "x", description: "Vectorized Numba JIT compiled indicator engine", trend: "up", trendValue: "Linear", category: "performance", color: "#22d3ee" },
  { id: "inference", label: "Inference Speed", value: 6.2, unit: "ms", description: "Average MLARD decision loop latency", trend: "down", trendValue: "-4ms", category: "performance", color: "#22d3ee" },
  { id: "coverage", label: "Regime Coverage", value: 80, unit: "%", description: "Validated market states successfully classified", trend: "up", trendValue: "+33%", category: "integrity", color: "#2dd4bf" },
];

const categoryIcons = {
  performance: Zap,
  accuracy: BarChart3,
  integrity: ShieldCheck,
  data: Database,
};

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  down: { icon: TrendingDown, color: 'text-teal-400', bgColor: 'bg-teal-400/10' },
  stable: { icon: Minus, color: 'text-slate-400', bgColor: 'bg-slate-400/10' },
};

function TrendBadge({ trend, value }: { trend?: string; value?: string }) {
  if (!trend || !value) return null;
  const config = trendConfig[trend as keyof typeof trendConfig];
  const Icon = config.icon;
  
  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bgColor} border border-white/5`}>
      <Icon className={`w-2.5 h-2.5 ${config.color}`} />
      <span className={`text-[9px] font-mono font-bold uppercase ${config.color}`}>{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
      />
    </div>
  );
}

export function MetricsDashboard() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">System Performance</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display tracking-tight text-white">Institutional Benchmarks</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Real-time verification of the Predator MLARD engine, demonstrating sub-10ms precision and institutional-grade model stability.
          </p>
        </motion.div>

        {/* Metrics Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {metrics.map((metric, index) => {
            const Icon = categoryIcons[metric.category as keyof typeof categoryIcons];
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-3xl overflow-hidden active:scale-[0.98] transition-all shadow-2xl"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${metric.color}15, transparent 70%)` }}
                />

                <div className="relative">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border border-white/5 shadow-inner"
                        style={{ backgroundColor: `${metric.color}10` }}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" style={{ color: metric.color }} />
                      </div>
                    </div>
                    <TrendBadge trend={metric.trend} value={metric.trendValue} />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tighter">
                      <AnimatedCounter 
                        value={metric.value} 
                        suffix={metric.suffix || metric.unit} 
                        decimals={metric.value < 1 ? 2 : (metric.value < 10 ? 1 : 0)} 
                        duration={2} 
                      />
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-slate-200 text-xs sm:text-sm font-bold mb-1 tracking-tight">{metric.label}</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs mb-4 leading-relaxed font-light line-clamp-2">{metric.description}</p>

                  {/* Progress Bar */}
                  <ProgressBar 
                    value={metric.value} 
                    max={metric.unit === '%' ? 100 : (metric.id === 'compute' ? 12 : metric.value * 1.4)}
                    color={metric.color} 
                  />
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-600 font-bold">{metric.category}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${metric.color}40` }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-8 sm:gap-16 py-6 border-y border-white/[0.05]"
        >
          {[
            { label: 'Market', value: 'XAU/USD' },
            { label: 'Precision', value: 'Sub-10ms' },
            { label: 'Algorithm', value: 'MLARD v2' },
            { label: 'Uptime', value: '99.9%' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white tracking-tighter italic font-mono">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MetricsDashboard;
