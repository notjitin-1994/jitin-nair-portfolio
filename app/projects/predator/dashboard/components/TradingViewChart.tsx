'use client';

import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    // Clean up
    container.current.innerHTML = '';
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: "OANDA:XAUUSD",
          interval: "5",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1", // Candle
          locale: "en",
          enable_publishing: false,
          backgroundColor: "rgba(2, 6, 23, 1)", // void/midnight
          gridColor: "rgba(255, 255, 255, 0.03)",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: "tv_chart_container",
          studies: [
            "BollingerBands@tv-basicstudies",
            "RSI@tv-basicstudies"
          ]
        });
      }
    };
    container.current.appendChild(script);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[500px] bg-midnight border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl mb-6 relative"
    >
        <div id="tv_chart_container" ref={container} className="absolute inset-0"></div>
    </motion.div>
  );
}

export default memo(TradingViewChart);