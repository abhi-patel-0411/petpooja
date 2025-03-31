"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

// Mock data for waste by category
const wasteCategoryData = {
  labels: ["Produce", "Meat", "Seafood", "Dairy", "Bakery", "Prepared Foods"],
  datasets: [
    {
      label: "Waste by Weight (kg)",
      data: [45, 18, 12, 15, 22, 12],
      backgroundColor: [
        "rgba(34, 197, 94, 0.7)",
        "rgba(239, 68, 68, 0.7)",
        "rgba(59, 130, 246, 0.7)",
        "rgba(250, 204, 21, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(251, 146, 60, 0.7)",
      ],
      borderColor: [
        "rgba(34, 197, 94, 1)",
        "rgba(239, 68, 68, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(250, 204, 21, 1)",
        "rgba(168, 85, 247, 1)",
        "rgba(251, 146, 60, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

export default function WasteCategoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!chartRef.current) return
  
    // Dynamically import Chart.js
    import("chart.js").then((ChartModule) => {
      const { Chart } = ChartModule // Extract Chart from module
      const ctx = chartRef.current!.getContext("2d")
  
      // Clean up previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
  
      chartInstanceRef.current = new Chart(ctx!, {
        type: "pie",
        data: wasteCategoryData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: ${value}kg (${percentage}%)`
                },
              },
            },
          },
        },
      })
    })
  
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [])
  

  return (
    <Card className="p-0 border-0">
      <div className="h-[400px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </Card>
  )
}

