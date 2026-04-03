"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, AreaSeries } from "lightweight-charts";

interface ChartProps {
  data: any[];
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
  colors: {
    backgroundColor = "transparent",
    lineColor = "#22d3ee",
    textColor = "#a1a1aa",
    areaTopColor = "rgba(34, 211, 238, 0.4)",
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
      },
      grid: {
        vertLines: { color: "rgba(45, 212, 191, 0.1)" },
        horzLines: { color: "rgba(45, 212, 191, 0.1)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      crosshair: {
        vertLine: {
          color: "#22d3ee",
          width: 1,
          style: 3,
        },
        horzLine: {
          color: "#22d3ee",
          width: 1,
          style: 3,
        },
      }
    });

    // UPDATED for v5.x: Use addSeries(AreaSeries, ...)
    seriesRef.current = chartRef.current.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });

    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as any,
        value: item.bid ? parseFloat(item.bid) : parseFloat(item.price || item.close),
      })).sort((a, b) => a.time - b.time);
      
      const uniqueData = Array.from(new Map(formattedData.map(item => [item.time, item])).values());
      seriesRef.current.setData(uniqueData);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.remove();
    };
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
       const formattedData = data.map((item) => ({
        time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as any,
        value: item.bid ? parseFloat(item.bid) : parseFloat(item.price || item.close),
      })).sort((a, b) => a.time - b.time);
      const uniqueData = Array.from(new Map(formattedData.map(item => [item.time, item])).values());
      seriesRef.current.setData(uniqueData);
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
