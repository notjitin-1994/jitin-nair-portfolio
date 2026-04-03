"use client";

import { useEffect, useState } from "react";
import { Database, Table, ChevronLeft, ChevronRight, Hash } from "lucide-react";

export default function DatabasePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState("trades");
  const [jumpPage, setJumpPage] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 25
  });

  const API_BASE_URL = "https://api.glitchzerolabs.com";

  const tables = [
    { id: "trades", name: "Executed Trades" },
    { id: "market_ticks", name: "Real-time Ticks" },
    { id: "market_bars_m1", name: "M1 Candles" },
    { id: "market_bars_m5", name: "M5 Candles" },
    { id: "order_book_depth", name: "L2 Order Book" },
    { id: "regime_consensus", name: "Regime History" },
    { id: "apollo_signals", name: "Signal History" }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/data/${selectedTable}?page=${pagination.page}&limit=25`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
        if (json.pagination) {
          setPagination(prev => ({
            ...prev,
            total: json.pagination.total,
            totalPages: json.pagination.totalPages
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedTable, pagination.page]);

  const handleTableChange = (tableId: string) => {
    setSelectedTable(tableId);
    setPagination(prev => ({ ...prev, page: 1 }));
    setJumpPage("");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pagination.totalPages) {
      handlePageChange(pageNum);
    } else {
      setJumpPage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Database className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-serif text-white tracking-tight uppercase">Predator <span className="text-cyan-400">Data Vault</span></h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => handleTableChange(table.id)}
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

      <div className="bg-depth border border-cyan-400/10 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
        <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-surface/30">
          <h3 className="font-mono text-xs text-zinc-400 flex items-center uppercase tracking-widest">
            <Table size={14} className="mr-2 text-cyan-400" />
            vault.public.{selectedTable}
          </h3>
          <span className="text-[10px] font-mono text-zinc-600 italic">
            Total Entries: {pagination.total.toLocaleString()}
          </span>
        </div>
        
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead className="bg-surface/50 text-zinc-500 uppercase tracking-tighter sticky top-0 z-10 backdrop-blur-md">
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
                  <td colSpan={15} className="px-6 py-24 text-center text-zinc-600 animate-pulse italic">
                    Executing secure paged query...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={15} className="px-6 py-24 text-center text-zinc-600">
                    Query returned 0 results.
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i} className="hover:bg-cyan-400/5 transition-colors group">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-6 py-3 text-zinc-400 group-hover:text-zinc-200 truncate max-w-[200px]">
                        {typeof val === 'object' && val !== null ? JSON.stringify(val).substring(0, 30) + '...' : String(val)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* INSTITUTIONAL PAGINATION CONTROLS */}
        <div className="px-6 py-4 border-t border-zinc-800/50 bg-surface/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center space-x-4">
            <span>Page {pagination.page} of {pagination.totalPages || 1}</span>
            <form onSubmit={handleJumpSubmit} className="flex items-center space-x-2 border-l border-zinc-800 pl-4">
               <Hash size={12} className="text-zinc-600" />
               <input 
                 type="text"
                 placeholder="JUMP TO"
                 value={jumpPage}
                 onChange={(e) => setJumpPage(e.target.value)}
                 className="bg-void border border-zinc-800 text-[10px] px-2 py-1 rounded w-16 focus:outline-none focus:border-cyan-400/50 transition-colors text-zinc-300 placeholder:text-zinc-700"
               />
            </form>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="p-2 rounded bg-void border border-zinc-800 text-zinc-400 disabled:opacity-30 hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex items-center space-x-1">
               {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                 const pageNum = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4)) + i;
                 if (pageNum <= 0 || pageNum > pagination.totalPages) return null;
                 return (
                   <button
                     key={pageNum}
                     onClick={() => handlePageChange(pageNum)}
                     className={`w-8 h-8 rounded text-[10px] font-mono transition-all ${
                       pagination.page === pageNum 
                       ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                       : "text-zinc-600 hover:text-zinc-300"
                     }`}
                   >
                     {pageNum}
                   </button>
                 );
               })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="p-2 rounded bg-void border border-zinc-800 text-zinc-400 disabled:opacity-30 hover:text-cyan-400 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
