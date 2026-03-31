'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { 
  DashboardData, 
  CurrentPrice, 
  AgentStatus, 
  RegimeData, 
  SentinelData, 
  ExecutionMetrics,
  PulseUpdate
} from '../types/dashboard';

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
// Provider
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
// WebSocket URL: replace http/https with ws/wss
const WS_URL = API_URL.replace(/^http/, 'ws') + '/api/v1/pulse';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Data state
  const [data, setData] = useState<DashboardData>({
    price: null,
    macro: {},
    agents: [],
    regime: null,
    sentinel: null,
    execution: null,
    health: null,
  });

  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Data Fetch (Synchronized Snapshot)
  const fetchSnapshot = useCallback(async () => {
    try {
      // Use the new v1 status endpoint for atomic state
      const res = await fetch(`${API_URL}/api/v1/status`);
      if (!res.ok) throw new Error('API failed');
      
      const snapshot = await res.json();
      const executionRes = await fetch(`${API_URL}/api/v1/execution/status`);
      const execution = executionRes.ok ? await executionRes.json() : null;
      const macroRes = await fetch(`${API_URL}/api/v1/macro/current`);
      const macroData = macroRes.ok ? await macroRes.json() : {};

      const priceRes = await fetch(`${API_URL}/api/v1/price/current`);
      const price = priceRes.ok ? await priceRes.json() : null;

      setData(prev => ({
        ...prev,
        price: price || snapshot.price,
        agents: snapshot.agents || [],
        regime: snapshot.regime,
        sentinel: snapshot.sentinel,
        execution: execution,
        macro: macroData,
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
      setConnectionStatus('connected');
    };

    ws.onmessage = (event) => {
      try {
        const update: PulseUpdate = JSON.parse(event.data);
        if (update.type === 'PULSE_UPDATE') {
          setData(prev => ({
            ...prev,
            price: update.data.price,
            macro: update.data.macro
          }));
          setLastUpdate(new Date().toLocaleTimeString());
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
