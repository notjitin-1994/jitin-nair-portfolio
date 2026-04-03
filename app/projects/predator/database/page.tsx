"use client";

import { useEffect, useState } from "react";
import { Database, Table, ArrowRight } from "lucide-react";

export default function DatabasePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState("trades");

  const API_BASE_URL = "https://api.glitchzerolabs.com";

  const tables = [
    { id: "trades", name: "Executed Trades" },
    { id: "market_ticks", name: "Real-time Ticks" },
    { id: "market_bars_m1", name: "M1 Candles" },
    { id: "market_bars_m5", name: "M5 Candles" },
    { id: "order_book_depth", name: "L2 Order Book" },
    { id: "regime_consensus", name: "Regime History" },
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/data/${selectedTable}`)
      .then((res) => res.json())
      .then((json) => {
        setData(Array.isArray(json) ? json : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedTable]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Database className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-serif text-white tracking-tight uppercase">Predator <span className="text-cyan-400">Data Vault</span></h2>
        </div>
      </div>

      {/* Table Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => setSelectedTable(table.id)}
            className={`px-4 py-2 rounded-md font-mono text-xs transition-all ${
              selectedTable === table.id
                ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                : "bg-surface text-zinc-500 border border-zinc-800 hover:text-zinc-300"
            }`}
          >
            {table.name}
          </button>
        ))}
      </div>

      <div className="bg-depth border border-cyan-400/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-surface/30">
          <h3 className="font-mono text-xs text-zinc-400 flex items-center uppercase tracking-widest">
            <Table size={14} className="mr-2 text-cyan-400" />
            vault.public.{selectedTable}
          </h3>
          <span className="text-[10px] font-mono text-zinc-600 italic">Showing last 50 entries</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead className="bg-surface/50 text-zinc-500 uppercase tracking-tighter">
              <tr>
                {data.length > 0 ? (
                  Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-6 py-4 font-semibold border-b border-zinc-800">{key}</th>
                  ))
                ) : (
                  <th className="px-6 py-4 border-b border-zinc-800 text-center">No Data Available</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-zinc-600 animate-pulse italic">
                    Executing secure query...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-zinc-600">
                    Query returned 0 results. Data pipeline is active but no entries found for this window.
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i} className="hover:bg-cyan-400/5 transition-colors group">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-6 py-3 text-zinc-400 group-hover:text-zinc-200 truncate max-w-[200px]">
                        {typeof val === 'object' ? JSON.stringify(val).substring(0, 30) + '...' : String(val)}
                      </td>
                    ))}
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
