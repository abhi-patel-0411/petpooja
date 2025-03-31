import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Calendar, Camera, Download, LineChart, Recycle, Trash2 } from "lucide-react"
import WasteOverTimeChart from "@/components/waste-over-time-chart"
import WasteCategoryChart from "@/components/waste-category-chart"
import WasteHeatmap from "@/components/waste-heatmap"

export default function WasteAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Waste Analysis</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last 30 Days</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ArrowDown className="h-3 w-3 mr-1" />
                15.3% less
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Total Waste Value</p>
              <h3 className="text-3xl font-bold mt-1">$1,245</h3>
              <p className="text-sm text-muted-foreground mt-1">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Recycle className="h-6 w-6 text-amber-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ArrowDown className="h-3 w-3 mr-1" />
                8.7% less
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Waste by Weight</p>
              <h3 className="text-3xl font-bold mt-1">124 kg</h3>
              <p className="text-sm text-muted-foreground mt-1">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                4.2% better
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Waste Efficiency</p>
              <h3 className="text-3xl font-bold mt-1">87.5%</h3>
              <p className="text-sm text-muted-foreground mt-1">Of inventory used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <Camera className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">Vision-Powered Waste Tracking</h3>
            <p className="text-sm text-green-700">
              Use our AI camera system to automatically categorize and log discarded food
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1 bg-white border-green-300 text-green-800 hover:bg-green-100"
          >
            <Camera className="h-4 w-4" />
            <span>Set Up Cameras</span>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="heatmap">Waste Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Waste Over Time</CardTitle>
              <CardDescription>Track your waste reduction progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteOverTimeChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Waste by Category</CardTitle>
              <CardDescription>Breakdown of waste by food category</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteCategoryChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Waste Heatmap</CardTitle>
              <CardDescription>Visual representation of waste hotspots in your kitchen</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteHeatmap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

