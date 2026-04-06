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
  CrosshairMode 
} from "lightweight-charts";
import { aggregateTicksToOHLC } from "@/utils/predator/ohlc";

interface ChartProps {
  data: any[];
  signals?: any[];
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

  // 1. Initialize Chart (Once or when chartType changes)
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

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [backgroundColor, textColor, lineColor, areaTopColor, areaBottomColor, upColor, downColor, chartType]);

  // 2. Update Data & Markers (On changes)
  useEffect(() => {
    if (!seriesRef.current || !data.length) return;

    if (chartType === "area") {
      const formattedData = data.map((item) => ({
        time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as any,
        value: Number(item.bid || item.price || item.close),
      })).sort((a, b) => a.time - b.time);
      
      const uniqueData = Array.from(
        new Map(formattedData.map(item => [item.time, item])).values()
      );
      seriesRef.current.setData(uniqueData as any);
    } else {
      const candleData = aggregateTicksToOHLC(data, 60); // 1m candles
      seriesRef.current.setData(candleData as any);
    }

    if (signals.length > 0) {
      const markers = signals.map(sig => ({
        time: Math.floor(new Date(sig.timestamp).getTime() / 1000) as any,
        position: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'belowBar' : 'aboveBar',
        color: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? '#22c55e' : '#ef4444',
        shape: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'arrowUp' : 'arrowDown',
        text: (sig.signal || sig.direction).includes('LONG') ? 'LONG' : 'SHORT',
      }));
      
      if (seriesRef.current && 'setMarkers' in (seriesRef.current as any)) {
        (seriesRef.current as any).setMarkers(markers);
      }
    }
  }, [data, signals, chartType]);

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
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
