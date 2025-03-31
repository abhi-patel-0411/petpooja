import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Download, Recycle, ShoppingCart, Utensils } from "lucide-react"
import InventoryLevelsChart from "@/components/inventory-levels-chart"
import WastePredictionChart from "@/components/waste-prediction-chart"
import ExpiryCalendar from "@/components/expiry-calendar"
import MenuSuggestions from "@/components/menu-suggestions"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Attention Required</AlertTitle>
        <AlertDescription className="text-yellow-700">
          3 ingredients are approaching expiry within the next 48 hours. Check the expiry calendar for details.
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 bg-white border-yellow-300 text-yellow-800 hover:bg-yellow-100"
        >
          View Expiry Calendar
        </Button>
      </Alert>

      {/* Metrics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Inventory Value"
          value="$12,450"
          change="+2.5%"
          trend="up"
          icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
        />
        <MetricCard
          title="Waste This Week"
          value="$320"
          change="-15.3%"
          trend="down"
          icon={<Recycle className="h-5 w-5 text-muted-foreground" />}
        />
        <MetricCard
          title="Menu Efficiency"
          value="87%"
          change="+4.2%"
          trend="up"
          icon={<Utensils className="h-5 w-5 text-muted-foreground" />}
        />
        <MetricCard
          title="Expiring Soon"
          value="8 items"
          change=""
          trend="neutral"
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="waste">Waste Analysis</TabsTrigger>
          <TabsTrigger value="menu">Menu Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Inventory Levels</CardTitle>
                <CardDescription>Current stock levels with AI-predicted reorder points</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryLevelsChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Waste Prediction</CardTitle>
                <CardDescription>Forecasted waste based on current inventory and sales trends</CardDescription>
              </CardHeader>
              <CardContent>
                <WastePredictionChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expiry Calendar</CardTitle>
              <CardDescription>Ingredients approaching expiry dates</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpiryCalendar />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Menu Suggestions</CardTitle>
              <CardDescription>Recommended dishes based on inventory and expiry dates</CardDescription>
            </CardHeader>
            <CardContent>
              <MenuSuggestions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Detailed inventory tracking with computer vision</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-20 text-muted-foreground">
                Inventory management content will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle>Waste Analysis</CardTitle>
              <CardDescription>Detailed breakdown of food waste and cost impact</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-20 text-muted-foreground">Waste analysis content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu Optimization</CardTitle>
              <CardDescription>AI-driven menu suggestions and profitability analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-20 text-muted-foreground">
                Menu optimization content will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        </div>
        {change && (
          <div className="mt-4 flex items-center">
            <span
              className={`text-xs font-medium ${
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs. last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

