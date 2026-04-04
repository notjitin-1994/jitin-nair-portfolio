"use client";

import { useEffect, useRef, useState } from "react";
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
  const isInitialDataLoaded = useRef(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({
        width: chartContainerRef.current?.clientWidth || 800,
      });
    };

    if (!chartRef.current) {
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

      seriesRef.current = chartRef.current.addSeries(AreaSeries, {
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {
    return () => {
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
            isInitialDataLoaded.current = false;
        }
    }
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !data || data.length === 0) return;

    const formattedData = data.map((item) => ({
      time: Math.floor(new Date(item.timestamp || item.ts).getTime() / 1000) as any,
      value: item.bid ? parseFloat(item.bid) : parseFloat(item.price || item.close),
    })).sort((a, b) => a.time - b.time);
    
    const uniqueData = Array.from(new Map(formattedData.map(item => [item.time, item])).values());

    if (!isInitialDataLoaded.current) {
      // First load: Replace everything
      seriesRef.current.setData(uniqueData);
      isInitialDataLoaded.current = true;
    } else {
      // Subsequent ticks: only update the newest tick to prevent memory/render lag
      const latestTick = uniqueData[uniqueData.length - 1];
      if (latestTick) {
        seriesRef.current.update(latestTick);
      }
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
