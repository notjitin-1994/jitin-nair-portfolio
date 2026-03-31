'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { 
  DashboardData, 
  CurrentPrice, 
  AgentStatus, 
  RegimeData, 
  SentinelData, 
  ExecutionMetrics,
  Position,
  Trade,
  StrategyState,
  PulseUpdate
} from '../types/dashboard';

// ============================================================================
// Context
// ============================================================================

interface DashboardContextType extends DashboardData {
  positions: Position[];
  trades: Trade[];
  signal: SentinelData | null;
  execution: ExecutionMetrics | null;
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
// Provider
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
// WebSocket URL: replace http/https with ws/wss with safety check
const WS_URL = (API_URL || '').replace(/^http/, 'ws') + '/api/v1/pulse';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Data state
  const [data, setData] = useState<DashboardData>({
    price: null,
    macro: {},
    agents: [],
    regime: null,
    signal: null,
    positions: [],
    trades: [],
    execution: null,
    strategy: null,
    news: [],
    health: null,
  });

  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Snapshot Fetch (Unified)
  const fetchSnapshot = useCallback(async () => {
    try {
      setConnectionStatus('connecting');
      // Single call to get the entire system state
      const res = await fetch(`${API_URL}/api/v1/status`);
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      
      const snapshot = await res.json();
      
      // Secondary execution data (until unified in status)
      const [positionsRes, tradesRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/execution/positions`),
        fetch(`${API_URL}/api/v1/execution/trades?limit=20`)
      ]);

      const positions = positionsRes.ok ? await positionsRes.json() : [];
      const trades = tradesRes.ok ? await tradesRes.json() : [];

      setData(prev => ({
        ...prev,
        price: snapshot.price,
        agents: snapshot.agents || [],
        regime: snapshot.regime,
        signal: snapshot.sentinel,
        macro: snapshot.macro || {},
        news: snapshot.news || [],
        positions: positions,
        trades: trades,
        health: { status: 'healthy', timestamp: new Date().toISOString() }
      }));
      
      setLastUpdate(new Date().toLocaleTimeString());
      setConnectionStatus('connected');
    } catch (err) {
      console.error('Failed to fetch dashboard snapshot:', err);
      setConnectionStatus('error');
    }
  }, []);

  // 2. Real-Time Pulse (WebSockets)
  const connectPulse = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('✅ Connected to Predator Pulse stream');
    };

    ws.onmessage = (event) => {
      try {
        const update: any = JSON.parse(event.data);
        
        if (update.type === 'PING') {
          ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
          return;
        }

        if (update.type === 'PULSE_UPDATE') {
          setData(prev => ({
            ...prev,
            price: update.data.price || prev.price,
            macro: update.data.macro || prev.macro,
            regime: update.data.regime || prev.regime,
            signal: update.data.signal || prev.signal,
            news: update.data.news || prev.news,
            agents: update.data.agents || prev.agents,
            execution: update.data.execution || prev.execution
          }));
          setLastUpdate(new Date().toLocaleTimeString());
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Pulse update error:', err);
      }
    };

    ws.onclose = () => {
      console.warn('🔌 Pulse stream disconnected. Reconnecting...');
      setConnectionStatus('disconnected');
      // Exponential backoff or simple delay
      reconnectTimeoutRef.current = setTimeout(connectPulse, 3000);
    };

    ws.onerror = (err) => {
      console.error('Pulse stream error:', err);
      setConnectionStatus('error');
      ws.close();
    };
  }, []);

  // Lifecycle
  useEffect(() => {
    fetchSnapshot();
    connectPulse();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [fetchSnapshot, connectPulse]);

  // Public Interface
  const reconnect = useCallback(() => {
    if (wsRef.current) wsRef.current.close();
    fetchSnapshot();
    connectPulse();
  }, [fetchSnapshot, connectPulse]);

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
