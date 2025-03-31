"use client"

import { useEffect, useRef } from "react"

export default function WasteHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 500

    // Draw kitchen layout
    drawKitchenLayout(ctx)

    // Draw heatmap
    drawHeatmap(ctx)

    // Draw legend
    drawLegend(ctx)
  }, [])

  const drawKitchenLayout = (ctx: CanvasRenderingContext2D) => {
    // Background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, 800, 500)

    // Kitchen outline
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.strokeRect(50, 50, 700, 400)

    // Prep stations
    drawStation(ctx, 100, 100, 150, 100, "Prep Station 1")
    drawStation(ctx, 100, 250, 150, 100, "Prep Station 2")

    // Cooking area
    drawStation(ctx, 350, 100, 200, 150, "Cooking Area")

    // Plating area
    drawStation(ctx, 350, 300, 200, 100, "Plating Area")

    // Storage
    drawStation(ctx, 600, 100, 100, 150, "Storage")

    // Dishwashing
    drawStation(ctx, 600, 300, 100, 100, "Dishwashing")
  }

  const drawStation = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
  ) => {
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, width, height)

    ctx.fillStyle = "#475569"
    ctx.font = "12px sans-serif"
    ctx.fillText(label, x + 10, y + 20)
  }

  const drawHeatmap = (ctx: CanvasRenderingContext2D) => {
    // Prep Station 1 (High waste)
    drawHeatSpot(ctx, 175, 150, 70, "high")

    // Cooking Area (Medium waste)
    drawHeatSpot(ctx, 450, 175, 80, "medium")

    // Plating Area (Low waste)
    drawHeatSpot(ctx, 450, 350, 60, "low")

    // Prep Station 2 (Medium waste)
    drawHeatSpot(ctx, 175, 300, 50, "medium")
  }

  const drawHeatSpot = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    intensity: "low" | "medium" | "high",
  ) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

    if (intensity === "high") {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
    } else if (intensity === "medium") {
      gradient.addColorStop(0, "rgba(250, 204, 21, 0.8)")
      gradient.addColorStop(1, "rgba(250, 204, 21, 0)")
    } else {
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.8)")
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
    }

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawLegend = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 14px sans-serif"
    ctx.fillText("Waste Intensity:", 50, 480)

    // High
    ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
    ctx.beginPath()
    ctx.arc(200, 480, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#1e293b"
    ctx.fillText("High", 220, 485)

    // Medium
    ctx.fillStyle = "rgba(250, 204, 21, 0.8)"
    ctx.beginPath()
    ctx.arc(280, 480, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#1e293b"
    ctx.fillText("Medium", 300, 485)

    // Low
    ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
    ctx.beginPath()
    ctx.arc(380, 480, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#1e293b"
    ctx.fillText("Low", 400, 485)
  }

  return (
    <div className="flex justify-center">
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto" }}></canvas>
      </div>
    </div>
  )
}

