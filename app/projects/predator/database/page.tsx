"use client";

import { useEffect, useState } from "react";
import { Database, Search, ChevronLeft, ChevronRight, Download, Filter } from "lucide-react";

export default function DataVaultPage() {
  const [table, setTable] = useState("market_ticks");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jumpPage, setJumpPage] = useState("");

  const API_BASE_URL = "https://api.glitchzerolabs.com";
  // M8 FIX: API Authentication
  const headers = { 
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    "Content-Type": "application/json"
  };

  const tables = [
    { id: "market_ticks", name: "Price Ticks" },
    { id: "market_bars_m1", name: "M1 Bars" },
    { id: "market_bars_m5", name: "M5 Bars" },
    { id: "order_book_depth", name: "L2 Depth" },
    { id: "market_news", name: "Market News" }, // NEW DATASET
    { id: "apollo_signals", name: "Bayesian Signals" },
    { id: "regime_consensus", name: "Argus Regimes" },
    { id: "trades", name: "Trade History" },
    { id: "system_logs", name: "System Audit" },
  ];

  useEffect(() => {
    fetchData();
  }, [table, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/data/${table}?page=${page}&limit=25`, { headers });
      const result = await res.json();
      if (result.data) {
        setData(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (err) {
      console.error("Vault fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPage);
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      setJumpPage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white uppercase tracking-tighter flex items-center">
            <Database className="mr-3 text-cyan-400" size={24} />
            Institutional <span className="text-cyan-400 ml-2">Data Vault</span>
          </h2>
          <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">TimescaleDB Hypertable Explorer</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
            <Download size={18} />
          </button>
          <div className="h-8 w-px bg-zinc-800 mx-2" />
          <div className="flex bg-zinc-900 border border-zinc-800 rounded p-1">
            {tables.slice(0, 3).map((t) => (
              <button
                key={t.id}
                onClick={() => { setTable(t.id); setPage(1); }}
                className={`px-3 py-1 text-[10px] font-mono uppercase rounded ${table === t.id ? "bg-cyan-500 text-void" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface/30 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
              <Filter size={12} className="mr-2" /> Select Dataset
            </h3>
            <div className="space-y-1">
              {tables.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTable(t.id); setPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono transition-colors ${table === t.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20" : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-void border border-zinc-800 rounded-xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-500 uppercase tracking-widest">
                  <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-4 py-3 font-medium">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-20 text-center text-zinc-600 animate-pulse uppercase tracking-[0.2em]">
                        Querying Hypertable...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-20 text-center text-zinc-600 uppercase tracking-widest">
                        No records found in this sequence
                      </td>
                    </tr>
                  ) : (
                    data.map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30 transition-colors group">
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="px-4 py-2 text-zinc-400 group-hover:text-zinc-200">
                            {typeof val === 'object' ? JSON.stringify(val).slice(0, 20) + '...' : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900/50 border-t border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  disabled={page === 1 || loading}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2 bg-void border border-zinc-800 rounded disabled:opacity-30 hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-mono text-zinc-500 uppercase">
                  Page {page} <span className="mx-1">/</span> {totalPages}
                </span>
                <button 
                  disabled={page === totalPages || loading}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2 bg-void border border-zinc-800 rounded disabled:opacity-30 hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <form onSubmit={handleJump} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Jump..."
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  className="w-16 bg-void border border-zinc-800 rounded px-2 py-1 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                />
                <button type="submit" className="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 uppercase tracking-widest">Go</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
