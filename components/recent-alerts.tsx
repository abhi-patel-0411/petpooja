"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, CheckCircle, Clock, ExternalLink, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample alerts data
const alertsData = [
  {
    id: "ALT-001",
    transactionId: "TRX-003",
    timestamp: "2023-05-15T13:15:00",
    amount: 12500.0,
    description: "Large transfer to new recipient",
    riskLevel: "high",
    anomalyScore: 87,
    status: "pending",
  },
  {
    id: "ALT-002",
    transactionId: "TRX-006",
    timestamp: "2023-05-15T16:30:00",
    amount: 8500.0,
    description: "International transfer to high-risk region",
    riskLevel: "high",
    anomalyScore: 78,
    status: "pending",
  },
  {
    id: "ALT-003",
    transactionId: "TRX-002",
    timestamp: "2023-05-15T11:45:00",
    amount: 5000.0,
    description: "Unusual withdrawal pattern detected",
    riskLevel: "medium",
    anomalyScore: 45,
    status: "reviewed",
  },
  {
    id: "ALT-004",
    transactionId: "TRX-008",
    timestamp: "2023-05-15T09:20:00",
    amount: 3200.0,
    description: "Multiple transactions in short timeframe",
    riskLevel: "medium",
    anomalyScore: 52,
    status: "resolved",
  },
  {
    id: "ALT-005",
    transactionId: "TRX-010",
    timestamp: "2023-05-14T14:45:00",
    amount: 15000.0,
    description: "Transaction amount exceeds typical pattern",
    riskLevel: "high",
    anomalyScore: 91,
    status: "escalated",
  },
]

export default function RecentAlerts({ showAll = false }: { showAll?: boolean }) {
  const [alerts, setAlerts] = useState(alertsData)

  const displayAlerts = showAll ? alerts : alerts.slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Info className="h-3 w-3 mr-1" />
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "reviewed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Reviewed
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      case "escalated":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Escalated
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {displayAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            "p-4 border rounded-lg",
            alert.riskLevel === "high"
              ? "border-red-200 bg-red-50"
              : alert.riskLevel === "medium"
                ? "border-yellow-200 bg-yellow-50"
                : "border-green-200 bg-green-50",
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Alert {alert.id}</h4>
                <span className="text-sm text-muted-foreground">Transaction {alert.transactionId}</span>
              </div>
              <p className="text-sm">{alert.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{formatDate(alert.timestamp)}</span>
                <span>•</span>
                <span className="font-medium">{formatCurrency(alert.amount)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                {getRiskBadge(alert.riskLevel)}
                {getStatusBadge(alert.status)}
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <span>Review</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {!showAll && (
        <Button variant="outline" className="w-full gap-1">
          <span>View All Alerts</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

