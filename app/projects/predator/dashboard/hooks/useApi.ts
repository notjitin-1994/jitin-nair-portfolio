'use client';

import useSWR from 'swr';
import { 
  CurrentPrice, 
  PriceData, 
  AgentStatus, 
  RegimeData, 
  ApiHealth 
} from '../types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.glitchzerolabs.com';

// Base fetcher with error handling
const fetcher = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

// Hook for API health check
export const useApiHealth = () => {
  return useSWR<ApiHealth>('/api/health', fetcher, {
    refreshInterval: 10000, // 10 seconds
    errorRetryCount: 3,
  });
};

// Hook for current price
export const useCurrentPrice = () => {
  return useSWR<CurrentPrice>('/api/price/current', fetcher, {
    refreshInterval: 1000, // 1 second
    errorRetryCount: 3,
  });
};

// Hook for price history
export const usePriceHistory = (limit: number = 100) => {
  return useSWR<PriceData[]>(`/api/price/history?limit=${limit}`, fetcher, {
    refreshInterval: 1000, // 1 second
    errorRetryCount: 3,
  });
};

// Hook for agent status
export const useAgentStatus = () => {
  const { data, error, isLoading } = useSWR<any>('/api/status', fetcher, {
    refreshInterval: 10000, // 10 seconds
    errorRetryCount: 3,
  });
  
  return {
    data: data?.agents ? Object.values(data.agents) as AgentStatus[] : [],
    isLoading,
    error
  };
};

// Hook for current regime
export const useCurrentRegime = () => {
  return useSWR<RegimeData>('/api/regime/current', fetcher, {
    refreshInterval: 30000, // 30 seconds (regime changes slowly)
    errorRetryCount: 3,
  });
};

// Hook for sentinel signal
export const useSentinelSignal = () => {
  return useSWR<any>('/api/status', fetcher, {
    refreshInterval: 10000, // 10 seconds
    errorRetryCount: 3,
  });
};

// Hook for last update time
export const useLastUpdate = () => {
  const { data: price } = useCurrentPrice();
  const { data: agents } = useAgentStatus();
  
  const lastPriceUpdate = price?.timestamp;
  const lastAgentUpdate = agents?.[0]?.lastSeen;
  
  return {
    lastUpdate: lastPriceUpdate || lastAgentUpdate || null,
    isLoading: !price && !agents,
  };
};
