"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Chart from "chart.js/auto"; // ✅ Direct Import for stability

// Mock data for waste prediction
const wastePredictionData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Predicted Waste (kg)",
      data: [2.3, 1.8, 2.1, 1.5, 2.8, 3.2, 2.5],
      borderColor: "rgba(239, 68, 68, 0.8)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Actual Waste (kg)",
      data: [2.1, 1.6, 1.9, null, null, null, null], // Past data only
      borderColor: "rgba(59, 130, 246, 0.8)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
      spanGaps: true, // ✅ Allows skipping null values
    },
  ],
};

export default function WastePredictionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance before re-creating
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: wastePredictionData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const item = tooltipItems[0];
                const day = wastePredictionData.labels[item.dataIndex];
                return `${day}`;
              },
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.raw ?? "N/A"; // ✅ Handles null values
                return `${label}: ${value} kg`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Waste (kg)",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="p-0 border-0">
      <div className="h-[300px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </Card>
  );
}
