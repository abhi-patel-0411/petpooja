"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Chart from "chart.js/auto"; // ✅ Ensure proper import

// Mock data for menu profitability
const menuProfitabilityData = {
  labels: ["Pasta Dishes", "Seafood", "Meat Entrees", "Appetizers", "Salads", "Desserts"],
  datasets: [
    {
      type: "bar",
      label: "Profit Margin (%)",
      data: [65, 72, 68, 75, 82, 85],
      backgroundColor: "rgba(34, 197, 94, 0.7)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
      yAxisID: "y",
    },
    {
      type: "line",
      label: "Popularity (Orders/Day)",
      data: [25, 18, 22, 30, 15, 12],
      borderColor: "rgba(59, 130, 246, 0.8)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
    },
  ],
};

export default function MenuProfitabilityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) {
      console.error("Canvas context is null.");
      return;
    }

    // 🛠️ Ensure the dataset is valid
    if (!menuProfitabilityData || !menuProfitabilityData.labels || !menuProfitabilityData.datasets) {
      console.error("Invalid chart data:", menuProfitabilityData);
      return;
    }

    // Destroy previous chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    try {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar", // ✅ Mixed chart support
        data: menuProfitabilityData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => tooltipItems[0]?.label ?? "N/A",
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw ?? "N/A";
                  return label.includes("Profit") ? `${label}: ${value}%` : `${label}: ${value} orders/day`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Profit Margin (%)",
              },
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              min: 0,
              max: 100,
            },
            y1: {
              beginAtZero: true,
              position: "right",
              title: {
                display: true,
                text: "Popularity (Orders/Day)",
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
    } catch (error) {
      console.error("Chart rendering error:", error);
    }

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
