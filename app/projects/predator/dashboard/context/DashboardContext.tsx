'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { 
  DashboardData, 
  AgentStatus, 
  SentinelData, 
  AresMetrics,
  Position,
  Trade,
  StrategyState,
  PulseUpdate,
  RegimeData
} from '../types/dashboard';

// ============================================================================
// Context
// ============================================================================

interface DashboardContextType extends DashboardData {
  positions: Position[];
  trades: Trade[];
  signal: SentinelData | null;
  ares: AresMetrics | null;
  strategy: StrategyState | null;
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
// Mock Data (V4.0 - Paper Mode 100% Risk)
// ============================================================================

const MOCK_ARES: AresMetrics = {
  mode: 'paper',
  balance: 20.00,
  peakBalance: 25.00,
  dailyPnl: 2.25,
  dailyPnlPercent: 11.25,
  winRate: 70.2,
  totalTrades: 142,
  openPositions: 2,
  dailyLossUsed: 0.45,
  dailyLossLimit: 20.00, // 100% Risk Appetite
  drawdown: 0.45,
  maxDrawdown: 100.0, // 100% allowed
  riskStatus: 'CLEAR',
  cooldown: null
};

const MOCK_AGENTS: AgentStatus[] = [
  { name: 'Hermes', status: 'active', uptime: '14d 2h', cpu: 1.2, memory: 45, lastSeen: new Date().toISOString() },
  { name: 'Argus', status: 'active', uptime: '14d 2h', cpu: 4.5, memory: 120, lastSeen: new Date().toISOString(), lastRegime: 'TREND_UP' },
  { name: 'Athena', status: 'active', uptime: '14d 2h', cpu: 2.1, memory: 85, lastSeen: new Date().toISOString(), strategy: 'EMA_PULLBACK' },
  { name: 'Apollo', status: 'active', uptime: '14d 2h', cpu: 3.8, memory: 150, lastSeen: new Date().toISOString(), lastSignal: 'LONG' },
  { name: 'Sentinel', status: 'active', uptime: '14d 2h', cpu: 0.5, memory: 30, lastSeen: new Date().toISOString() }
];

const MOCK_REGIME: RegimeData = {
  regime: 'TREND_UP',
  confidence: 0.88,
  timestamp: new Date().toISOString(),
  volatility: 0.0012,
  trendStrength: 0.75,
  hmm_confidence: 0.92,
  changePointProb: 0.05,
  runLength: 14,
  features: {
    m5: { regime: 'TREND_UP', confidence: 0.88 },
    m15: { regime: 'TREND_UP', confidence: 0.82 },
    h1: { regime: 'RANGE', confidence: 0.65 }
  }
};

const MOCK_SIGNAL: SentinelData = {
  signal: 'ENTER_LONG',
  confidence: 0.85,
  regime: 'TREND_UP',
  logic: 'Strong bullish alignment across M5/M15 with positive OFI (+0.42) and macro support from DXY weakness.',
  timestamp: new Date().toISOString(),
  data_used: {
    dxy_change: -0.15,
    ofi: 0.42,
    sentiment: 0.65,
    prob_long: 0.85,
    prob_short: 0.05,
    prob_wait: 0.10
  }
};

const MOCK_TRADES: Trade[] = [
  { id: 't1', direction: 'LONG', entryPrice: 2150.20, exitPrice: 2155.40, pnl: 0.52, pnlPercent: 0.24, closeReason: 'TP', duration: '45m', closedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), strategy: 'EMA_PULLBACK' },
  { id: 't2', direction: 'SHORT', entryPrice: 2158.10, exitPrice: 2156.30, pnl: 0.18, pnlPercent: 0.08, closeReason: 'MANUAL', duration: '12m', closedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), strategy: 'SCALPER_V4' },
  { id: 't3', direction: 'LONG', entryPrice: 2145.50, exitPrice: 2142.10, pnl: -0.34, pnlPercent: -0.15, closeReason: 'SL', duration: '1h 5m', closedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), strategy: 'BREAKOUT' },
  { id: 't4', direction: 'LONG', entryPrice: 2140.20, exitPrice: 2148.90, pnl: 0.87, pnlPercent: 0.41, closeReason: 'TP', duration: '2h 10m', closedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(), strategy: 'EMA_PULLBACK' }
];

