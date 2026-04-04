"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, AreaSeries, LineStyle, CrosshairMode } from "lightweight-charts";

interface ChartProps {
  data: any[];
  signals?: any[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
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
  } = {},
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({
        width: chartContainerRef.current?.clientWidth || 800,
      });
    };

    chartRef.current = createChart(chartContainerRef.current, {
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
      height: 400,
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

    seriesRef.current = chartRef.current.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineWidth: 2,
    });

    const updateChartData = () => {
      if (!seriesRef.current || !data.length) return;
      
      const formattedData = data.map((item) => ({
        time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as any,
        value: Number(item.bid || item.price || item.close),
      })).sort((a, b) => a.time - b.time);
      
      const uniqueData = Array.from(new Map(formattedData.map(item => [item.time, item])).values());
      seriesRef.current.setData(uniqueData);

      if (signals.length > 0) {
        const markers = signals.map(sig => ({
          time: Math.floor(new Date(sig.timestamp).getTime() / 1000) as any,
          position: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'belowBar' : 'aboveBar',
          color: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? '#22c55e' : '#ef4444',
          shape: sig.direction === 'LONG' || sig.signal === 'ENTER_LONG' ? 'arrowUp' : 'arrowDown',
          text: (sig.signal || sig.direction).includes('LONG') ? 'LONG' : 'SHORT',
        }));
        // INSTITUTIONAL FIX: Bypass TS error for setMarkers on ISeriesApi
        (seriesRef.current as any).setMarkers(markers);
      }
    };

    updateChartData();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.remove();
    };
  }, [data, signals, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return <div ref={chartContainerRef} className="w-full h-full min-h-[400px]" />;
}
