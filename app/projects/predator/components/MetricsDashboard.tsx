'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, Database, Cpu, Gauge } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';

const metrics = [
  { id: "latency", label: "Execution Latency", value: 47, unit: "ms", description: "End-to-end signal to execution (p99)", trend: "stable", trendValue: "p99", category: "performance", color: "#22d3ee" },
  { id: "accuracy", label: "Regime Detection", value: 88, unit: "%", description: "Classification accuracy on out-of-sample data", trend: "up", trendValue: "+2.3%", category: "accuracy", color: "#14b8a6" },
  { id: "uptime", label: "System Uptime", value: 99.9, unit: "%", description: "24/7 continuous operation since deployment", trend: "stable", trendValue: "30d", category: "system", color: "#2dd4bf" },
  { id: "data-volume", label: "Data Processed", value: 222, unit: "MB", suffix: "+", description: "Tick data ingested and analyzed", trend: "up", trendValue: "+12MB/day", category: "data", color: "#06b6d4" },
  { id: "agents", label: "Active Agents", value: 5, unit: "agents", description: "Specialized agents in production", trend: "stable", category: "system", color: "#2dd4bf" },
  { id: "signals", label: "Signals Generated", value: 1250, unit: "/day", description: "Daily trading signals evaluated", trend: "up", trendValue: "+5%", category: "data", color: "#06b6d4" },
  { id: "response-time", label: "API Response", value: 12, unit: "ms", description: "Dashboard API average response time", trend: "down", trendValue: "-15%", category: "performance", color: "#22d3ee" },
  { id: "win-rate", label: "Strategy Win Rate", value: 62.5, unit: "%", description: "Backtested win rate on 6 months data", trend: "up", trendValue: "+1.2%", category: "accuracy", color: "#14b8a6" },
];

const categoryIcons = {
  performance: Gauge,
  accuracy: Activity,
  system: Cpu,
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
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bgColor}`}>
      <Icon className={`w-3 h-3 ${config.color}`} />
      <span className={`text-[10px] sm:text-xs font-medium ${config.color}`}>{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </div>
  );
}

export function MetricsDashboard() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">System Metrics</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Performance at a Glance</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Real-time system metrics showcasing the performance and reliability of the Predator trading engine.
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
                whileHover={{ y: -2 }}
                className="group relative p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm overflow-hidden active:scale-[0.98] transition-transform"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${metric.color}10, transparent 70%)` }}
                />

                <div className="relative">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${metric.color}15` }}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: metric.color }} />
                      </div>
                      <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider hidden sm:inline">
                        {metric.category}
                      </span>
                    </div>
                    <TrendBadge trend={metric.trend} value={metric.trendValue} />
                  </div>

                  {/* Value */}
                  <div className="mb-1 sm:mb-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      <AnimatedCounter 
                        value={metric.value} 
                        suffix={metric.suffix || metric.unit} 
                        decimals={metric.value < 10 ? 1 : 0} 
                        duration={2} 
                      />
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-slate-300 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">{metric.label}</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs mb-2 sm:mb-3 leading-tight">{metric.description}</p>

                  {/* Progress Bar (Mobile-friendly sparkline alternative) */}
                  <ProgressBar 
                    value={metric.value} 
                    max={metric.unit === '%' ? 100 : metric.value * 1.5}
                    color={metric.color} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/10 via-transparent to-teal-500/10 border border-white/[0.08]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-left">
            {[
              { label: 'Trading Sessions', value: '24/7' },
              { label: 'Markets', value: 'XAU/USD' },
              { label: 'Timeframes', value: 'M5/M15/H1' },
              { label: 'Deployment', value: 'Systemd' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{item.value}</p>
                <p className="text-slate-500 text-[10px] sm:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MetricsDashboard;
