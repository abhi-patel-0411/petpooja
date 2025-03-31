"use client";

import { useEffect, useRef } from "react";
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Card } from "@/components/ui/card";

// Register Chart.js components
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Mock data for inventory levels
const inventoryData = {
  labels: ["Tomatoes", "Onions", "Chicken", "Rice", "Lettuce", "Potatoes", "Beef"],
  datasets: [
    {
      label: "Current Stock",
      data: [12, 19, 8, 15, 5, 14, 7],
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
    },
    {
      label: "Reorder Point",
      data: [5, 7, 4, 6, 3, 5, 3],
      backgroundColor: "rgba(239, 68, 68, 0.5)",
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 1,
    },
  ],
};

export default function InventoryLevelsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (ctx) {
      // Destroy previous instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: inventoryData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Quantity (kg)" },
              grid: { color: "rgba(0, 0, 0, 0.05)" },
            },
            x: {
              grid: { display: false },
            },
          },
        },
      });
    }

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
