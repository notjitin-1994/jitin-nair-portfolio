"use client";

import { useEffect, useState } from 'react';
import { socketService } from './socket';

export function usePredatorSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastTick, setLastTick] = useState<any>(null);
  const [lastRegime, setLastRegime] = useState<any>(null);
  const [lastSignal, setLastSignal] = useState<any>(null);

  useEffect(() => {
    const socket = socketService.connect();

    function onConnect() {
      console.log("Hook: Socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Hook: Socket disconnected");
      setIsConnected(false);
    }

    function onTick(data: any) {
      setLastTick(data);
    }

    function onRegime(data: any) {
      setLastRegime(data);
    }

    function onSignal(data: any) {
      setLastSignal(data);
    }

    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('xauusd_ticks', onTick);
    socket.on('predator:regime', onRegime);
    socket.on('predator:signals', onSignal);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('xauusd_ticks', onTick);
      socket.off('predator:regime', onRegime);
      socket.off('predator:signals', onSignal);
    };
  }, []);

  return { isConnected, lastTick, lastRegime, lastSignal };
}
