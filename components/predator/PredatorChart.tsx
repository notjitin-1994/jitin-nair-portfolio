"use client";

import { useEffect, useRef, useState } from "react";
import { 
  createChart, 
  ColorType, 
  IChartApi, 
  ISeriesApi, 
  AreaSeries, 
  CandlestickSeries,
  LineStyle, 
  CrosshairMode,
  Time
} from "lightweight-charts";
import { aggregateTicksToOHLC } from "@/utils/predator/ohlc";

interface ChartProps {
  data: any[];
  signals?: any[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  isOHLC?: boolean;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
    upColor?: string;
    downColor?: string;
  };
}

export function PredatorChart({
  data,
  signals = [],
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isOHLC = false,
  colors: {
    backgroundColor = "transparent",
    lineColor = "#22d3ee",
    textColor = "#71717a",
    areaTopColor = "rgba(34, 211, 238, 0.2)",
    areaBottomColor = "rgba(34, 211, 238, 0.0)",
    upColor = "#22c55e",
    downColor = "#ef4444",
  } = {},
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area" | "Candlestick"> | null>(null);
  const [chartType, setChartType] = useState<"candle" | "area">("candle");
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // 1. Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: "rgba(34, 211, 238, 0.05)" },
        horzLines: { color: "rgba(34, 211, 238, 0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 380,
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(34, 211, 238, 0.5)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#0891b2",
        },
        horzLine: {
          color: "rgba(34, 211, 238, 0.5)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#0891b2",
        },
      },
      timeScale: {
        borderColor: "rgba(34, 211, 238, 0.1)",
        timeVisible: true,
        secondsVisible: true,
        shiftVisibleRangeOnNewBar: true,
      },
    });

    let series: ISeriesApi<"Area" | "Candlestick">;
    if (chartType === "area") {
      series = chart.addSeries(AreaSeries, {
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
        lineWidth: 2,
      });
    } else {
      series = chart.addSeries(CandlestickSeries, {
        upColor,
        downColor,
        borderVisible: false,
        wickUpColor: upColor,
        wickDownColor: downColor,
      });
    }

    chartRef.current = chart;
    seriesRef.current = series;

    // Load initial data
    if (dataRef.current.length > 0) {
      if (isOHLC) {
        series.setData(dataRef.current as any);
      } else {
        const aggregated = aggregateTicksToOHLC(dataRef.current, 60);
        series.setData(aggregated as any);
      }
    }

    // Handle Resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    // Infinite Scroll Implementation
    const handleVisibleTimeRangeChange = () => {
        const timeScale = chart.timeScale();
        const visibleRange = timeScale.getVisibleLogicalRange();
        if (visibleRange !== null && visibleRange.from < 10 && hasMore && !isLoadingMore) {
           onLoadMore?.();
        }
    };
    
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleTimeRangeChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(handleVisibleTimeRangeChange);
      chart.remove();
    };
  }, [backgroundColor, textColor, lineColor, areaTopColor, areaBottomColor, upColor, downColor, chartType, hasMore, isLoadingMore, onLoadMore, isOHLC]);

  // 2. Update Data & Markers (Real-time updates)
  useEffect(() => {
    if (!seriesRef.current || !data.length) return;

    if (isOHLC) {
      seriesRef.current.setData(data as any);
    } else {
      const formattedData = chartType === "area" 
        ? data.map((item) => ({
            time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as Time,
            value: Number(item.bid || item.price || item.close),
          })).sort((a, b) => (a.time as number) - (b.time as number))
        : aggregateTicksToOHLC(data, 60);
      
      const uniqueData = Array.from(
        new Map(formattedData.map((item: any) => [item.time, item])).values()
      ).sort((a: any, b: any) => (a.time as number) - (b.time as number));
      
      seriesRef.current.setData(uniqueData as any);
    }

    if (signals.length > 0) {
      const markers = signals.map(sig => ({
        time: Math.floor(new Date(sig.timestamp).getTime() / 1000) as Time,
        position: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'belowBar' : 'aboveBar',
        color: (sig.signal || sig.direction).includes('LONG') ? '#22c55e' : '#ef4444',
        shape: (sig.signal || sig.direction).includes('LONG') ? 'arrowUp' : 'arrowDown',
        text: (sig.signal || sig.direction).includes('LONG') ? 'LONG' : 'SHORT',
      }));
      
      if (seriesRef.current && 'setMarkers' in (seriesRef.current as any)) {
        (seriesRef.current as any).setMarkers(markers.sort((a, b) => (a.time as number) - (b.time as number)));
      }
    }
  }, [data, signals, chartType, isOHLC]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div className="absolute top-2 left-4 z-20 flex space-x-2">
        <button 
          onClick={() => setChartType("candle")}
          className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${chartType === 'candle' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:text-white'}`}
        >
          Candles
        </button>
        <button 
          onClick={() => setChartType("area")}
          className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${chartType === 'area' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:text-white'}`}
        >
          Area
        </button>
      </div>
      {isLoadingMore && (
        <div className="absolute top-2 right-4 z-20">
          <span className="text-[9px] font-mono text-cyan-400 animate-pulse uppercase tracking-widest">Loading History...</span>
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
