"use client";

import { useEffect, useState } from 'react';
import { socketService } from './socket';

export function usePredatorSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastTick, setLastTick] = useState<any>(null);
  const [lastRegime, setLastRegime] = useState<any>(null);
  const [lastSignal, setLastSignal] = useState<any>(null);
  const [lastSystemLog, setLastSystemLog] = useState<any>(null);

  useEffect(() => {
    // Safe localStorage hydration
    try {
      const savedRegime = localStorage.getItem('predator_last_regime');
      const savedSignal = localStorage.getItem('predator_last_signal');
      
      if (savedRegime) setLastRegime(JSON.parse(savedRegime));
      if (savedSignal) setLastSignal(JSON.parse(savedSignal));
    } catch (e) {
      console.warn("Failed to hydrate predator state from localStorage", e);
    }

    const socket = socketService.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onTick(data: any) { 
      setLastTick(data); 
    }

    function onRegime(data: any) { 
      setLastRegime(data);
      try {
        localStorage.setItem('predator_last_regime', JSON.stringify(data));
      } catch (e) {}
    }

    function onSignal(data: any) { 
      setLastSignal(data);
      try {
        localStorage.setItem('predator_last_signal', JSON.stringify(data));
      } catch (e) {}
    }

    function onSystemLog(data: any) { 
      setLastSystemLog(data); 
    }

    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('xauusd_ticks', onTick);
    socket.on('predator:regime', onRegime);
    socket.on('predator:signals', onSignal);
    socket.on('predator:system_logs', onSystemLog);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('xauusd_ticks', onTick);
      socket.off('predator:regime', onRegime);
      socket.off('predator:signals', onSignal);
      socket.off('predator:system_logs', onSystemLog);
    };
  }, []);

  return { isConnected, lastTick, lastRegime, lastSignal, lastSystemLog, setLastRegime, setLastSignal };
}

