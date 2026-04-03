"use client";

import { useEffect, useState } from "react";
import { Database, Table } from "lucide-react";

export default function DatabasePage() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fields-dish-intervals-maui.trycloudflare.com/api/v1/execution/trades")
      .then((res) => res.json())
      .then((data) => {
        setTrades(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="text-cyan-400" size={24} />
        <h2 className="text-2xl font-serif text-white">TimescaleDB Explorer</h2>
      </div>

      <div className="bg-depth border border-cyan-400/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-mono text-cyan-400 flex items-center">
            <Table size={16} className="mr-2" />
            public.trades
          </h3>
          <span className="text-xs font-mono text-zinc-500">{trades.length} Rows (Limit 20)</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-surface/50 text-zinc-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Time (UTC)</th>
                <th className="px-6 py-3">Direction</th>
                <th className="px-6 py-3">Entry Price</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 animate-pulse">
                    Querying database...
                  </td>
                </tr>
              ) : trades.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    0 rows returned. System is actively monitoring.
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-3 text-zinc-500">{trade.id.substring(0, 8)}...</td>
                    <td className="px-6 py-3 text-zinc-300">
                      {new Date(trade.entry_time).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${trade.direction === 'LONG' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-cyan-400">{parseFloat(trade.entry_price).toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs">
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
