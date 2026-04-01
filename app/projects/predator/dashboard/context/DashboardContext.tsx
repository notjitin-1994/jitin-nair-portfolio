'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { 
  DashboardData, 
  AgentStatus, 
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
  const hasReceivedInitialPulse = useRef<boolean>(false);

  // 1. Snapshot Fetch (Fallback/Initial)
  const fetchSnapshot = useCallback(async () => {
    // If pulse is already connected and delivering, skip expensive REST fetch
    if (hasReceivedInitialPulse.current) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/status`);
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      
      const snapshot = await res.json();
      
      setData(prev => ({
        ...prev,
        price: snapshot.price,
        agents: snapshot.agents || [],
        regime: snapshot.regime,
        signal: snapshot.sentinel,
        macro: snapshot.macro || {},
        news: snapshot.news || [],
        execution: snapshot.execution,
        strategy: snapshot.strategy,
        health: { status: 'healthy', timestamp: new Date().toISOString() }
      }));
      
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Initial snapshot fetch failed:', err);
      // Don't set error status here, let WS try to connect
    }
  }, []);

  // 2. Real-Time Pulse (WebSockets)
  const connectPulse = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    console.log('📡 Attempting connection to Predator Pulse...');
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('✅ Connected to Predator Pulse stream');
      setConnectionStatus('connected');
    };

    ws.onmessage = (event) => {
      try {
        const update: any = JSON.parse(event.data);
        
        // Handle protocol-level pulse updates
        if (update.type === 'PULSE_UPDATE') {
          hasReceivedInitialPulse.current = true;
          setData(prev => ({
            ...prev,
            ...update.data,
            health: { status: 'healthy', timestamp: new Date().toISOString() }
          }));
          setLastUpdate(new Date().toLocaleTimeString());
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Pulse update processing error:', err);
      }
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('🔌 Pulse stream closed cleanly');
      } else {
        console.warn('🔌 Pulse stream lost. Reconnecting in 5s...');
      }
      setConnectionStatus('disconnected');
      hasReceivedInitialPulse.current = false;
      
      // Clear existing timeout
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      
      // Reconnect with 5s delay to prevent hammering
      reconnectTimeoutRef.current = setTimeout(() => {
        connectPulse();
      }, 5000);
    };

    ws.onerror = (err) => {
      console.error('Pulse stream WebSocket error:', err);
      setConnectionStatus('error');
    };
  }, []);

  // Lifecycle
  useEffect(() => {
    fetchSnapshot();
    connectPulse();

    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null; // Prevent reconnect on unmount
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [fetchSnapshot, connectPulse]);

  // Public Interface
  const reconnect = useCallback(() => {
    if (wsRef.current) wsRef.current.close();
    hasReceivedInitialPulse.current = false;
    connectPulse();
  }, [connectPulse]);

  const refresh = useCallback(async () => {
    hasReceivedInitialPulse.current = false;
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
