"use client";

import { useEffect, useRef } from "react";
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Card } from "@/components/ui/card";

// Register Chart.js components
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ingredientUsageData = {
  labels: ["Tomatoes", "Onions", "Chicken", "Beef", "Bell Peppers", "Lettuce", "Salmon"],
  datasets: [
    {
      label: "Number of Dishes Using Ingredient",
      data: [12, 15, 8, 6, 9, 7, 4],
      backgroundColor: [
        "rgba(239, 68, 68, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(251, 146, 60, 0.7)",
        "rgba(236, 72, 153, 0.7)",
        "rgba(34, 197, 94, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(59, 130, 246, 0.7)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function IngredientUsageChart() {
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
        data: ingredientUsageData,
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => tooltipItems[0].label,
                label: (context) => `Used in ${context.raw || 0} dishes`,
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              title: { display: true, text: "Number of Dishes" },
              grid: { color: "rgba(0, 0, 0, 0.05)" },
            },
            y: {
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
      <div className="h-[400px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </Card>
  );
}
