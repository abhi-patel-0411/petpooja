"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChefHat, Clock, DollarSign, ThumbsUp } from "lucide-react"

// Mock data for menu suggestions
const menuSuggestions = [
  {
    id: 1,
    name: "Herb-Crusted Salmon",
    description: "Make use of expiring fresh herbs and salmon with this high-profit dish",
    ingredients: ["Salmon (expires in 2 days)", "Fresh herbs (expires in 1 day)", "Lemon", "Garlic"],
    profitMargin: 72,
    prepTime: 25,
    popularity: 85,
  },
  {
    id: 2,
    name: "Seasonal Vegetable Risotto",
    description: "Utilize various vegetables approaching expiry dates",
    ingredients: [
      "Arborio rice",
      "Vegetable stock",
      "Bell peppers (expires in 3 days)",
      "Mushrooms (expires in 4 days)",
    ],
    profitMargin: 65,
    prepTime: 35,
    popularity: 78,
  },
  {
    id: 3,
    name: "Yogurt Panna Cotta",
    description: "Simple dessert to use expiring yogurt and heavy cream",
    ingredients: ["Yogurt (expires in 2 days)", "Heavy cream (expires in 5 days)", "Vanilla", "Berries"],
    profitMargin: 80,
    prepTime: 20,
    popularity: 90,
  },
]

export default function MenuSuggestions() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {menuSuggestions.map((suggestion) => (
          <Card key={suggestion.id} className="overflow-hidden">
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{suggestion.name}</h3>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">AI Suggested</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{suggestion.profitMargin}% margin</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{suggestion.prepTime} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{suggestion.popularity}% popular</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium uppercase text-muted-foreground">Key Ingredients:</h4>
                <ul className="text-sm space-y-1">
                  {suggestion.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary">{index + 1}</span>
                      </span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full mt-4 gap-1">
                <span>View Recipe</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="gap-1">
          <span>View All Suggestions</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

