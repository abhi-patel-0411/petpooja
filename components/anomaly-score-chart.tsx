"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register necessary chart elements
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const anomalyScoreData = {
  labels: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"],
  datasets: [
    {
      label: "Transaction Count",
      data: [420, 350, 280, 190, 120, 80, 50, 30, 15, 8],
      backgroundColor: [
        "rgba(34, 197, 94, 0.7)",
        "rgba(34, 197, 94, 0.7)",
        "rgba(74, 222, 128, 0.7)",
        "rgba(134, 239, 172, 0.7)",
        "rgba(250, 204, 21, 0.7)",
        "rgba(251, 146, 60, 0.7)",
        "rgba(249, 115, 22, 0.7)",
        "rgba(248, 113, 113, 0.7)",
        "rgba(239, 68, 68, 0.7)",
        "rgba(220, 38, 38, 0.7)",
      ],
      borderWidth: 1,
      borderColor: [
        "rgba(34, 197, 94, 1)",
        "rgba(34, 197, 94, 1)",
        "rgba(74, 222, 128, 1)",
        "rgba(134, 239, 172, 1)",
        "rgba(250, 204, 21, 1)",
        "rgba(251, 146, 60, 1)",
        "rgba(249, 115, 22, 1)",
        "rgba(248, 113, 113, 1)",
        "rgba(239, 68, 68, 1)",
        "rgba(220, 38, 38, 1)",
      ],
    },
  ],
};

export default function AnomalyScoreChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Clean up previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx!, {
      type: "bar",
      data: anomalyScoreData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => `Anomaly Score: ${tooltipItems[0].label}`,
              label: (context) => `Transactions: ${context.raw}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Transactions",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Anomaly Score Range",
            },
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
