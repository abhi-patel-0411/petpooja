"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Camera, ChefHat, Home, LineChart, Recycle, Settings, ShoppingCart, Utensils } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Waste Analysis",
      href: "/dashboard/waste-analysis",
      icon: <Recycle className="h-5 w-5" />,
    },
    {
      title: "Menu Optimization",
      href: "/dashboard/menu-optimization",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      title: "Vision Capture",
      href: "/dashboard/vision-capture",
      icon: <Camera className="h-5 w-5" />,
    },
    
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">

          <span className="font-bold text-2xl"><img src="logo.svg" alt="" height={250} width={150} /></span>

        </Link>
      </div>

      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  pathname === item.href && "bg-muted font-medium",
                )}
              >
                {item.icon}
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Chef Michael</p>
            <p className="text-xs text-muted-foreground">Head Chef</p>
          </div>
        </div>
      </div>
    </div>
  )
}

