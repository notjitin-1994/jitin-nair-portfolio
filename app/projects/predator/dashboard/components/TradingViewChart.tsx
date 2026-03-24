'use client';

import { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  height?: number;
}

const TradingViewChart = memo(({ height = 450 }: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create unique ID for the container if it doesn't have one
    const chartId = 'tradingview_predator_5m';
    const widgetContainer = document.createElement('div');
    widgetContainer.id = chartId;
    widgetContainer.style.height = `${height}px`;
    widgetContainer.style.width = '100%';
    
    container.innerHTML = '';
    container.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          "autosize": true,
          "symbol": "OANDA:XAUUSD",
          "interval": "5",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "container_id": chartId,
          "backgroundColor": "rgba(10, 10, 15, 1)",
          "gridColor": "rgba(42, 46, 57, 0.06)",
          "withdateranges": true,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650"
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [height]);

  return (
    <div ref={containerRef} className="w-full rounded-xl overflow-hidden border border-white/[0.05]" />
  );
});

TradingViewChart.displayName = 'TradingViewChart';

export default TradingViewChart;
