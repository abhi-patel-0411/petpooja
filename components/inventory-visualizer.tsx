"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Clock, Filter, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InventoryVisualizer() {
  const [view, setView] = useState<"grid" | "shelf">("grid")
  const [filter, setFilter] = useState("all")

  // Mock data for inventory visualization
  const inventoryCategories = [
    {
      name: "Produce",
      items: [
        { name: "Tomatoes", quantity: 12.5, unit: "kg", status: "ok", expiryDays: 8 },
        { name: "Onions", quantity: 18.2, unit: "kg", status: "ok", expiryDays: 24 },
        { name: "Fresh Herbs", quantity: 0.8, unit: "kg", status: "expiring-soon", expiryDays: 1 },
        { name: "Potatoes", quantity: 15.0, unit: "kg", status: "ok", expiryDays: 29 },
        { name: "Bell Peppers", quantity: 4.5, unit: "kg", status: "expiring-soon", expiryDays: 3 },
        { name: "Lettuce", quantity: 2.3, unit: "kg", status: "expiring-soon", expiryDays: 2 },
        { name: "Carrots", quantity: 7.5, unit: "kg", status: "ok", expiryDays: 14 },
        { name: "Cucumbers", quantity: 3.2, unit: "kg", status: "ok", expiryDays: 7 },
      ],
    },
    {
      name: "Meat & Seafood",
      items: [
        { name: "Chicken Breast", quantity: 8.5, unit: "kg", status: "ok", expiryDays: 5 },
        { name: "Salmon", quantity: 4.2, unit: "kg", status: "expiring-soon", expiryDays: 2 },
        { name: "Ground Beef", quantity: 5.5, unit: "kg", status: "ok", expiryDays: 4 },
        { name: "Pork Chops", quantity: 3.8, unit: "kg", status: "ok", expiryDays: 5 },
      ],
    },
    {
      name: "Dairy",
      items: [
        { name: "Yogurt", quantity: 3.2, unit: "kg", status: "expiring-soon", expiryDays: 2 },
        { name: "Cheese", quantity: 2.5, unit: "kg", status: "ok", expiryDays: 14 },
        { name: "Milk", quantity: 6.0, unit: "L", status: "ok", expiryDays: 7 },
        { name: "Butter", quantity: 1.8, unit: "kg", status: "ok", expiryDays: 21 },
      ],
    },
    {
      name: "Dry Goods",
      items: [
        { name: "Rice", quantity: 25.0, unit: "kg", status: "ok", expiryDays: 230 },
        { name: "Flour", quantity: 12.0, unit: "kg", status: "ok", expiryDays: 199 },
        { name: "Pasta", quantity: 8.5, unit: "kg", status: "ok", expiryDays: 180 },
        { name: "Sugar", quantity: 5.0, unit: "kg", status: "ok", expiryDays: 365 },
      ],
    },
  ]

  const getStatusColor = (status: string, expiryDays: number) => {
    if (status === "expiring-soon") {
      return expiryDays <= 1 ? "bg-red-100 border-red-300" : "bg-amber-100 border-amber-300"
    } else if (status === "low-stock") {
      return "bg-blue-100 border-blue-300"
    } else {
      return "bg-green-100 border-green-300"
    }
  }

  const getStatusIcon = (status: string, expiryDays: number) => {
    if (status === "expiring-soon") {
      return <Clock className={`h-4 w-4 ${expiryDays <= 1 ? "text-red-600" : "text-amber-600"}`} />
    } else if (status === "low-stock") {
      return <ArrowDown className="h-4 w-4 text-blue-600" />
    } else {
      return <ArrowUp className="h-4 w-4 text-green-600" />
    }
  }

  const filteredCategories = inventoryCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (filter === "all") return true
        if (filter === "expiring-soon") return item.status === "expiring-soon"
        if (filter === "low-stock") return item.status === "low-stock"
        return true
      }),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
            Grid View
          </Button>
          <Button variant={view === "shelf" ? "default" : "outline"} size="sm" onClick={() => setView("shelf")}>
            Shelf View
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search items..." className="pl-8 w-[200px]" />
          </div>
          <Select defaultValue="all" onValueChange={setFilter} value={filter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-medium mb-3">{category.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.items.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getStatusColor(item.status, item.expiryDays)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.name}</h4>
                      {getStatusIcon(item.status, item.expiryDays)}
                    </div>
                    <p className="text-sm mb-1">
                      <span className="font-medium">{item.quantity}</span> {item.unit}
                    </p>
                    {item.status === "expiring-soon" && (
                      <Badge
                        variant="outline"
                        className={
                          item.expiryDays <= 1
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {item.expiryDays <= 1 ? "Expires today" : `${item.expiryDays} days left`}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">{category.name}</h3>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-card">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          item.status === "expiring-soon"
                            ? item.expiryDays <= 1
                              ? "bg-red-100"
                              : "bg-amber-100"
                            : "bg-green-100"
                        }`}
                      >
                        {getStatusIcon(item.status, item.expiryDays)}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                    {item.status === "expiring-soon" && (
                      <Badge
                        variant="outline"
                        className={
                          item.expiryDays <= 1
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {item.expiryDays <= 1 ? "Expires today" : `${item.expiryDays} days left`}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

