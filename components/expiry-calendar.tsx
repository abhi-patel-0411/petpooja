"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, Calendar, List, Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type ExpiryItem = {
  id: string
  name: string
  quantity: string
  expiryDate: string
  category: "Produce" | "Meat" | "Seafood" | "Dairy" | "Other"
  imageUrl?: string
  addedDate: string
}

export default function ExpiryTracker() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())
  const [items, setItems] = useState<ExpiryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [today] = useState<Date>(new Date())

  // Simulate real-time data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Generate mock data with realistic expiry dates
      const mockData: ExpiryItem[] = [
        {
          id: "1",
          name: "Organic Spinach",
          quantity: "200g",
          expiryDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
          category: "Produce",
          addedDate: new Date().toISOString()
        },
        {
          id: "2",
          name: "Atlantic Salmon",
          quantity: "1.2kg",
          expiryDate: new Date(Date.now() + 2 * 86400000).toISOString(), // 2 days
          category: "Seafood",
          addedDate: new Date().toISOString()
        },
        // More items...
      ]
      
      setItems(mockData)
      setLoading(false)
    }

    fetchData()
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Calculate days left for an item
  const getDaysLeft = (expiryDate: string): number => {
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Get color based on days left
  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 0) return "text-red-600 bg-red-50 border-red-100"
    if (daysLeft <= 2) return "text-amber-600 bg-amber-50 border-amber-100"
    if (daysLeft <= 5) return "text-yellow-600 bg-yellow-50 border-yellow-100"
    return "text-green-600 bg-green-50 border-green-100"
  }

  // Get category badge
  const getCategoryBadge = (category: string) => {
    const baseClasses = "text-xs font-medium"
    switch (category) {
      case "Produce":
        return <Badge className={`${baseClasses} bg-green-100 text-green-800 hover:bg-green-200 border-green-200`}>{category}</Badge>
      case "Meat":
        return <Badge className={`${baseClasses} bg-red-100 text-red-800 hover:bg-red-200 border-red-200`}>{category}</Badge>
      case "Seafood":
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200`}>{category}</Badge>
      case "Dairy":
        return <Badge className={`${baseClasses} bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200`}>{category}</Badge>
      default:
        return <Badge className={`${baseClasses}`} variant="outline">{category}</Badge>
    }
  }

  // Get items expiring in a specific day
  const getItemsForDay = (dayOffset: number) => {
    return items.filter(item => {
      const daysLeft = getDaysLeft(item.expiryDate)
      return daysLeft === dayOffset
    })
  }

  // Week navigation
  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() + (direction === "prev" ? -7 : 7))
    setCurrentWeek(newDate)
  }

  // Render loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-[180px]" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-[80px]" />
            <Skeleton className="h-9 w-[80px]" />
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-[72px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
            <span className="sr-only">Next week</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            {currentWeek.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={view === "list" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setView("list")}
            className="gap-1"
          >
            <List className="h-4 w-4" />
            <span>List</span>
          </Button>
          <Button 
            variant={view === "calendar" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setView("calendar")}
            className="gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No items expiring soon</h3>
              <p className="text-sm text-muted-foreground">
                Your inventory looks good! No items are close to expiry.
              </p>
            </div>
          ) : (
            [...items]
              .sort((a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate))
              .map((item) => {
                const daysLeft = getDaysLeft(item.expiryDate)
                const isExpired = daysLeft <= 0
                
                return (
                  <Card 
                    key={item.id} 
                    className={`p-4 flex items-center justify-between transition-all hover:shadow-md ${
                      isExpired ? "border-red-200" : daysLeft <= 2 ? "border-amber-200" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isExpired ? "bg-red-100" : 
                        daysLeft <= 2 ? "bg-amber-100" : 
                        daysLeft <= 5 ? "bg-yellow-100" : "bg-green-100"
                      }`}>
                        <Clock className={`h-5 w-5 ${
                          isExpired ? "text-red-600" : 
                          daysLeft <= 2 ? "text-amber-600" : 
                          daysLeft <= 5 ? "text-yellow-600" : "text-green-600"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{item.name}</h3>
                          {getCategoryBadge(item.category)}
                        </div>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        isExpired ? "text-red-600" : 
                        daysLeft <= 2 ? "text-amber-600" : 
                        daysLeft <= 5 ? "text-yellow-600" : "text-green-600"
                      }`}>
                        {isExpired ? "Expired" : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                )
              })
          )}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center font-medium text-sm p-2 text-muted-foreground">
              {day}
            </div>
          ))}
          
          {Array.from({ length: 42 }).map((_, index) => {
            const date = new Date(currentWeek)
            date.setDate(date.getDate() - date.getDay() + 1 + index) // Start from Monday
            
            const isCurrentMonth = date.getMonth() === currentWeek.getMonth()
            const isToday = date.toDateString() === today.toDateString()
            const dayNumber = date.getDate()
            
            const itemsForDay = items.filter(item => {
              const itemDate = new Date(item.expiryDate)
              return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear()
              )
            })
            
            return (
              <div
                key={index}
                className={`min-h-[100px] border rounded-md p-1 ${
                  !isCurrentMonth ? "bg-muted/30 text-muted-foreground/50" :
                  isToday ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className={`text-right text-sm p-1 ${
                  isToday ? "font-bold text-primary" : "font-medium"
                }`}>
                  {dayNumber}
                </div>
                
                {itemsForDay.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {itemsForDay.slice(0, 2).map((item) => {
                      const daysLeft = getDaysLeft(item.expiryDate)
                      const isExpired = daysLeft <= 0
                      
                      return (
                        <div
                          key={item.id}
                          className={`text-xs p-1 rounded truncate ${
                            isExpired ? "bg-red-100 text-red-800" :
                            daysLeft <= 2 ? "bg-amber-100 text-amber-800" :
                            daysLeft <= 5 ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.name}
                        </div>
                      )
                    })}
                    {itemsForDay.length > 2 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{itemsForDay.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      
      {/* Summary statistics */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <StatCard 
          title="Total Items" 
          value={items.length} 
          change={0} 
          icon={<List className="h-4 w-4" />}
        />
        <StatCard 
          title="Expiring Soon" 
          value={items.filter(i => getDaysLeft(i.expiryDate) <= 2).length} 
          change={0}
          icon={<Clock className="h-4 w-4 text-amber-600" />}
          variant="warning"
        />
        <StatCard 
          title="Expired" 
          value={items.filter(i => getDaysLeft(i.expiryDate) <= 0).length} 
          change={0}
          icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
          variant="danger"
        />
        <StatCard 
          title="Fresh" 
          value={items.filter(i => getDaysLeft(i.expiryDate) > 5).length} 
          change={0}
          icon={<Check className="h-4 w-4 text-green-600" />}
          variant="success"
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon, variant = "default" }: {
  title: string
  value: number
  change: number
  icon: React.ReactNode
  variant?: "default" | "success" | "danger" | "warning"
}) {
  const variantClasses = {
    default: "bg-muted text-foreground",
    success: "bg-green-50 text-green-800",
    danger: "bg-red-50 text-red-800",
    warning: "bg-amber-50 text-amber-800",
  }
  
  return (
    <Card className={`p-4 ${variantClasses[variant]}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/50">
          {icon}
        </div>
      </div>
    </Card>
  )
}