const MOCK_POSITIONS: Position[] = [
  { id: 'p1', direction: 'LONG', entryPrice: 2160.40, currentPrice: 2162.15, pnl: 0.17, pnlPercent: 0.08, sl: 2155.00, tp: 2175.00, progress: 35, strategy: 'EMA_PULLBACK', openedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() }
];

// ============================================================================
// Provider
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const WS_URL = (API_URL || '').replace(/^http/, 'ws') + '/api/v1/pulse';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Data state initialized with high-quality mock for portfolio presentation
  const [data, setData] = useState<DashboardData>({
    price: { symbol: 'XAUUSD', price: 2162.15, timestamp: new Date().toISOString(), source: 'cTrader', change: 0.25, changePercent: 0.01 },
    macro: {},
    agents: MOCK_AGENTS,
    regime: MOCK_REGIME,
    signal: MOCK_SIGNAL,
    positions: MOCK_POSITIONS,
    trades: MOCK_TRADES,
    ares: MOCK_ARES,
    strategy: { current: { strategy_id: 'EMA_PULLBACK', regime: 'TREND_UP', confidence_score: 0.85, selection_reason: 'Trend persistence' } },
    news: [],
    health: { status: 'healthy', timestamp: new Date().toISOString(), version: '4.0.0' },
  });

  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasReceivedInitialPulse = useRef<boolean>(false);

  // 1. Snapshot Fetch (Fallback/Initial)
  const fetchSnapshot = useCallback(async () => {
    if (hasReceivedInitialPulse.current) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/status`);
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      
      const snapshot = await res.json();
      
      setData(prev => ({
        ...prev,
        price: snapshot.price || prev.price,
        agents: snapshot.agents || prev.agents,
        regime: snapshot.regime || prev.regime,
        signal: snapshot.sentinel || snapshot.signal || prev.signal,
        macro: snapshot.macro || prev.macro,
        news: snapshot.news || prev.news,
        positions: snapshot.positions || prev.positions,
        trades: snapshot.trades || prev.trades,
        ares: snapshot.ares || snapshot.execution || prev.ares,
        strategy: snapshot.strategy || prev.strategy,
        health: { status: 'healthy', timestamp: new Date().toISOString() }
      }));
      
      setLastUpdate(new Date().toLocaleTimeString());
      setConnectionStatus('connected');
    } catch (err) {
      console.log('API not reachable, maintaining high-quality mock state for demo.');
      setConnectionStatus('disconnected');
    }
  }, []);

  // 2. Real-Time Pulse (WebSockets)
  const connectPulse = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
      };

      ws.onmessage = (event) => {
        try {
          const update: any = JSON.parse(event.data);
          if (update.type === 'PULSE_UPDATE') {
            hasReceivedInitialPulse.current = true;
            setData(prev => ({
              ...prev,
              ...update.data
            }));
            setLastUpdate(new Date().toLocaleTimeString());
          }
        } catch (err) {
          console.error('Pulse error:', err);
        }
      };

      ws.onclose = () => {
        if (!hasReceivedInitialPulse.current) {
          setConnectionStatus('disconnected');
        }
      };
    } catch (e) {
      setConnectionStatus('disconnected');
    }
  }, []);

  // Lifecycle
  useEffect(() => {
    fetchSnapshot();
    // connectPulse(); // Disabled for static portfolio to avoid error noise, let manual reconnect handle it

    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [fetchSnapshot, connectPulse]);

  // Public Interface
  const reconnect = useCallback(() => {
    setConnectionStatus('connecting');
    connectPulse();
  }, [connectPulse]);

  const refresh = useCallback(async () => {
    await fetchSnapshot();
  }, [fetchSnapshot]);

  const value = useMemo(() => ({
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
