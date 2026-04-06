"use client";

import { useEffect, useRef, useState } from "react";
import { 
  createChart, 
  ColorType, 
  IChartApi, 
  ISeriesApi, 
  AreaSeries, 
  CandlestickSeries,
  HistogramSeries,
  LineStyle, 
  CrosshairMode,
  Time,
  createTextWatermark
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
    upColor = "#26a69a",
    downColor = "#ef5350",
  } = {},
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area" | "Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
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
        vertLines: { color: "rgba(42, 46, 57, 0.2)" },
        horzLines: { color: "rgba(42, 46, 57, 0.2)" },
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
        rightOffset: 12,
        barSpacing: 6,
      },
      handleScale: {
        axisPressedMouseMove: {
            time: true,
            price: true,
        },
      },
    });

    // Add Watermark (v5.1 Plugin API)
    const firstPane = chart.panes()[0];
    if (firstPane) {
        createTextWatermark(firstPane, {
            horzAlign: 'center',
            vertAlign: 'center',
            lines: [
                {
                    text: 'PREDATOR NEXUS',
                    color: 'rgba(34, 211, 238, 0.08)',
                    fontSize: 32,
                },
                {
                    text: 'XAUUSD LIVE',
                    color: 'rgba(34, 211, 238, 0.05)',
                    fontSize: 16,
                },
            ],
        });
    }

    // Main Series
    let series: ISeriesApi<"Area" | "Candlestick">;
    if (chartType === "area") {
      series = chart.addSeries(AreaSeries, {
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
        lineWidth: 2,
        priceFormat: {
            type: 'price',
            precision: 2,
            minMove: 0.01,
        },
      });
    } else {
      series = chart.addSeries(CandlestickSeries, {
        upColor,
        downColor,
        borderVisible: false,
        wickUpColor: upColor,
        wickDownColor: downColor,
        priceFormat: {
            type: 'price',
            precision: 2,
            minMove: 0.01,
        },
      });
    }

    // Volume Series
    const volumeSeries = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // overlay
    });

    volumeSeries.priceScale().applyOptions({
        scaleMargins: {
            top: 0.8,
            bottom: 0,
        },
    });

    chartRef.current = chart;
    seriesRef.current = series;
    volumeSeriesRef.current = volumeSeries;

    // Load initial data
    if (dataRef.current.length > 0) {
      const chartData = isOHLC ? dataRef.current : aggregateTicksToOHLC(dataRef.current, 60);
      series.setData(chartData as any);
      
      const volumeData = chartData.map((d: any) => ({
          time: d.time,
          value: d.volume || 0,
          color: d.close >= d.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
      }));
      volumeSeries.setData(volumeData as any);
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
        if (visibleRange !== null && visibleRange.from < 5 && hasMore && !isLoadingMore) {
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
    if (!seriesRef.current || !volumeSeriesRef.current || !data.length) return;

    if (isOHLC) {
      seriesRef.current.setData(data as any);
      const volumeData = data.map((d: any) => ({
          time: d.time,
          value: d.volume || 0,
          color: d.close >= d.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
      }));
      volumeSeriesRef.current.setData(volumeData as any);
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
      
      const volumeData = (uniqueData as any).map((d: any) => ({
          time: d.time,
          value: d.volume || 0,
          color: d.close >= d.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
      }));
      volumeSeriesRef.current.setData(volumeData as any);
    }

    if (signals.length > 0) {
      const markers = signals.map(sig => ({
        time: Math.floor(new Date(sig.timestamp).getTime() / 1000) as Time,
        position: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'belowBar' : 'aboveBar',
        color: (sig.signal || sig.direction).includes('LONG') ? '#26a69a' : '#ef5350',
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
        <div className="flex bg-void/60 backdrop-blur-md p-0.5 rounded-lg border border-white/5">
            <button 
            onClick={() => setChartType("candle")}
            className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${chartType === 'candle' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-zinc-500 hover:text-white'}`}
            >
            Candles
            </button>
            <button 
            onClick={() => setChartType("area")}
            className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${chartType === 'area' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-zinc-500 hover:text-white'}`}
            >
            Area
            </button>
        </div>
      </div>
      {isLoadingMore && (
        <div className="absolute top-2 right-4 z-20">
          <div className="flex items-center space-x-2 bg-void/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Syncing History...</span>
          </div>
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
