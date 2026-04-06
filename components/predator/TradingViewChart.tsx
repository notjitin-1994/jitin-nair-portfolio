"use client";

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'dark' | 'light';
  interval?: string;
}

function TradingViewChart({ 
  symbol = "FX:XAUUSD", 
  theme = "dark", 
  interval = "1" 
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = container.current;
    
    // Clear container to prevent duplicate widgets
    if (containerElement) {
      containerElement.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "calendar": false,
      "studies": [
        "STD;Relative_Strength_Index",
        "STD;Average_True_Range"
      ],
      "support_host": "https://www.tradingview.com"
    });

    if (containerElement) {
      containerElement.appendChild(script);
    }

    return () => {
      if (containerElement) {
        containerElement.innerHTML = "";
      }
    };
  }, [symbol, theme, interval]);

  return (
    <div className="tradingview-widget-container w-full h-full min-h-[400px]" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
}

export default memo(TradingViewChart);
