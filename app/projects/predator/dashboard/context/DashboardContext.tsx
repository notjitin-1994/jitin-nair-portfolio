'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';

// ============================================================================
// Types - Matching the XAUUSD Trading Agents API
// ============================================================================

interface PriceTick {
  symbol: string;
  price: number;
  timestamp: string;
  change?: number;
  changePercent?: number;
  bid?: number;
  ask?: number;
  spread?: number;
}

interface AgentMetrics {
  name: string;
  status: 'running' | 'stopped' | 'failed' | 'degraded';
  pid?: number;
  cpu?: number;
  memory?: number;
  uptime?: string;
  throughput?: number;
  lastActivity?: string;
  barsToday?: number;
  lastRegime?: string;
  lastSignal?: string;
  strategy?: string;
}

interface RegimeState {
  regime: string;
  confidence: number;
  session?: string;
  volatility?: number;
  trendStrength?: number;
  barsProcessed?: number;
  timestamp: string;
  features?: {
    m5?: { regime: string; confidence: number; isActual?: boolean };
    m15?: { regime: string; confidence: number; isActual?: boolean };
    h1?: { regime: string; confidence: number; isActual?: boolean };
    volatility?: number;
    trendStrength?: number;
    barsProcessed?: number;
  };
}

interface SignalState {
  signal: 'LONG' | 'SHORT' | 'HOLD' | 'EXIT_LONG' | 'EXIT_SHORT' | 'NONE' | string;
  confidence: number;
  regime: string;
  macroAlignment?: boolean;
  dxyChange?: number;
  eurUsdChange?: number;
  usdJpyChange?: number;
  timestamp: string;
}

interface Position {
  id: string;
  symbol?: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  size?: number;
  position_size?: number;
  pnl: number;
  pnlPercent?: number;
  sl: number;
  tp: number;
  progress?: number;
  strategy?: string;
  regime?: string;
  openedAt?: string;
  entry_time?: string;
}

interface Trade {
  id: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent?: number;
  closeReason: 'TP' | 'SL' | 'MANUAL';
  duration: string;
  closedAt: string;
  strategy?: string;
}

interface ExecutionMetrics {
  mode: 'paper' | 'live';
  balance: number;
  peakBalance?: number;
  equity?: number;
  dailyPnl: number;
  dailyPnlPercent?: number;
  winRate: number;
  totalTrades?: number;
  openPositions: number;
  dailyLossUsed: number;
  dailyLossLimit?: number;
  drawdown: number;
  maxDrawdown?: number;
  riskStatus: 'CLEAR' | 'CAUTION' | 'BLOCKED';
  cooldown: string | null;
}

interface StrategyState {
  current?: {
    strategy_id: string;
    regime: string;
    confidence_score: number;
    parameters?: Record<string, any>;
    selection_reason?: string;
  };
}

interface DashboardData {
  price: PriceTick | null;
  agents: AgentMetrics[];
  regime: RegimeState | null;
  signal: SignalState | null;
  positions: Position[];
  trades: Trade[];
  execution: ExecutionMetrics | null;
  strategy: StrategyState | null;
  connected: boolean;
}

// ============================================================================
// Context
// ============================================================================

interface DashboardContextType extends DashboardData {
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastUpdate: string;
  reconnect: () => void;
  refresh: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

// ============================================================================
// Deep Equality Check
// ============================================================================

function deepEqual<T>(a: T, b: T): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual((a as any)[key], (b as any)[key])) return false;
  }

  return true;
}

