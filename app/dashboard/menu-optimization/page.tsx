import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Calendar, ChefHat, Clock, Download, LineChart, Sparkles, Utensils } from "lucide-react"
import MenuProfitabilityChart from "@/components/menu-profitability-chart"
import IngredientUsageChart from "@/components/ingredient-usage-chart"

export default function MenuOptimizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Menu Optimization</h1>
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

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Brain className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">AI Menu Recommendations</h3>
            <p className="text-sm text-blue-700">
              Our AI has generated 3 new dish recommendations based on your current inventory
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1 bg-white border-blue-300 text-blue-800 hover:bg-blue-100"
          >
            <Sparkles className="h-4 w-4" />
            <span>View Suggestions</span>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Menu Analysis
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Menu Items</p>
              <h3 className="text-3xl font-bold mt-1">42</h3>
              <p className="text-sm text-muted-foreground mt-1">Across all categories</p>
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
                Profitability
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Avg. Profit Margin</p>
              <h3 className="text-3xl font-bold mt-1">68%</h3>
              <p className="text-sm text-muted-foreground mt-1">Across all menu items</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Expiring Soon
              </Badge>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">Ingredients to Use</p>
              <h3 className="text-3xl font-bold mt-1">8</h3>
              <p className="text-sm text-muted-foreground mt-1">Expiring in 48 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggestions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="usage">Ingredient Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <div className="grid gap-6 md:grid-cols-3">
            <RecipeCard
              title="Herb-Crusted Salmon"
              description="Utilize expiring fresh herbs and salmon with this high-profit dish"
              ingredients={["Salmon (expires in 2 days)", "Fresh herbs (expires in 1 day)", "Lemon", "Garlic"]}
              profitMargin="72%"
              usesSoonExpiringItems={true}
            />

            <RecipeCard
              title="Seasonal Vegetable Risotto"
              description="Make use of various vegetables approaching expiry dates"
              ingredients={["Arborio rice", "Vegetable stock", "Assorted vegetables (expiring soon)", "Parmesan"]}
              profitMargin="65%"
              usesSoonExpiringItems={true}
            />

            <RecipeCard
              title="Citrus Glazed Chicken"
              description="Optimize chicken inventory with this popular, high-margin dish"
              ingredients={["Chicken breast", "Citrus fruits", "Honey", "Thyme"]}
              profitMargin="70%"
              usesSoonExpiringItems={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="profitability">
          <Card>
            <CardHeader>
              <CardTitle>Menu Profitability Analysis</CardTitle>
              <CardDescription>Breakdown of menu items by profitability and popularity</CardDescription>
            </CardHeader>
            <CardContent>
              <MenuProfitabilityChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Ingredient Usage Optimization</CardTitle>
              <CardDescription>Analysis of ingredient usage across menu items</CardDescription>
            </CardHeader>
            <CardContent>
              <IngredientUsageChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecipeCard({
  title,
  description,
  ingredients,
  profitMargin,
  usesSoonExpiringItems,
}: {
  title: string
  description: string
  ingredients: string[]
  profitMargin: string
  usesSoonExpiringItems: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          {usesSoonExpiringItems && (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
              Uses Expiring Items
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Key Ingredients:</h4>
            <ul className="text-sm space-y-1">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary">{index + 1}</span>
                  </span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="font-medium">{profitMargin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prep Time</p>
              <p className="font-medium">25 mins</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full gap-1">
          <span>View Full Recipe</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

