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
// Zero-Mock Configuration
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const WS_URL = (API_URL || '').replace(/^http/, 'ws') + '/api/v1/pulse';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // INITIAL STATE IS NULL/EMPTY - NO MOCKS ALLOWED
  const [data, setData] = useState<DashboardData>({
    price: { symbol: 'XAUUSD', price: 0, timestamp: new Date().toISOString(), source: 'DISCONNECTED', change: 0, changePercent: 0 },
    macro: {},
    agents: [],
    regime: null as any,
    signal: null,
    positions: [],
    trades: [],
    ares: null,
    strategy: null as any,
    news: [],
    health: { status: 'down', timestamp: new Date().toISOString(), version: '4.0.0' },
  });

  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string>('--:--:--');

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasReceivedInitialPulse = useRef<boolean>(false);

  // 1. Snapshot Fetch (The Only Source of Truth)
  const fetchSnapshot = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/status`);
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      
      const snapshot = await res.json();
      
      setData({
        price: snapshot.price,
        agents: snapshot.agents || [],
        regime: snapshot.regime,
        signal: snapshot.sentinel || snapshot.signal,
        macro: snapshot.macro || {},
        news: snapshot.news || [],
        positions: snapshot.positions || [],
        trades: snapshot.trades || [],
        ares: snapshot.ares || snapshot.execution,
        strategy: snapshot.strategy,
        health: { status: 'healthy', timestamp: new Date().toISOString(), version: '4.0.0' }
      });
      
      setLastUpdate(new Date().toLocaleTimeString());
      setConnectionStatus('connected');
      hasReceivedInitialPulse.current = true;
    } catch (err) {
      console.warn('Real-time data fetch failed. Dashboard remaining in OFFLINE state.');
      setConnectionStatus('disconnected');
      // DO NOT SET MOCK DATA HERE
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
              ...update.data,
              health: { status: 'healthy', timestamp: new Date().toISOString(), version: '4.0.0' }
            }));
            setLastUpdate(new Date().toLocaleTimeString());
          }
        } catch (err) {
          console.error('Pulse processing error:', err);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
      };
    } catch (e) {
      setConnectionStatus('disconnected');
    }
  }, []);

  // Lifecycle
  useEffect(() => {
    fetchSnapshot();
    const interval = setInterval(fetchSnapshot, 10000); // Regular polling if WS fails

    return () => {
      clearInterval(interval);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [fetchSnapshot]);

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