// ============================================================================
// Provider
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.glitchzerolabs.com';
const POLL_INTERVAL = 2000; // 2 seconds for real-time feel

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Data state
  const [data, setData] = useState<DashboardData>({
    price: null,
    agents: [],
    regime: null,
    signal: null,
    positions: [],
    trades: [],
    execution: null,
    strategy: null,
    connected: false,
  });

  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);
  const isFirstFetchRef = useRef(true);

  // Keep previous data for comparison
  const prevDataRef = useRef<DashboardData>(data);

  // Fetch all data from the REST API
  const fetchAllData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      // Only show 'connecting' on first fetch
      if (isFirstFetchRef.current) {
        setConnectionStatus('connecting');
      }

      // Fetch all endpoints in parallel
      const [statusRes, priceRes, regimeRes, executionRes, positionsRes, tradesRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/status`),
        fetch(`${API_URL}/api/price/current`),
        fetch(`${API_URL}/api/regime/current`),
        fetch(`${API_URL}/api/execution/status`),
        fetch(`${API_URL}/api/execution/positions`),
        fetch(`${API_URL}/api/execution/trades?limit=20`),
      ]);

      // Parse responses
      const statusData = statusRes.status === 'fulfilled' && statusRes.value.ok
        ? await statusRes.value.json()
        : null;

      const priceData = priceRes.status === 'fulfilled' && priceRes.value.ok
        ? await priceRes.value.json()
        : null;

      const regimeData = regimeRes.status === 'fulfilled' && regimeRes.value.ok
        ? await regimeRes.value.json()
        : null;

      const executionData = executionRes.status === 'fulfilled' && executionRes.value.ok
        ? await executionRes.value.json()
        : null;

      const positionsData = positionsRes.status === 'fulfilled' && positionsRes.value.ok
        ? await positionsRes.value.json()
        : [];

      const tradesData = tradesRes.status === 'fulfilled' && tradesRes.value.ok
        ? await tradesRes.value.json()
        : [];

      // Transform agents
      let agentsArray: AgentMetrics[] = [];
      if (statusData?.agents && typeof statusData.agents === 'object') {
        agentsArray = Object.values(statusData.agents).filter((agent: any) =>
          agent && typeof agent === 'object' && agent.name
        ) as AgentMetrics[];
      }

      // Transform positions
      let transformedPositions: Position[] = [];
      if (Array.isArray(positionsData)) {
        transformedPositions = positionsData.map((p: any) => {
          const size = p?.size || p?.position_size || 0;
          const entryPrice = parseFloat(p?.entryPrice || p?.entry_price || 0);
          const currentPrice = parseFloat(p?.currentPrice || p?.current_price || 0);
          const pnl = parseFloat(p?.pnl || 0);

          return {
            id: p?.id || p?.position_id || 'unknown',
            symbol: p?.symbol,
            direction: p?.direction || 'LONG',
            entryPrice,
            currentPrice,
            size,
            position_size: size,
            pnl,
            pnlPercent: p?.pnlPercent || (entryPrice > 0 ? (pnl / (entryPrice * size)) * 100 : 0),
            sl: parseFloat(p?.sl || p?.stop_loss || 0),
            tp: parseFloat(p?.tp || p?.take_profit || 0),
            progress: p?.progress,
            strategy: p?.strategy || p?.strategy_id,
            regime: p?.regime,
            openedAt: p?.openedAt || p?.entry_time || p?.entryTime,
            entry_time: p?.entry_time || p?.entryTime,
          };
        });
      }

      // Transform trades
      let transformedTrades: Trade[] = [];
      if (Array.isArray(tradesData)) {
        transformedTrades = tradesData.map((t: any) => ({
          id: t?.id || t?.trade_id || 'unknown',
          direction: t?.direction || 'LONG',
          entryPrice: parseFloat(t?.entryPrice || t?.entry_price || 0),
          exitPrice: parseFloat(t?.exitPrice || t?.exit_price || 0),
          pnl: parseFloat(t?.pnl || 0),
          pnlPercent: parseFloat(t?.pnlPercent || t?.pnl_percent || 0),
          closeReason: t?.closeReason || t?.close_reason || 'MANUAL',
          duration: t?.duration || 'N/A',
          closedAt: t?.closedAt || t?.exit_time || t?.closed_at || new Date().toISOString(),
          strategy: t?.strategy || t?.strategy_id,
        }));
      }

      // Build new data object
      const newData: DashboardData = {
        price: priceData ? {
          ...priceData,
          price: typeof priceData.price === 'string' ? parseFloat(priceData.price) : priceData.price,
        } : prevDataRef.current.price,
        agents: agentsArray,
        regime: regimeData || (statusData?.regime ? {
          regime: statusData.regime.current,
          confidence: statusData.regime.confidence,
          timestamp: statusData.regime.timestamp,
        } : prevDataRef.current.regime),
        signal: statusData?.sentinel || prevDataRef.current.signal,
        positions: transformedPositions,
        trades: transformedTrades,
        execution: executionData ? {
          mode: executionData.mode || 'paper',
          balance: parseFloat(executionData.balance || 0),
          peakBalance: executionData.peakBalance ? parseFloat(executionData.peakBalance) : undefined,
          equity: executionData.equity ? parseFloat(executionData.equity) : undefined,
          dailyPnl: parseFloat(executionData.dailyPnl || 0),
          dailyPnlPercent: executionData.dailyPnlPercent ? parseFloat(executionData.dailyPnlPercent) : undefined,
          winRate: parseFloat(executionData.winRate || 0),
          totalTrades: executionData.totalTrades ? parseInt(executionData.totalTrades) : undefined,
          openPositions: parseInt(executionData.openPositions || 0),
          dailyLossUsed: parseFloat(executionData.dailyLossUsed || 0),
          dailyLossLimit: executionData.dailyLossLimit ? parseFloat(executionData.dailyLossLimit) : undefined,
          drawdown: parseFloat(executionData.drawdown || 0),
          maxDrawdown: executionData.maxDrawdown ? parseFloat(executionData.maxDrawdown) : undefined,
          riskStatus: executionData.riskStatus || 'CLEAR',
          cooldown: executionData.cooldown || null,
        } : prevDataRef.current.execution,
        strategy: statusData?.strategy ? { current: statusData.strategy } : prevDataRef.current.strategy,
        connected: !!statusData,
      };

      // Only update state if data actually changed
      if (!deepEqual(prevDataRef.current, newData)) {
        prevDataRef.current = newData;
        setData(newData);
        setLastUpdate(new Date().toLocaleTimeString());
      }

      setConnectionStatus(statusData ? 'connected' : 'error');
      isFirstFetchRef.current = false;
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setConnectionStatus('error');
      setData(prev => ({ ...prev, connected: false }));
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  // Start polling
  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    fetchAllData();
    intervalRef.current = setInterval(fetchAllData, POLL_INTERVAL);
  }, [fetchAllData]);

  // Stop polling
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Reconnect function
  const reconnect = useCallback(() => {
    isFirstFetchRef.current = true;
    setConnectionStatus('connecting');
    fetchAllData();
    startPolling();
  }, [fetchAllData, startPolling]);

  // Refresh function for manual refresh
  const refresh = useCallback(async () => {
    await fetchAllData();
  }, [fetchAllData]);

  // Set up polling on mount
  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  // Handle visibility change - pause/resume polling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startPolling, stopPolling]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<DashboardContextType>(() => ({
    ...data,
    connectionStatus,
    lastUpdate,
    reconnect,
    refresh,
  }), [data, connectionStatus, lastUpdate, reconnect, refresh]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
