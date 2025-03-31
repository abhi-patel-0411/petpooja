"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { Chart } from "chart.js"

// Mock data for the chart
const fraudMetricsData = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Transactions",
        data: [320, 380, 420, 390, 450, 280, 310],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
      {
        label: "Flagged",
        data: [12, 8, 15, 10, 18, 5, 7],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
      },
    ],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Transactions",
        data: [1850, 2100, 1950, 2300],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
      {
        label: "Flagged",
        data: [45, 62, 38, 75],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
      },
    ],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Transactions",
        data: [7500, 8200, 7800, 8500, 9100],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
      {
        label: "Flagged",
        data: [180, 210, 165, 195, 220],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
      },
    ],
  },
}

export default function FraudMetricsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const isMobile = useMobile()
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  const renderChart = (period: "daily" | "weekly" | "monthly") => {
    if (!chartRef.current) return

    // Clean up previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: fraudMetricsData[period],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: isMobile ? "bottom" : "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
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
    })
  }

  useEffect(() => {
    renderChart(selectedPeriod)

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [selectedPeriod, isMobile])

  return (
    <Tabs
      defaultValue="daily"
      className="w-full"
      onValueChange={(value) => setSelectedPeriod(value as "daily" | "weekly" | "monthly")}
    >
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </div>

      <Card className="p-0 border-0">
        <div className="h-[300px] w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </Card>
    </Tabs>
  )
}
