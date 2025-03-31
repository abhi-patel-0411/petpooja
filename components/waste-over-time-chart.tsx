"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Chart from "chart.js/auto"; // ✅ Directly import Chart.js

// Mock data for waste over time
const wasteOverTimeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Waste Value ($)",
      data: [1800, 1650, 1450, 1350, 1245],
      borderColor: "rgba(239, 68, 68, 0.8)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Waste Weight (kg)",
      data: [180, 165, 145, 135, 124],
      borderColor: "rgba(59, 130, 246, 0.8)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
      yAxisID: "y1",
    },
  ],
};

export default function WasteOverTimeChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: wasteOverTimeData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => tooltipItems[0].label,
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Waste Value ($)",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y1: {
            beginAtZero: true,
            position: "right",
            title: {
              display: true,
              text: "Waste Weight (kg)",
            },
            grid: {
              display: false,
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
      <div className="h-[400px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </Card>
  );
}
