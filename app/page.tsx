import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain, Camera, ChefHat, Leaf, LineChart, Recycle, Utensils } from "lucide-react"
import logo from '@/public/logo.svg';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            
            <span className="font-bold text-2xl"><img src="logo.svg" alt="" height={250} width={150} /></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary">
              Benefits
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center border gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Smart Kitchen
              <br />
              for Smarter Restaurants
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Reduce waste, optimize inventory, and increase profitability with our AI-driven kitchen management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
            </div>
            <div className="mt-16  overflow-hidden max-w-5xl mx-auto">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/home/Home-hero_md.webp?height=600&width=500" alt="KitchenIQ Dashboard" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powered by AI & Computer Vision</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our smart kitchen system uses advanced AI to transform how restaurants manage inventory and reduce
                waste.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Camera className="h-10 w-10 text-primary" />}
                title="Smart Inventory Tracking"
                description="Computer vision technology automatically tracks ingredients and monitors stock levels in real-time."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI Demand Prediction"
                description="Machine learning algorithms forecast ingredient needs based on historical data and seasonal trends."
              />
              <FeatureCard
                icon={<Utensils className="h-10 w-10 text-primary" />}
                title="Menu Optimization"
                description="AI-driven recipe recommendations to utilize soon-to-expire ingredients and maximize profitability."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Waste Analysis"
                description="Visual waste tracking and analytics to identify patterns and reduce food waste."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How KitchenIQ Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our integrated system works seamlessly to transform your kitchen operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-card border rounded-lg shadow-md overflow-hidden">
                <img
  src="/p1.jpeg" 
  height={200} 
  width={200}
  alt="Computer Vision Inventory Tracking"
  className="w-full h-auto"
/>

                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Computer Vision Inventory Management</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Visual Inventory Tracking</h4>
                      <p className="text-muted-foreground">
                        Cameras scan your storage areas to automatically identify and log ingredients.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Real-Time Stock Detection</h4>
                      <p className="text-muted-foreground">
                        Monitor ingredient levels continuously without manual counting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Food Spoilage Detection</h4>
                      <p className="text-muted-foreground">
                        AI identifies spoiled or near-expiry ingredients to prevent waste.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mt-20">
              <div className="order-2 md:order-1 space-y-6">
                <h3 className="text-2xl font-bold">AI-Powered Demand & Waste Prediction</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sales Forecasting</h4>
                      <p className="text-muted-foreground">
                        Predict ingredient consumption based on historical sales data and seasonality.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Waste Prediction</h4>
                      <p className="text-muted-foreground">
                        Identify high-risk items prone to spoilage using machine learning.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Dynamic Inventory Replenishment</h4>
                      <p className="text-muted-foreground">
                        Auto-suggest optimal stock levels to reduce over-purchasing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-card border rounded-lg shadow-md overflow-hidden">
                <img
  src="/pe.jpeg" 
  height={200} 
  width={200}
  alt="Computer Vision Inventory Tracking"
  className="w-full h-auto"
/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Benefits for Your Restaurant</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how petpooja transforms your operations and boosts your bottom line
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Recycle className="h-10 w-10 text-green-500" />}
                title="Reduce Food Waste"
                description="Cut food waste by up to 40% through better inventory management and spoilage prevention."
                metric="40%"
                metricLabel="waste reduction"
              />
              <BenefitCard
                icon={<LineChart className="h-10 w-10 text-blue-500" />}
                title="Increase Profitability"
                description="Boost profit margins by optimizing inventory levels and reducing unnecessary purchases."
                metric="15%"
                metricLabel="profit increase"
              />
              <BenefitCard
                icon={<Leaf className="h-10 w-10 text-green-600" />}
                title="Environmental Impact"
                description="Reduce your restaurant's carbon footprint while building a sustainable brand image."
                metric="30%"
                metricLabel="carbon reduction"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Kitchen?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join hundreds of restaurants already using KitchenIQ to reduce waste and increase profits.
            </p>
            
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                
                <span className="font-bold text-2xl"><img src="logo.svg" alt="" height={150} width={150} /></span>

              </div>
              <p className="text-muted-foreground">AI-powered kitchen management system for smarter restaurants.</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="text-muted-foreground hover:text-primary">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center flex justify-center text-muted-foreground">
             <span className="font-bold text-2xl"><img src="logo.svg" alt="" height={250} width={150} /></span>
            
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card border rounded-lg p-6 transition-all hover:shadow-md">
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function BenefitCard({
  icon,
  title,
  description,
  metric,
  metricLabel,
}: {
  icon: React.ReactNode
  title: string
  description: string
  metric: string
  metricLabel: string
}) {
  return (
    <div className="bg-card border rounded-lg p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        <div className="text-right">
          <div className="text-3xl font-bold">{metric}</div>
          <div className="text-sm text-muted-foreground">{metricLabel}</div>
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

