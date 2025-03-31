
// // !3rd 
// // "use client"

// // import { useState, useRef, useEffect } from "react"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Badge } from "@/components/ui/badge"
// // import { Camera, Check, Clock, FileText, ImageIcon, Loader2, RotateCw, Upload, Utensils } from "lucide-react"

// // // Types for our dynamic data
// // type DetectedItem = {
// //   name: string
// //   quantity: string
// //   confidence: number
// //   status: "identified" | "unidentified"
// //   category?: "vegetable" | "fruit" | "meat" | "dairy" | "other"
// // }

// // type RecipeSuggestion = {
// //   name: string
// //   ingredients: string[]
// //   instructions: string[]
// //   prepTime: string
// // }

// // export default function VisionCapturePage() {
// //   const [captureState, setCaptureState] = useState<"idle" | "capturing" | "processing" | "complete">("idle")
// //   const [activeTab, setActiveTab] = useState("live")
// //   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
// //   const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([])
// //   const [recipeSuggestions, setRecipeSuggestions] = useState<RecipeSuggestion[]>([])
// //   const videoRef = useRef<HTMLVideoElement>(null)
// //   const canvasRef = useRef<HTMLCanvasElement>(null)
// //   const streamRef = useRef<MediaStream | null>(null)

// //   // Mock data for detected items (in a real app, this would come from your API)
// //   const mockDetectedItems: DetectedItem[] = [
// //     { name: "Tomatoes", quantity: "2.3 kg", confidence: 98, status: "identified", category: "vegetable" },
// //     { name: "Onions", quantity: "1.8 kg", confidence: 96, status: "identified", category: "vegetable" },
// //     { name: "Bell Peppers", quantity: "1.2 kg", confidence: 94, status: "identified", category: "vegetable" },
// //     { name: "Lettuce", quantity: "0.8 kg", confidence: 92, status: "identified", category: "vegetable" },
// //     { name: "Unknown Object", quantity: "1 unit", confidence: 45, status: "unidentified" }
// //   ]

// //   // Mock recipe suggestions based on detected items
// //   const mockRecipeSuggestions: RecipeSuggestion[] = [
// //     {
// //       name: "Fresh Garden Salad",
// //       ingredients: ["Tomatoes", "Lettuce", "Bell Peppers", "Onions"],
// //       instructions: [
// //         "Chop all vegetables into bite-sized pieces",
// //         "Combine in a large bowl",
// //         "Add your favorite dressing and toss",
// //         "Serve immediately"
// //       ],
// //       prepTime: "15 mins"
// //     },
// //     {
// //       name: "Vegetable Stir Fry",
// //       ingredients: ["Bell Peppers", "Onions", "Tomatoes"],
// //       instructions: [
// //         "Slice vegetables into thin strips",
// //         "Heat oil in a wok or large pan",
// //         "Stir fry vegetables on high heat for 5-7 minutes",
// //         "Season with salt, pepper, and soy sauce"
// //       ],
// //       prepTime: "20 mins"
// //     }
// //   ]

// //   // Initialize camera when live tab is selected
// //   useEffect(() => {
// //     if (activeTab === "live") {
// //       startCamera()
// //     } else {
// //       stopCamera()
// //     }

// //     return () => {
// //       stopCamera()
// //     }
// //   }, [activeTab])

// //   const startCamera = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { facingMode: "environment" },
// //         audio: false
// //       })
      
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream
// //         streamRef.current = stream
// //       }
// //     } catch (err) {
// //       console.error("Error accessing camera:", err)
// //     }
// //   }

// //   const stopCamera = () => {
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach(track => track.stop())
// //       streamRef.current = null
// //     }
// //   }

// //   const captureFromCamera = () => {
// //     if (!videoRef.current || !canvasRef.current) return

// //     setCaptureState("capturing")
    
// //     // Capture frame from video
// //     const video = videoRef.current
// //     const canvas = canvasRef.current
// //     canvas.width = video.videoWidth
// //     canvas.height = video.videoHeight
// //     const ctx = canvas.getContext('2d')
    
// //     if (ctx) {
// //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
// //       setTimeout(() => {
// //         setCaptureState("processing")
// //         processImage(canvas.toDataURL('image/jpeg'))
// //       }, 500)
// //     }
// //   }

// //   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0]
// //     if (!file) return

// //     const reader = new FileReader()
// //     reader.onload = (event) => {
// //       const imageData = event.target?.result as string
// //       setUploadedImage(imageData)
// //       setCaptureState("processing")
// //       processImage(imageData)
// //     }
// //     reader.readAsDataURL(file)
// //   }

// //   const processImage = (imageData: string) => {
// //     // In a real app, you would send the image to your backend for processing
// //     // with OpenCV or other computer vision libraries
    
// //     // For demo purposes, we'll simulate processing with mock data
// //     setTimeout(() => {
// //       setDetectedItems(mockDetectedItems)
// //       setRecipeSuggestions(mockRecipeSuggestions)
// //       setCaptureState("complete")
// //     }, 3000)
// //   }

// //   const handleCapture = () => {
// //     if (activeTab === "live") {
// //       captureFromCamera()
// //     } else if (activeTab === "upload" && uploadedImage) {
// //       setCaptureState("processing")
// //       processImage(uploadedImage)
// //     }
// //   }

// //   const handleReset = () => {
// //     setCaptureState("idle")
// //     setDetectedItems([])
// //     setRecipeSuggestions([])
// //     if (activeTab === "upload") {
// //       setUploadedImage(null)
// //     }
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-3xl font-bold tracking-tight">Vision Capture</h1>
// //         <div className="flex items-center gap-2">
// //           <Button 
// //             variant="outline" 
// //             size="sm" 
// //             className="gap-1"
// //             onClick={() => setActiveTab("upload")}
// //           >
// //             <Upload className="h-4 w-4" />
// //             <span>Upload Image</span>
// //           </Button>
// //         </div>
// //       </div>

// //       <Tabs defaultValue="live" className="space-y-6" onValueChange={setActiveTab}>
// //         <TabsList>
// //           <TabsTrigger value="live">Live Camera</TabsTrigger>
// //           <TabsTrigger value="upload">Upload Image</TabsTrigger>
// //           <TabsTrigger value="history">Capture History</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="live">
// //           <div className="grid gap-6 md:grid-cols-3">
// //             <div className="md:col-span-2">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Computer Vision Camera</CardTitle>
// //                   <CardDescription>Use our AI-powered camera to scan your inventory or waste</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
// //                     {captureState === "idle" && (
// //                       <video 
// //                         ref={videoRef} 
// //                         autoPlay 
// //                         playsInline 
// //                         muted 
// //                         className="w-full h-full object-cover"
// //                       />
// //                     )}

// //                     {captureState === "capturing" && (
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //                         <div className="text-center text-white">
// //                           <div className="h-20 w-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
// //                           <p className="text-white font-medium">Capturing image...</p>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {captureState === "processing" && (
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //                         <div className="text-center text-white">
// //                           <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
// //                           <p className="text-white font-medium">Processing with AI...</p>
// //                           <p className="text-sm text-white/80 mt-2">
// //                             Identifying items and analyzing inventory
// //                           </p>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {captureState === "complete" && (
// //                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                         <div className="text-center text-white">
// //                           <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
// //                             <Check className="h-8 w-8 text-white" />
// //                           </div>
// //                           <p className="text-xl font-medium">Scan Complete!</p>
// //                           <p className="mt-2">{detectedItems.length} items identified</p>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Hidden canvas for capturing frames */}
// //                     <canvas ref={canvasRef} className="hidden" />

// //                     {/* Simulated camera feed overlay */}
// //                     <div className="absolute top-4 left-4 flex items-center gap-2">
// //                       <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
// //                       <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //                 <CardFooter className="flex justify-between">
// //                   {captureState === "idle" && (
// //                     <Button className="gap-2 w-full" onClick={handleCapture}>
// //                       <Camera className="h-4 w-4" />
// //                       <span>Capture Inventory</span>
// //                     </Button>
// //                   )}

// //                   {(captureState === "capturing" || captureState === "processing") && (
// //                     <Button disabled className="gap-2 w-full">
// //                       <Loader2 className="h-4 w-4 animate-spin" />
// //                       <span>{captureState === "capturing" ? "Capturing..." : "Processing..."}</span>
// //                     </Button>
// //                   )}

// //                   {captureState === "complete" && (
// //                     <div className="flex gap-2 w-full">
// //                       <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
// //                         <RotateCw className="h-4 w-4" />
// //                         <span>New Scan</span>
// //                       </Button>
// //                       <Button className="gap-2 flex-1">
// //                         <FileText className="h-4 w-4" />
// //                         <span>View Results</span>
// //                       </Button>
// //                     </div>
// //                   )}
// //                 </CardFooter>
// //               </Card>
// //             </div>

// //             <div className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Scan Results</CardTitle>
// //                   <CardDescription>Items identified in the current scan</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {captureState !== "complete" ? (
// //                     <div className="py-8 text-center text-muted-foreground">
// //                       <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
// //                       <p>Scan results will appear here</p>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-4">
// //                       <p className="text-sm font-medium">{detectedItems.length} items identified:</p>
// //                       <div className="space-y-3">
// //                         {detectedItems.map((item, index) => (
// //                           <ScanResultItem 
// //                             key={index}
// //                             name={item.name}
// //                             quantity={item.quantity}
// //                             confidence={`${item.confidence}%`}
// //                             status={item.status === "identified" ? "updated" : "unidentified"}
// //                           />
// //                         ))}
// //                       </div>

// //                       <div className="pt-4 border-t">
// //                         <p className="text-sm font-medium mb-2">AI Insights:</p>
// //                         <ul className="text-sm space-y-2">
// //                           {detectedItems.some(item => item.category === "vegetable") && (
// //                             <li className="flex items-start gap-2">
// //                               <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
// //                               <span>Fresh vegetables detected - best used within 3-5 days</span>
// //                             </li>
// //                           )}
// //                           {detectedItems.some(item => item.status === "unidentified") && (
// //                             <li className="flex items-start gap-2">
// //                               <Clock className="h-4 w-4 text-red-500 mt-0.5" />
// //                               <span>Some items couldn't be identified - please verify manually</span>
// //                             </li>
// //                           )}
// //                         </ul>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>

// //               {captureState === "complete" && recipeSuggestions.length > 0 && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <Utensils className="h-5 w-5 text-primary" />
// //                       <span>Recipe Suggestions</span>
// //                     </CardTitle>
// //                     <CardDescription>AI-generated recipes based on your ingredients</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       {recipeSuggestions.map((recipe, index) => (
// //                         <div key={index} className="border rounded-lg p-4">
// //                           <h3 className="font-medium mb-2">{recipe.name}</h3>
// //                           <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
// //                             <Clock className="h-4 w-4" />
// //                             <span>Prep time: {recipe.prepTime}</span>
// //                           </div>
// //                           <div className="mb-3">
// //                             <p className="text-sm font-medium mb-1">Ingredients:</p>
// //                             <ul className="text-sm list-disc list-inside">
// //                               {recipe.ingredients.map((ingredient, i) => (
// //                                 <li key={i}>{ingredient}</li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                           <div>
// //                             <p className="text-sm font-medium mb-1">Instructions:</p>
// //                             <ol className="text-sm list-decimal list-inside space-y-1">
// //                               {recipe.instructions.map((step, i) => (
// //                                 <li key={i}>{step}</li>
// //                               ))}
// //                             </ol>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //             </div>
// //           </div>
// //         </TabsContent>

// //         {/* ... (keep the existing upload and history tabs the same) */}
// //       </Tabs>
// //     </div>
// //   )
// // }

// // !4th
// // "use client"

// // import { useState, useRef, useEffect } from "react"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Badge } from "@/components/ui/badge"
// // import { Camera, Check, Clock, FileText, ImageIcon, Loader2, RotateCw, Upload, Utensils } from "lucide-react"

// // // Types
// // type DetectedItem = {
// //   name: string
// //   quantity: string
// //   confidence: number
// //   status: "identified" | "unidentified"
// //   category?: "vegetable" | "fruit" | "meat" | "dairy" | "other"
// //   bbox?: [number, number, number, number] // [x, y, width, height]
// // }

// // type RecipeSuggestion = {
// //   name: string
// //   ingredients: string[]
// //   instructions: string[]
// //   prepTime: string
// // }

// // type CaptureHistory = {
// //   id: string
// //   timestamp: Date
// //   imageUrl: string
// //   items: DetectedItem[]
// // }

// // export default function VisionCapturePage() {
// //   // State management
// //   const [captureState, setCaptureState] = useState<"idle" | "capturing" | "processing" | "complete">("idle")
// //   const [activeTab, setActiveTab] = useState("live")
// //   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
// //   const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([])
// //   const [recipeSuggestions, setRecipeSuggestions] = useState<RecipeSuggestion[]>([])
// //   const [captureHistory, setCaptureHistory] = useState<CaptureHistory[]>([])
// //   const [tfLoaded, setTfLoaded] = useState(false)
  
// //   // Refs
// //   const videoRef = useRef<HTMLVideoElement>(null)
// //   const canvasRef = useRef<HTMLCanvasElement>(null)
// //   const streamRef = useRef<MediaStream | null>(null)
// //   const detectionCanvasRef = useRef<HTMLCanvasElement>(null)

// //   // Load TensorFlow.js and YOLO model
// //   useEffect(() => {
// //     const loadTF = async () => {
// //       const tf = await import('@tensorflow/tfjs')
// //       await tf.ready()
// //       setTfLoaded(true)
// //       console.log('TensorFlow.js loaded')
// //     }

// //     loadTF().catch(console.error)
// //   }, [])

// //   // Initialize camera
// //   useEffect(() => {
// //     if (activeTab === "live") {
// //       startCamera()
// //     } else {
// //       stopCamera()
// //     }

// //     return () => stopCamera()
// //   }, [activeTab])

// //   // Camera functions
// //   const startCamera = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { facingMode: "environment" },
// //         audio: false
// //       })
      
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream
// //         streamRef.current = stream
// //       }
// //     } catch (err) {
// //       console.error("Camera error:", err)
// //     }
// //   }

// //   const stopCamera = () => {
// //     streamRef.current?.getTracks().forEach(track => track.stop())
// //     streamRef.current = null
// //   }

// //   // Image processing functions
// //   const captureFromCamera = async () => {
// //     if (!videoRef.current || !canvasRef.current) return

// //     setCaptureState("capturing")
    
// //     const canvas = canvasRef.current
// //     const ctx = canvas.getContext('2d')
// //     if (!ctx) return

// //     canvas.width = videoRef.current.videoWidth
// //     canvas.height = videoRef.current.videoHeight
// //     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    
// //     const imageData = canvas.toDataURL('image/jpeg')
// //     await processImage(imageData)
// //   }

// //   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0]
// //     if (!file) return

// //     const reader = new FileReader()
// //     reader.onload = async (event) => {
// //       const imageData = event.target?.result as string
// //       setUploadedImage(imageData)
// //       setCaptureState("processing")
// //       await processImage(imageData)
// //     }
// //     reader.readAsDataURL(file)
// //   }

// //   // Object detection with multiple backends
// //   const processImage = async (imageData: string) => {
// //     setCaptureState("processing")
    
// //     try {
// //       // First try TensorFlow/YOLO
// //       let results = await detectWithTF(imageData)
      
// //       // Fallback to cloud APIs if needed
// //       if (!results || results.length === 0) {
// //         results = await detectWithCloudAPI(imageData)
// //       }

// //       // Fallback to OpenCV if still no results
// //       if (!results || results.length === 0) {
// //         results = await detectWithOpenCV(imageData)
// //       }

// //       setDetectedItems(results || [])
// //       generateRecipeSuggestions(results)
// //       addToHistory(imageData, results)
// //       setCaptureState("complete")
// //     } catch (error) {
// //       console.error("Detection failed:", error)
// //       setCaptureState("idle")
// //     }
// //   }

// //   // TensorFlow/YOLO detection
// //   const detectWithTF = async (imageData: string): Promise<DetectedItem[] | null> => {
// //     if (!tfLoaded) return null
    
// //     try {
// //       // In a real app, you would load your YOLO model here
// //       // const model = await cocoSsd.load()
// //       // const predictions = await model.detect(document.getElementById('image'))
      
// //       // Mock implementation for demo
// //       return [
// //         { name: "Tomato", quantity: "3", confidence: 92, status: "identified", category: "vegetable", bbox: [100, 100, 50, 50] },
// //         { name: "Onion", quantity: "2", confidence: 88, status: "identified", category: "vegetable", bbox: [200, 150, 60, 60] }
// //       ]
// //     } catch (error) {
// //       console.error("TF detection error:", error)
// //       return null
// //     }
// //   }

// //   // Cloud API detection (AWS Rekognition/Google Vision)
// //   const detectWithCloudAPI = async (imageData: string): Promise<DetectedItem[] | null> => {
// //     try {
// //       // Mock implementation - in real app you would call your backend
// //       // which would call the cloud API
// //       return [
// //         { name: "Bell Pepper", quantity: "1", confidence: 85, status: "identified", category: "vegetable" },
// //         { name: "Lettuce", quantity: "0.5 kg", confidence: 78, status: "identified", category: "vegetable" }
// //       ]
// //     } catch (error) {
// //       console.error("Cloud API error:", error)
// //       return null
// //     }
// //   }

// //   // OpenCV detection
// //   const detectWithOpenCV = async (imageData: string): Promise<DetectedItem[] | null> => {
// //     try {
// //       // Mock implementation - in real app you would use OpenCV.js
// //       // or call a backend with OpenCV
// //       return [
// //         { name: "Carrot", quantity: "4", confidence: 75, status: "identified", category: "vegetable" }
// //       ]
// //     } catch (error) {
// //       console.error("OpenCV error:", error)
// //       return null
// //     }
// //   }

// //   // Recipe generation
// //   const generateRecipeSuggestions = (items: DetectedItem[] = []) => {
// //     const ingredients = items.filter(i => i.status === "identified").map(i => i.name)
// //     if (ingredients.length === 0) return
    
// //     // Mock implementation - in real app you would call an API
// //     setRecipeSuggestions([
// //       {
// //         name: "Fresh Salad",
// //         ingredients: ingredients.slice(0, 3),
// //         instructions: [
// //           "Wash and chop all vegetables",
// //           "Combine in a bowl",
// //           "Add dressing and toss"
// //         ],
// //         prepTime: "10 mins"
// //       }
// //     ])
// //   }

// //   // History management
// //   const addToHistory = (imageUrl: string, items: DetectedItem[] = []) => {
// //     const newEntry: CaptureHistory = {
// //       id: Date.now().toString(),
// //       timestamp: new Date(),
// //       imageUrl,
// //       items
// //     }
// //     setCaptureHistory(prev => [newEntry, ...prev.slice(0, 9)]) // Keep last 10
// //   }

// //   const handleReset = () => {
// //     setCaptureState("idle")
// //     setUploadedImage(null)
// //     setDetectedItems([])
// //     setRecipeSuggestions([])
// //   }

// //   // Draw bounding boxes on detected objects
// //   useEffect(() => {
// //     if (detectionCanvasRef.current && detectedItems.length > 0) {
// //       const canvas = detectionCanvasRef.current
// //       const ctx = canvas.getContext('2d')
// //       if (!ctx) return
      
// //       // Clear canvas
// //       ctx.clearRect(0, 0, canvas.width, canvas.height)
      
// //       // Draw each bounding box
// //       detectedItems.forEach(item => {
// //         if (!item.bbox) return
        
// //         const [x, y, width, height] = item.bbox
// //         ctx.strokeStyle = item.status === "identified" ? "#00FF00" : "#FF0000"
// //         ctx.lineWidth = 2
// //         ctx.strokeRect(x, y, width, height)
        
// //         // Label
// //         ctx.fillStyle = item.status === "identified" ? "#00FF00" : "#FF0000"
// //         ctx.font = "12px Arial"
// //         ctx.fillText(`${item.name} (${item.confidence}%)`, x, y > 10 ? y - 5 : 10)
// //       })
// //     }
// //   }, [detectedItems])

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-3xl font-bold tracking-tight">Vision Capture</h1>
// //         <div className="flex items-center gap-2">
// //           <Button 
// //             variant="outline" 
// //             size="sm" 
// //             className="gap-1"
// //             onClick={() => setActiveTab("upload")}
// //           >
// //             <Upload className="h-4 w-4" />
// //             <span>Upload Image</span>
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Main tabs */}
// //       <Tabs defaultValue="live" className="space-y-6" onValueChange={setActiveTab}>
// //         <TabsList>
// //           <TabsTrigger value="live">Live Camera</TabsTrigger>
// //           <TabsTrigger value="upload">Upload Image</TabsTrigger>
// //           <TabsTrigger value="history">Capture History</TabsTrigger>
// //         </TabsList>

// //         {/* Live Camera Tab */}
// //         <TabsContent value="live">
// //           <div className="grid gap-6 md:grid-cols-3">
// //             <div className="md:col-span-2">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Computer Vision Camera</CardTitle>
// //                   <CardDescription>
// //                     Real-time object detection with TensorFlow/YOLO
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
// //                     {captureState === "idle" && (
// //                       <video 
// //                         ref={videoRef} 
// //                         autoPlay 
// //                         playsInline 
// //                         muted 
// //                         className="w-full h-full object-cover"
// //                       />
// //                     )}

// //                     {captureState === "capturing" && (
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //                         <div className="text-center text-white">
// //                           <div className="h-20 w-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
// //                           <p className="text-white font-medium">Capturing image...</p>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {captureState === "processing" && (
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //                         <div className="text-center text-white">
// //                           <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
// //                           <p className="text-white font-medium">Processing with AI...</p>
// //                           <p className="text-sm text-white/80 mt-2">
// //                             Using TensorFlow/YOLO for object detection
// //                           </p>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {captureState === "complete" && (
// //                       <>
// //                         <img 
// //                           src={canvasRef.current?.toDataURL() || ''} 
// //                           alt="Captured" 
// //                           className="w-full h-full object-contain"
// //                         />
// //                         <canvas 
// //                           ref={detectionCanvasRef} 
// //                           className="absolute inset-0 w-full h-full"
// //                           width={videoRef.current?.videoWidth}
// //                           height={videoRef.current?.videoHeight}
// //                         />
// //                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                           <div className="text-center text-white">
// //                             <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
// //                               <Check className="h-8 w-8 text-white" />
// //                             </div>
// //                             <p className="text-xl font-medium">Scan Complete!</p>
// //                             <p className="mt-2">{detectedItems.length} items detected</p>
// //                           </div>
// //                         </div>
// //                       </>
// //                     )}

// //                     <canvas ref={canvasRef} className="hidden" />
// //                     <div className="absolute top-4 left-4 flex items-center gap-2">
// //                       <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
// //                       <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //                 <CardFooter className="flex justify-between">
// //                   {captureState === "idle" && (
// //                     <Button className="gap-2 w-full" onClick={captureFromCamera}>
// //                       <Camera className="h-4 w-4" />
// //                       <span>Capture Inventory</span>
// //                     </Button>
// //                   )}

// //                   {(captureState === "capturing" || captureState === "processing") && (
// //                     <Button disabled className="gap-2 w-full">
// //                       <Loader2 className="h-4 w-4 animate-spin" />
// //                       <span>{captureState === "capturing" ? "Capturing..." : "Processing..."}</span>
// //                     </Button>
// //                   )}

// //                   {captureState === "complete" && (
// //                     <div className="flex gap-2 w-full">
// //                       <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
// //                         <RotateCw className="h-4 w-4" />
// //                         <span>New Scan</span>
// //                       </Button>
// //                       <Button className="gap-2 flex-1">
// //                         <FileText className="h-4 w-4" />
// //                         <span>View Results</span>
// //                       </Button>
// //                     </div>
// //                   )}
// //                 </CardFooter>
// //               </Card>
// //             </div>

// //             {/* Results Panel */}
// //             <div className="space-y-6">
// //               <ScanResults 
// //                 captureState={captureState} 
// //                 detectedItems={detectedItems} 
// //               />
              
// //               {captureState === "complete" && recipeSuggestions.length > 0 && (
// //                 <RecipeSuggestions recipes={recipeSuggestions} />
// //               )}
// //             </div>
// //           </div>
// //         </TabsContent>

// //         {/* Upload Image Tab */}
// //         <TabsContent value="upload">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Upload Image</CardTitle>
// //               <CardDescription>
// //                 Analyze images using TensorFlow, OpenCV, or cloud vision APIs
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               {!uploadedImage ? (
// //                 <div className="border-2 border-dashed rounded-lg p-12 text-center">
// //                   <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
// //                     <Upload className="h-8 w-8 text-primary" />
// //                   </div>
// //                   <h3 className="text-lg font-medium mb-2">Drag and drop image here</h3>
// //                   <p className="text-sm text-muted-foreground mb-6">
// //                     Supports JPG, PNG (Max 5MB)
// //                   </p>
// //                   <input
// //                     type="file"
// //                     id="image-upload"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={handleFileUpload}
// //                   />
// //                   <label htmlFor="image-upload" className="cursor-pointer">
// //                     <Button asChild>
// //                       <span>Select Image</span>
// //                     </Button>
// //                   </label>
// //                 </div>
// //               ) : (
// //                 <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
// //                   <img 
// //                     src={uploadedImage} 
// //                     alt="Uploaded inventory" 
// //                     className="w-full h-full object-contain"
// //                   />
// //                   <canvas 
// //                     ref={detectionCanvasRef} 
// //                     className="absolute inset-0 w-full h-full"
// //                   />

// //                   {captureState === "processing" && (
// //                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                       <div className="text-center text-white">
// //                         <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
// //                         <p className="text-white font-medium">Processing with AI...</p>
// //                         <p className="text-sm text-white/80 mt-2">
// //                           Using {tfLoaded ? "TensorFlow/YOLO" : "Cloud Vision API"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {captureState === "complete" && (
// //                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                       <div className="text-center text-white">
// //                         <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
// //                           <Check className="h-8 w-8 text-white" />
// //                         </div>
// //                         <p className="text-xl font-medium">Analysis Complete!</p>
// //                         <p className="mt-2">{detectedItems.length} items detected</p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </CardContent>
// //             <CardFooter className="flex justify-between">
// //               {uploadedImage && captureState === "idle" && (
// //                 <Button className="gap-2 w-full" onClick={() => processImage(uploadedImage)}>
// //                   <ImageIcon className="h-4 w-4" />
// //                   <span>Analyze Image</span>
// //                 </Button>
// //               )}

// //               {captureState === "processing" && (
// //                 <Button disabled className="gap-2 w-full">
// //                   <Loader2 className="h-4 w-4 animate-spin" />
// //                   <span>Processing...</span>
// //                 </Button>
// //               )}

// //               {captureState === "complete" && (
// //                 <div className="flex gap-2 w-full">
// //                   <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
// //                     <RotateCw className="h-4 w-4" />
// //                     <span>New Upload</span>
// //                   </Button>
// //                   <Button className="gap-2 flex-1">
// //                     <FileText className="h-4 w-4" />
// //                     <span>View Results</span>
// //                   </Button>
// //                 </div>
// //               )}
// //             </CardFooter>
// //           </Card>
// //         </TabsContent>

// //         {/* History Tab */}
// //         <TabsContent value="history">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Capture History</CardTitle>
// //               <CardDescription>
// //                 Previous scans with TensorFlow/YOLO and cloud vision APIs
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               {captureHistory.length === 0 ? (
// //                 <div className="py-8 text-center text-muted-foreground">
// //                   <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
// //                   <p>No capture history yet</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {captureHistory.map((entry) => (
// //                     <div key={entry.id} className="border rounded-lg p-4">
// //                       <div className="flex items-center justify-between mb-3">
// //                         <div>
// //                           <p className="font-medium">
// //                             {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
// //                           </p>
// //                           <p className="text-sm text-muted-foreground">
// //                             {entry.items.length} items detected
// //                           </p>
// //                         </div>
// //                         <Button variant="ghost" size="sm">
// //                           <FileText className="h-4 w-4 mr-2" />
// //                           Details
// //                         </Button>
// //                       </div>
// //                       <div className="flex gap-4">
// //                         <div className="w-24 h-24 rounded-md overflow-hidden border">
// //                           <img 
// //                             src={entry.imageUrl} 
// //                             alt="Capture thumbnail" 
// //                             className="w-full h-full object-cover"
// //                           />
// //                         </div>
// //                         <div className="flex-1">
// //                           <div className="flex flex-wrap gap-1">
// //                             {entry.items.slice(0, 5).map((item, i) => (
// //                               <Badge 
// //                                 key={i} 
// //                                 variant="outline"
// //                                 className={
// //                                   item.status === "identified" 
// //                                     ? "bg-green-50 text-green-700 border-green-200" 
// //                                     : "bg-amber-50 text-amber-700 border-amber-200"
// //                                 }
// //                               >
// //                                 {item.name}
// //                               </Badge>
// //                             ))}
// //                             {entry.items.length > 5 && (
// //                               <Badge variant="outline" className="bg-muted text-muted-foreground">
// //                                 +{entry.items.length - 5} more
// //                               </Badge>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }

// // // Component for scan results
// // function ScanResults({ 
// //   captureState, 
// //   detectedItems 
// // }: { 
// //   captureState: string 
// //   detectedItems: DetectedItem[] 
// // }) {
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Scan Results</CardTitle>
// //         <CardDescription>Objects detected by AI</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         {captureState !== "complete" ? (
// //           <div className="py-8 text-center text-muted-foreground">
// //             <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
// //             <p>Scan results will appear here</p>
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             <p className="text-sm font-medium">{detectedItems.length} items identified:</p>
// //             <div className="space-y-3">
// //               {detectedItems.map((item, index) => (
// //                 <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
// //                   <div className="flex items-center gap-3">
// //                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
// //                       <ImageIcon className="h-4 w-4 text-primary" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium text-sm">{item.name}</p>
// //                       <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <Badge
// //                       variant="outline"
// //                       className={
// //                         item.status === "identified"
// //                           ? "bg-green-50 text-green-700 border-green-200"
// //                           : "bg-amber-50 text-amber-700 border-amber-200"
// //                       }
// //                     >
// //                       {item.status === "identified" ? <Check className="h-3 w-3 mr-1" /> : null}
// //                       {item.status === "identified" ? "Identified" : "Unidentified"}
// //                     </Badge>
// //                     <p className="text-xs text-muted-foreground mt-1">Confidence: {item.confidence}%</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="pt-4 border-t">
// //               <p className="text-sm font-medium mb-2">AI Insights:</p>
// //               <ul className="text-sm space-y-2">
// //                 {detectedItems.some(item => item.category === "vegetable") && (
// //                   <li className="flex items-start gap-2">
// //                     <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
// //                     <span>Fresh vegetables detected - best used within 3-5 days</span>
// //                   </li>
// //                 )}
// //                 {detectedItems.some(item => item.status === "unidentified") && (
// //                   <li className="flex items-start gap-2">
// //                     <Clock className="h-4 w-4 text-red-500 mt-0.5" />
// //                     <span>Some items couldn't be identified - please verify manually</span>
// //                   </li>
// //                 )}
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   )
// // }

// // // Component for recipe suggestions
// // function RecipeSuggestions({ recipes }: { recipes: RecipeSuggestion[] }) {
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle className="flex items-center gap-2">
// //           <Utensils className="h-5 w-5 text-primary" />
// //           <span>AI Recipe Suggestions</span>
// //         </CardTitle>
// //         <CardDescription>Recipes based on detected ingredients</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="space-y-4">
// //           {recipes.map((recipe, index) => (
// //             <div key={index} className="border rounded-lg p-4">
// //               <h3 className="font-medium mb-2">{recipe.name}</h3>
// //               <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
// //                 <Clock className="h-4 w-4" />
// //                 <span>Prep time: {recipe.prepTime}</span>
// //               </div>
// //               <div className="mb-3">
// //                 <p className="text-sm font-medium mb-1">Ingredients:</p>
// //                 <ul className="text-sm list-disc list-inside">
// //                   {recipe.ingredients.map((ingredient, i) => (
// //                     <li key={i}>{ingredient}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-medium mb-1">Instructions:</p>
// //                 <ol className="text-sm list-decimal list-inside space-y-1">
// //                   {recipe.instructions.map((step, i) => (
// //                     <li key={i}>{step}</li>
// //                   ))}
// //                 </ol>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// // // ... (keep the existing ScanResultItem and CaptureHistoryItem components)
// // function CaptureHistoryItem({
// //   date,
// //   type,
// //   itemsIdentified,
// //   insights,
// // }: {
// //   date: string
// //   type: "Inventory" | "Waste"
// //   itemsIdentified: number
// //   insights: number
// // }) {
// //   return (
// //     <div className="flex items-center justify-between p-4 rounded-md border">
// //       <div className="flex items-center gap-4">
// //         <div
// //           className={`h-10 w-10 rounded-full flex items-center justify-center ${
// //             type === "Inventory" ? "bg-blue-100" : "bg-amber-100"
// //           }`}
// //         >
// //           {type === "Inventory" ? (
// //             <Camera className={`h-5 w-5 text-blue-700`} />
// //           ) : (
// //             <ImageIcon className={`h-5 w-5 text-amber-700`} />
// //           )}
// //         </div>
// //         <div>
// //           <p className="font-medium">{type} Scan</p>
// //           <p className="text-sm text-muted-foreground">{date}</p>
// //         </div>
// //       </div>
// //       <div className="flex items-center gap-4">
// //         <div className="text-right">
// //           <p className="text-sm text-muted-foreground">Items</p>
// //           <p className="font-medium">{itemsIdentified}</p>
// //         </div>
// //         <div className="text-right">
// //           <p className="text-sm text-muted-foreground">Insights</p>
// //           <p className="font-medium">{insights}</p>
// //         </div>
// //         <Button variant="ghost" size="icon">
// //           <FileText className="h-4 w-4" />
// //         </Button>
// //       </div>
// //     </div>
// //   )
// // }



// // function ScanResultItem({
// //   name,
// //   quantity,
// //   confidence,
// //   status,
// // }: {
// //   name: string
// //   quantity: string
// //   confidence: string
// //   status: "updated" | "unidentified"
// // }) {
// //   return (
// //     <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
// //       <div className="flex items-center gap-3">
// //         <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
// //           <ImageIcon className="h-4 w-4 text-primary" />
// //         </div>
// //         <div>
// //           <p className="font-medium text-sm">{name}</p>
// //           <p className="text-xs text-muted-foreground">Quantity: {quantity}</p>
// //         </div>
// //       </div>
// //       <div className="text-right">
// //         <Badge
// //           variant="outline"
// //           className={
// //             status === "updated"
// //               ? "bg-green-50 text-green-700 border-green-200"
// //               : "bg-amber-50 text-amber-700 border-amber-200"
// //           }
// //         >
// //           {status === "updated" ? <Check className="h-3 w-3 mr-1" /> : null}
// //           {status === "updated" ? "Updated" : "Low Confidence"}
// //         </Badge>
// //         <p className="text-xs text-muted-foreground mt-1">Confidence: {confidence}</p>
// //       </div>
// //     </div>
// //   )
// // }

// // !5th
// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Camera, Check, Clock, FileText, ImageIcon, Loader2, RotateCw, Upload, Utensils, Carrot, Apple, Drumstick, Milk } from "lucide-react"

// // Types
// type DetectedItem = {
//   name: string
//   quantity: string
//   confidence: number
//   category: "vegetable" | "fruit" | "meat" | "dairy" | "other"
//   bbox: [number, number, number, number] // [x, y, width, height]
//   nutritionalInfo?: {
//     calories: number
//     carbs: number
//     protein: number
//     fat: number
//   }
// }

// type RecipeSuggestion = {
//   name: string
//   ingredients: string[]
//   instructions: string[]
//   prepTime: string
//   cookTime: string
//   servings: number
//   nutritionPerServing: {
//     calories: number
//     carbs: number
//     protein: number
//     fat: number
//   }
// }

// export default function FoodVisionCapturePage() {
//   // State management
//   const [captureState, setCaptureState] = useState<"idle" | "capturing" | "processing" | "complete">("idle")
//   const [activeTab, setActiveTab] = useState("live")
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([])
//   const [recipeSuggestions, setRecipeSuggestions] = useState<RecipeSuggestion[]>([])
//   const [modelLoaded, setModelLoaded] = useState(false)
  
//   // Refs
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const streamRef = useRef<MediaStream | null>(null)
//   const detectionCanvasRef = useRef<HTMLCanvasElement>(null)

//   // Food database - only includes edible items
//   const FOOD_DATABASE = {
//     // Vegetables
//     "Tomato": { category: "vegetable", quantity: "1", calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
//     "Carrot": { category: "vegetable", quantity: "1", calories: 41, carbs: 9.6, protein: 0.9, fat: 0.2 },
//     "Lettuce": { category: "vegetable", quantity: "1 head", calories: 5, carbs: 1, protein: 0.5, fat: 0.1 },
//     "Bell Pepper": { category: "vegetable", quantity: "1", calories: 31, carbs: 6, protein: 1, fat: 0.3 },
//     "Onion": { category: "vegetable", quantity: "1", calories: 40, carbs: 9.3, protein: 1.1, fat: 0.1 },
//     "Broccoli": { category: "vegetable", quantity: "1 head", calories: 55, carbs: 11, protein: 4, fat: 0.6 },
    
//     // Fruits
//     "Apple": { category: "fruit", quantity: "1", calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
//     "Banana": { category: "fruit", quantity: "1", calories: 89, carbs: 22.8, protein: 1.1, fat: 0.3 },
//     "Orange": { category: "fruit", quantity: "1", calories: 62, carbs: 15.4, protein: 1.2, fat: 0.2 },
    
//     // Meat
//     "Chicken": { category: "meat", quantity: "1 breast", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
//     "Beef": { category: "meat", quantity: "100g", calories: 250, carbs: 0, protein: 26, fat: 17 },
    
//     // Dairy
//     "Milk": { category: "dairy", quantity: "1 cup", calories: 103, carbs: 12, protein: 8, fat: 2.4 },
//     "Cheese": { category: "dairy", quantity: "100g", calories: 402, carbs: 1.3, protein: 25, fat: 33 }
//   }

//   // Load TensorFlow.js and food detection model
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         // Load TensorFlow.js
//         const tf = await import('@tensorflow/tfjs')
//         await tf.ready()
        
//         // Simulate model loading
//         setTimeout(() => {
//           setModelLoaded(true)
//           console.log('Food detection model loaded')
//         }, 2000)
//       } catch (err) {
//         console.error("Error loading models:", err)
//       }
//     }

//     loadModels()
//   }, [])

//   // Initialize camera when live tab is selected
//   useEffect(() => {
//     if (activeTab === "live") {
//       startCamera()
//     } else {
//       stopCamera()
//     }

//     return () => stopCamera()
//   }, [activeTab])

//   // Camera functions
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//         audio: false
//       })
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream
//         streamRef.current = stream
//       }
//     } catch (err) {
//       console.error("Camera error:", err)
//     }
//   }

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach(track => track.stop())
//     streamRef.current = null
//   }

//   // Image processing functions
//   const captureFromCamera = async () => {
//     if (!videoRef.current || !canvasRef.current) return

//     setCaptureState("capturing")
    
//     const canvas = canvasRef.current
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = videoRef.current.videoWidth
//     canvas.height = videoRef.current.videoHeight
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    
//     const imageData = canvas.toDataURL('image/jpeg')
//     await processImage(imageData)
//   }

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = async (event) => {
//       const imageData = event.target?.result as string
//       setUploadedImage(imageData)
//       setCaptureState("processing")
//       await processImage(imageData)
//     }
//     reader.readAsDataURL(file)
//   }

//   // Food detection - only identifies known food items
//   const detectFoodItems = async (imageData: string): Promise<DetectedItem[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulate detection - in real app this would use YOLO/OpenCV
//         // We only return items that exist in our FOOD_DATABASE
//         const possibleDetections = [
//           {
//             name: "Tomato",
//             confidence: 92,
//             bbox: [100, 100, 50, 50]
//           },
//           {
//             name: "Apple",
//             confidence: 89,
//             bbox: [200, 150, 60, 60]
//           },
//           {
//             name: "Chicken",
//             confidence: 85,
//             bbox: [300, 200, 70, 40]
//           },
//           {
//             name: "Lettuce",
//             confidence: 88,
//             bbox: [150, 250, 80, 30]
//           },
//           {
//             name: "Phone", // Non-food item - will be filtered out
//             confidence: 95,
//             bbox: [400, 100, 40, 40]
//           },
//           {
//             name: "Carrot",
//             confidence: 90,
//             bbox: [250, 300, 45, 45]
//           }
//         ]

//         // Filter to only include known food items
//         const foodItems = possibleDetections
//           .filter(detection => FOOD_DATABASE.hasOwnProperty(detection.name))
//           .map(detection => ({
//             ...detection,
//             ...FOOD_DATABASE[detection.name as keyof typeof FOOD_DATABASE],
//             bbox: detection.bbox
//           }))

//         resolve(foodItems)
//       }, 1500)
//     })
//   }

//   // Process image and detect food items
//   const processImage = async (imageData: string) => {
//     setCaptureState("processing")
    
//     try {
//       const detectedFoods = await detectFoodItems(imageData)
//       setDetectedItems(detectedFoods)
      
//       // Generate recipes based on detected foods
//       const recipes = await generateRecipes(detectedFoods)
//       setRecipeSuggestions(recipes)
      
//       setCaptureState("complete")
//     } catch (error) {
//       console.error("Food detection failed:", error)
//       setCaptureState("idle")
//     }
//   }

//   // Generate recipes based on detected foods
//   const generateRecipes = async (foods: DetectedItem[]): Promise<RecipeSuggestion[]> => {
//     if (foods.length === 0) return []
    
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const recipes: RecipeSuggestion[] = []
        
//         // Chicken salad recipe
//         if (foods.some(f => f.name === "Chicken") && 
//             foods.some(f => f.name === "Lettuce") && 
//             foods.some(f => f.name === "Tomato")) {
//           recipes.push({
//             name: "Chicken Salad",
//             ingredients: ["Chicken", "Lettuce", "Tomato"],
//             instructions: [
//               "Grill the chicken breast until fully cooked",
//               "Chop lettuce and tomatoes",
//               "Slice the chicken into strips",
//               "Combine all ingredients in a bowl",
//               "Add your favorite dressing and toss"
//             ],
//             prepTime: "15 mins",
//             cookTime: "10 mins",
//             servings: 2,
//             nutritionPerServing: {
//               calories: 320,
//               carbs: 12,
//               protein: 35,
//               fat: 15
//             }
//           })
//         }
        
//         // Vegetable stir fry
//         if (foods.some(f => f.name === "Bell Pepper") && 
//             foods.some(f => f.name === "Carrot") && 
//             foods.some(f => f.name === "Onion")) {
//           recipes.push({
//             name: "Vegetable Stir Fry",
//             ingredients: ["Bell Pepper", "Carrot", "Onion"],
//             instructions: [
//               "Slice all vegetables into thin strips",
//               "Heat oil in a wok or large pan",
//               "Stir fry vegetables on high heat for 5-7 minutes",
//               "Season with soy sauce and spices"
//             ],
//             prepTime: "10 mins",
//             cookTime: "7 mins",
//             servings: 2,
//             nutritionPerServing: {
//               calories: 120,
//               carbs: 20,
//               protein: 3,
//               fat: 4
//             }
//           })
//         }
        
//         // Fruit salad
//         if (foods.some(f => f.name === "Apple") && 
//             foods.some(f => f.name === "Banana")) {
//           recipes.push({
//             name: "Fruit Salad",
//             ingredients: ["Apple", "Banana"],
//             instructions: [
//               "Wash and chop the apple",
//               "Peel and slice the banana",
//               "Combine in a bowl",
//               "Add a squeeze of lemon juice"
//             ],
//             prepTime: "5 mins",
//             cookTime: "0 mins",
//             servings: 1,
//             nutritionPerServing: {
//               calories: 150,
//               carbs: 38,
//               protein: 1,
//               fat: 0.5
//             }
//           })
//         }
        
//         // Fallback simple recipe
//         if (recipes.length === 0 && foods.length > 0) {
//           recipes.push({
//             name: "Simple Dish",
//             ingredients: foods.slice(0, 3).map(f => f.name),
//             instructions: [
//               "Prepare all ingredients",
//               "Combine in a pan or bowl",
//               "Cook or mix as desired",
//               "Season to taste"
//             ],
//             prepTime: "10 mins",
//             cookTime: "10 mins",
//             servings: 2,
//             nutritionPerServing: {
//               calories: 250,
//               carbs: 20,
//               protein: 15,
//               fat: 8
//             }
//           })
//         }
        
//         resolve(recipes)
//       }, 1000)
//     })
//   }

//   const handleReset = () => {
//     setCaptureState("idle")
//     setUploadedImage(null)
//     setDetectedItems([])
//     setRecipeSuggestions([])
//   }

//   // Draw bounding boxes on detected food items
//   useEffect(() => {
//     if (detectionCanvasRef.current && detectedItems.length > 0) {
//       const canvas = detectionCanvasRef.current
//       const ctx = canvas.getContext('2d')
//       if (!ctx) return
      
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
      
//       // Draw each food item with category-specific colors
//       detectedItems.forEach(item => {
//         const [x, y, width, height] = item.bbox
        
//         // Set color based on category
//         let color = "#00AA00" // Default green for vegetables
//         if (item.category === "fruit") color = "#FFA500" // orange for fruits
//         if (item.category === "meat") color = "#FF4500" // orangered for meat
//         if (item.category === "dairy") color = "#FFFF00" // yellow for dairy
        
//         // Draw bounding box
//         ctx.strokeStyle = color
//         ctx.lineWidth = 2
//         ctx.strokeRect(x, y, width, height)
        
//         // Draw label background
//         ctx.fillStyle = color
//         const text = `${item.name} (${item.confidence}%)`
//         const textWidth = ctx.measureText(text).width
//         ctx.fillRect(x - 2, y - 20, textWidth + 4, 20)
        
//         // Draw label text
//         ctx.fillStyle = "#FFFFFF"
//         ctx.font = "12px Arial"
//         ctx.fillText(text, x, y - 5)
//       })
//     }
//   }, [detectedItems])

//   // Get icon for food category
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case "vegetable": return <Carrot className="h-4 w-4" />
//       case "fruit": return <Apple className="h-4 w-4" />
//       case "meat": return <Drumstick className="h-4 w-4" />
//       case "dairy": return <Milk className="h-4 w-4" />
//       default: return <Utensils className="h-4 w-4" />
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Food Vision Scanner</h1>
//         <div className="flex items-center gap-2">
//           <Button 
//             variant="outline" 
//             size="sm" 
//             className="gap-1"
//             onClick={() => setActiveTab("upload")}
//           >
//             <Upload className="h-4 w-4" />
//             <span>Upload Image</span>
//           </Button>
//         </div>
//       </div>

//       {/* Main tabs */}
//       <Tabs defaultValue="live" className="space-y-6" onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="live">Live Camera</TabsTrigger>
//           <TabsTrigger value="upload">Upload Image</TabsTrigger>
//         </TabsList>

//         {/* Live Camera Tab */}
//         <TabsContent value="live">
//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="md:col-span-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Food Detection Camera</CardTitle>
//                   <CardDescription>
//                     Scan vegetables and food items in real-time
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
//                     {captureState === "idle" && (
//                       <video 
//                         ref={videoRef} 
//                         autoPlay 
//                         playsInline 
//                         muted 
//                         className="w-full h-full object-cover"
//                       />
//                     )}

//                     {captureState === "capturing" && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                         <div className="text-center text-white">
//                           <div className="h-20 w-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
//                           <p className="text-white font-medium">Capturing image...</p>
//                         </div>
//                       </div>
//                     )}

//                     {captureState === "processing" && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                         <div className="text-center text-white">
//                           <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
//                           <p className="text-white font-medium">Identifying food items...</p>
//                           <p className="text-sm text-white/80 mt-2">
//                             Filtering for vegetables and edible items only
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {captureState === "complete" && (
//                       <>
//                         <img 
//                           src={canvasRef.current?.toDataURL() || ''} 
//                           alt="Captured" 
//                           className="w-full h-full object-contain"
//                         />
//                         <canvas 
//                           ref={detectionCanvasRef} 
//                           className="absolute inset-0 w-full h-full pointer-events-none"
//                           width={videoRef.current?.videoWidth}
//                           height={videoRef.current?.videoHeight}
//                         />
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                           <div className="text-center text-white">
//                             <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
//                               <Check className="h-8 w-8 text-white" />
//                             </div>
//                             <p className="text-xl font-medium">Scan Complete!</p>
//                             <p className="mt-2">{detectedItems.length} food items found</p>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     <canvas ref={canvasRef} className="hidden" />
//                     <div className="absolute top-4 left-4 flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
//                       <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   {captureState === "idle" && (
//                     <Button className="gap-2 w-full" onClick={captureFromCamera}>
//                       <Camera className="h-4 w-4" />
//                       <span>Scan Food Items</span>
//                     </Button>
//                   )}

//                   {(captureState === "capturing" || captureState === "processing") && (
//                     <Button disabled className="gap-2 w-full">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       <span>{captureState === "capturing" ? "Capturing..." : "Processing..."}</span>
//                     </Button>
//                   )}

//                   {captureState === "complete" && (
//                     <div className="flex gap-2 w-full">
//                       <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
//                         <RotateCw className="h-4 w-4" />
//                         <span>New Scan</span>
//                       </Button>
//                       <Button className="gap-2 flex-1">
//                         <FileText className="h-4 w-4" />
//                         <span>View Results</span>
//                       </Button>
//                     </div>
//                   )}
//                 </CardFooter>
//               </Card>
//             </div>

//             {/* Results Panel */}
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Food Items Detected</CardTitle>
//                   <CardDescription>Only vegetables and edible items are shown</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {captureState !== "complete" ? (
//                     <div className="py-8 text-center text-muted-foreground">
//                       <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
//                       <p>Food items will appear here after scan</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <p className="text-sm font-medium">{detectedItems.length} edible items found:</p>
//                         <div className="flex items-center gap-2">
//                           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//                             <Carrot className="h-3 w-3 mr-1" />
//                             {detectedItems.filter(i => i.category === "vegetable").length} Vegetables
//                           </Badge>
//                           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
//                             <Apple className="h-3 w-3 mr-1" />
//                             {detectedItems.filter(i => i.category === "fruit").length} Fruits
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
//                         {detectedItems.map((item, index) => (
//                           <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
//                             <div className="flex items-center gap-3">
//                               <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                                 item.category === "vegetable" ? "bg-green-100 text-green-700" :
//                                 item.category === "fruit" ? "bg-amber-100 text-amber-700" :
//                                 item.category === "meat" ? "bg-red-100 text-red-700" :
//                                 item.category === "dairy" ? "bg-yellow-100 text-yellow-700" :
//                                 "bg-gray-100 text-gray-700"
//                               }`}>
//                                 {getCategoryIcon(item.category)}
//                               </div>
//                               <div>
//                                 <p className="font-medium text-sm">{item.name}</p>
//                                 <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <Badge variant="outline">
//                                 {item.confidence}% Confidence
//                               </Badge>
//                               {item.nutritionalInfo && (
//                                 <p className="text-xs text-muted-foreground mt-1">
//                                   {item.nutritionalInfo.calories} kcal
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {detectedItems.some(i => i.nutritionalInfo) && (
//                         <div className="pt-4 border-t">
//                           <p className="text-sm font-medium mb-2">Nutritional Summary:</p>
//                           <div className="grid grid-cols-4 gap-2 text-sm">
//                             <div className="bg-green-50 p-2 rounded text-center">
//                               <p className="font-medium">{detectedItems.reduce((sum, item) => sum + (item.nutritionalInfo?.calories || 0), 0)}</p>
//                               <p className="text-xs text-muted-foreground">Calories</p>
//                             </div>
//                             <div className="bg-blue-50 p-2 rounded text-center">
//                               <p className="font-medium">{detectedItems.reduce((sum, item) => sum + (item.nutritionalInfo?.carbs || 0), 0)}g</p>
//                               <p className="text-xs text-muted-foreground">Carbs</p>
//                             </div>
//                             <div className="bg-purple-50 p-2 rounded text-center">
//                               <p className="font-medium">{detectedItems.reduce((sum, item) => sum + (item.nutritionalInfo?.protein || 0), 0)}g</p>
//                               <p className="text-xs text-muted-foreground">Protein</p>
//                             </div>
//                             <div className="bg-red-50 p-2 rounded text-center">
//                               <p className="font-medium">{detectedItems.reduce((sum, item) => sum + (item.nutritionalInfo?.fat || 0), 0)}g</p>
//                               <p className="text-xs text-muted-foreground">Fat</p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
              
//               {captureState === "complete" && recipeSuggestions.length > 0 && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Utensils className="h-5 w-5 text-primary" />
//                       <span>Recipe Suggestions</span>
//                     </CardTitle>
//                     <CardDescription>Based on your detected ingredients</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {recipeSuggestions.map((recipe, index) => (
//                         <div key={index} className="border rounded-lg p-4">
//                           <h3 className="font-medium mb-2">{recipe.name}</h3>
//                           <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
//                             <div className="flex items-center gap-1">
//                               <Clock className="h-4 w-4" />
//                               <span>Prep: {recipe.prepTime}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Clock className="h-4 w-4" />
//                               <span>Cook: {recipe.cookTime}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Utensils className="h-4 w-4" />
//                               <span>Serves: {recipe.servings}</span>
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="text-sm font-medium mb-1">Ingredients:</p>
//                               <ul className="text-sm list-disc list-inside">
//                                 {recipe.ingredients.map((ingredient, i) => (
//                                   <li key={i}>{ingredient}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium mb-1">Nutrition (per serving):</p>
//                               <div className="grid grid-cols-2 gap-1 text-sm">
//                                 <div>
//                                   <p className="font-medium">{recipe.nutritionPerServing.calories}</p>
//                                   <p className="text-xs text-muted-foreground">Calories</p>
//                                 </div>
//                                 <div>
//                                   <p className="font-medium">{recipe.nutritionPerServing.carbs}g</p>
//                                   <p className="text-xs text-muted-foreground">Carbs</p>
//                                 </div>
//                                 <div>
//                                   <p className="font-medium">{recipe.nutritionPerServing.protein}g</p>
//                                   <p className="text-xs text-muted-foreground">Protein</p>
//                                 </div>
//                                 <div>
//                                   <p className="font-medium">{recipe.nutritionPerServing.fat}g</p>
//                                   <p className="text-xs text-muted-foreground">Fat</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div>
//                             <p className="text-sm font-medium mb-1">Instructions:</p>
//                             <ol className="text-sm list-decimal list-inside space-y-1">
//                               {recipe.instructions.map((step, i) => (
//                                 <li key={i}>{step}</li>
//                               ))}
//                             </ol>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </TabsContent>

//         {/* Upload Image Tab */}
//         <TabsContent value="upload">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upload Food Image</CardTitle>
//               <CardDescription>
//                 Scan vegetables and other food items from your photos
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {!uploadedImage ? (
//                 <div className="border-2 border-dashed rounded-lg p-12 text-center">
//                   <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <Upload className="h-8 w-8 text-primary" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2">Upload food photo</h3>
//                   <p className="text-sm text-muted-foreground mb-6">
//                     Only vegetables and edible items will be detected
//                   </p>
//                   <input
//                     type="file"
//                     id="image-upload"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileUpload}
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer">
//                     <Button asChild>
//                       <span>Select Image</span>
//                     </Button>
//                   </label>
//                 </div>
//               ) : (
//                 <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
//                   <img 
//                     src={uploadedImage} 
//                     alt="Uploaded food" 
//                     className="w-full h-full object-contain"
//                   />
//                   <canvas 
//                     ref={detectionCanvasRef} 
//                     className="absolute inset-0 w-full h-full pointer-events-none"
//                   />

//                   {captureState === "processing" && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
//                         <p className="text-white font-medium">Identifying food items...</p>
//                         <p className="text-sm text-white/80 mt-2">
//                           Filtering for vegetables and edible items only
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {captureState === "complete" && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
//                           <Check className="h-8 w-8 text-white" />
//                         </div>
//                         <p className="text-xl font-medium">Analysis Complete!</p>
//                         <p className="mt-2">{detectedItems.length} food items found</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               {uploadedImage && captureState === "idle" && (
//                 <Button className="gap-2 w-full" onClick={() => processImage(uploadedImage)}>
//                   <ImageIcon className="h-4 w-4" />
//                   <span>Scan for Food Items</span>
//                 </Button>
//               )}

//               {captureState === "processing" && (
//                 <Button disabled className="gap-2 w-full">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span>Processing...</span>
//                 </Button>
//               )}

//               {captureState === "complete" && (
//                 <div className="flex gap-2 w-full">
//                   <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
//                     <RotateCw className="h-4 w-4" />
//                     <span>New Upload</span>
//                   </Button>
//                   <Button className="gap-2 flex-1">
//                     <FileText className="h-4 w-4" />
//                     <span>View Results</span>
//                   </Button>
//                 </div>
//               )}
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Camera, Check, Clock, FileText, ImageIcon, Loader2, RotateCw, Upload, Utensils, Carrot, Apple, Drumstick, Milk, ChefHat, AlertCircle } from "lucide-react"
// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as mobilenet from '@tensorflow-models/mobilenet';

// // Food categories for filtering
// const FOOD_CATEGORIES = [
//   'apple', 'orange', 'banana', 'carrot', 'broccoli', 'tomato', 'potato',
//   'onion', 'lettuce', 'cucumber', 'pepper', 'mushroom', 'garlic', 'lemon',
//   'food', 'fruit', 'vegetable'
// ];

// // Recipe suggestions based on ingredients
// const RECIPE_DATABASE = {
//   'tomato': ['Tomato Pasta Sauce', 'Fresh Salsa', 'Bruschetta'],
//   'onion': ['French Onion Soup', 'Caramelized Onions', 'Onion Gravy'],
//   'potato': ['Mashed Potatoes', 'Roasted Potatoes', 'Potato Soup'],
//   'carrot': ['Carrot Cake', 'Glazed Carrots', 'Carrot Soup'],
//   'broccoli': ['Broccoli Stir Fry', 'Roasted Broccoli', 'Broccoli Cheese Soup'],
//   'mushroom': ['Mushroom Risotto', 'Sautéed Mushrooms', 'Cream of Mushroom Soup'],
//   'cucumber': ['Greek Salad', 'Cucumber Sandwiches', 'Tzatziki Sauce'],
//   'lettuce': ['Caesar Salad', 'Lettuce Wraps', 'Garden Salad'],
//   'pepper': ['Stuffed Peppers', 'Roasted Bell Peppers', 'Pepper Stir Fry'],
//   'garlic': ['Garlic Bread', 'Roasted Garlic', 'Garlic Butter Sauce']
// };

// const FoodVisionCapturePage = () => {
//   // State management
//   const [captureState, setCaptureState] = useState<"idle" | "capturing" | "processing" | "complete">("idle")
//   const [activeTab, setActiveTab] = useState("live")
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null)
//   const [detectedItems, setDetectedItems] = useState<any[]>([])
//   const [recipeSuggestions, setRecipeSuggestions] = useState<string[]>([])
//   const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
//   const [classificationModel, setClassificationModel] = useState<mobilenet.MobileNet | null>(null)
//   const [error, setError] = useState<string | null>(null)
  
//   // Refs
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const streamRef = useRef<MediaStream | null>(null)
//   const detectionCanvasRef = useRef<HTMLCanvasElement>(null)

//   // Load TensorFlow.js and models
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         await tf.ready();
//         const [objectDetectionModel, imageClassificationModel] = await Promise.all([
//           cocoSsd.load(),
//           mobilenet.load()
//         ]);
//         setModel(objectDetectionModel);
//         setClassificationModel(imageClassificationModel);
//       } catch (err) {
//         setError('Failed to load AI models. Please check your connection and try again.');
//         console.error('Error loading models:', err);
//       }
//     };

//     loadModels();
//   }, []);

//   const isFoodItem = (className: string): boolean => {
//     return FOOD_CATEGORIES.some(category => 
//       className.toLowerCase().includes(category.toLowerCase())
//     );
//   };

//   const getRecipeRecommendations = (items: string[]): string[] => {
//     const recipes = new Set<string>();
//     items.forEach(item => {
//       const itemRecipes = RECIPE_DATABASE[item.toLowerCase() as keyof typeof RECIPE_DATABASE] || [];
//       itemRecipes.forEach(recipe => recipes.add(recipe));
//     });
//     return Array.from(recipes);
//   };

//   // Initialize camera when live tab is selected
//   useEffect(() => {
//     if (activeTab === "live") {
//       startCamera()
//     } else {
//       stopCamera()
//     }

//     return () => stopCamera()
//   }, [activeTab])

//   // Camera functions
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//         audio: false
//       })
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream
//         streamRef.current = stream
//       }
//     } catch (err) {
//       console.error("Camera error:", err)
//     }
//   }

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach(track => track.stop())
//     streamRef.current = null
//   }

//   // Image processing functions
//   const captureFromCamera = async () => {
//     if (!videoRef.current || !canvasRef.current) return

//     setCaptureState("capturing")
    
//     const canvas = canvasRef.current
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = videoRef.current.videoWidth
//     canvas.height = videoRef.current.videoHeight
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    
//     const imageData = canvas.toDataURL('image/jpeg')
//     await processImage(imageData)
//   }

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = async (event) => {
//       const imageData = event.target?.result as string
//       setUploadedImage(imageData)
//       setCaptureState("processing")
//       await processImage(imageData)
//     }
//     reader.readAsDataURL(file)
//   }

//   const analyzeImage = async (imageSrc: string) => {
//     if (!model || !classificationModel) return [];

//     const img = new Image();
//     img.src = imageSrc;
//     await new Promise((resolve) => { img.onload = resolve; });

//     // Run object detection
//     const predictions = await model.detect(img);
    
//     // Run classification for more detailed analysis
//     const tfImg = tf.browser.fromPixels(img);
//     const classification = await classificationModel.classify(tfImg);
//     tfImg.dispose();

//     // Filter and process food items only
//     const foodItems = predictions
//       .filter(pred => isFoodItem(pred.class))
//       .map((pred) => ({
//         item: pred.class,
//         confidence: pred.score,
//         details: classification.find(c => isFoodItem(c.className))?.className || 'Unknown',
//         freshness: pred.score > 0.8 ? 'Fresh' : pred.score > 0.6 ? 'Good' : 'Check Quality',
//         quantity: 1,
//         bbox: [pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]]
//       }));

//     // Generate recipe recommendations
//     const recipes = getRecipeRecommendations(foodItems.map(item => item.item));
//     setRecipeSuggestions(recipes);

//     return foodItems;
//   };

//   const processImage = async (imageData: string) => {
//     setCaptureState("processing")
    
//     try {
//       const results = await analyzeImage(imageData)
//       setDetectedItems(results)
//       setCaptureState("complete")
//     } catch (error) {
//       console.error("Food detection failed:", error)
//       setCaptureState("idle")
//     }
//   }

//   const handleReset = () => {
//     setCaptureState("idle")
//     setUploadedImage(null)
//     setDetectedItems([])
//     setRecipeSuggestions([])
//   }

//   // Draw bounding boxes on detected food items
//   useEffect(() => {
//     if (detectionCanvasRef.current && detectedItems.length > 0) {
//       const canvas = detectionCanvasRef.current
//       const ctx = canvas.getContext('2d')
//       if (!ctx) return
      
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
      
//       // Draw each food item with category-specific colors
//       detectedItems.forEach(item => {
//         const [x, y, width, height] = item.bbox
        
//         // Set color based on freshness
//         let color = "#00AA00" // Default green for fresh
//         if (item.freshness === 'Good') color = "#FFA500" // orange
//         if (item.freshness === 'Check Quality') color = "#FF4500" // red
        
//         // Draw bounding box
//         ctx.strokeStyle = color
//         ctx.lineWidth = 2
//         ctx.strokeRect(x, y, width, height)
        
//         // Draw label background
//         ctx.fillStyle = color
//         const text = `${item.item} (${Math.round(item.confidence * 100)}%)`
//         const textWidth = ctx.measureText(text).width
//         ctx.fillRect(x - 2, y - 20, textWidth + 4, 20)
        
//         // Draw label text
//         ctx.fillStyle = "#FFFFFF"
//         ctx.font = "12px Arial"
//         ctx.fillText(text, x, y - 5)
//       })
//     }
//   }, [detectedItems])

//   // Get icon for food category
//   const getCategoryIcon = (itemName: string) => {
//     if (itemName.toLowerCase().includes('tomato') || itemName.toLowerCase().includes('carrot') || itemName.toLowerCase().includes('lettuce')) {
//       return <Carrot className="h-4 w-4" />
//     }
//     if (itemName.toLowerCase().includes('apple') || itemName.toLowerCase().includes('banana') || itemName.toLowerCase().includes('orange')) {
//       return <Apple className="h-4 w-4" />
//     }
//     if (itemName.toLowerCase().includes('chicken') || itemName.toLowerCase().includes('beef')) {
//       return <Drumstick className="h-4 w-4" />
//     }
//     if (itemName.toLowerCase().includes('milk') || itemName.toLowerCase().includes('cheese')) {
//       return <Milk className="h-4 w-4" />
//     }
//     return <Utensils className="h-4 w-4" />
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">AI Food Scanner & Recipe Assistant</h1>
//         <div className="flex items-center gap-2">
//           <Button 
//             variant="outline" 
//             size="sm" 
//             className="gap-1"
//             onClick={() => setActiveTab("upload")}
//           >
//             <Upload className="h-4 w-4" />
//             <span>Upload Image</span>
//           </Button>
//         </div>
//       </div>

//       {/* Main tabs */}
//       <Tabs defaultValue="live" className="space-y-6" onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="live">Live Camera</TabsTrigger>
//           <TabsTrigger value="upload">Upload Image</TabsTrigger>
//         </TabsList>

//         {/* Live Camera Tab */}
//         <TabsContent value="live">
//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="md:col-span-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Food Detection Camera</CardTitle>
//                   <CardDescription>
//                     Scan vegetables and food items in real-time with AI
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
//                     {captureState === "idle" && (
//                       <video 
//                         ref={videoRef} 
//                         autoPlay 
//                         playsInline 
//                         muted 
//                         className="w-full h-full object-cover"
//                       />
//                     )}

//                     {captureState === "capturing" && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                         <div className="text-center text-white">
//                           <div className="h-20 w-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
//                           <p className="text-white font-medium">Capturing image...</p>
//                         </div>
//                       </div>
//                     )}

//                     {captureState === "processing" && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                         <div className="text-center text-white">
//                           <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
//                           <p className="text-white font-medium">Identifying food items...</p>
//                           <p className="text-sm text-white/80 mt-2">
//                             Using TensorFlow for object detection
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {captureState === "complete" && (
//                       <>
//                         <img 
//                           src={canvasRef.current?.toDataURL() || ''} 
//                           alt="Captured" 
//                           className="w-full h-full object-contain"
//                         />
//                         <canvas 
//                           ref={detectionCanvasRef} 
//                           className="absolute inset-0 w-full h-full pointer-events-none"
//                           width={videoRef.current?.videoWidth}
//                           height={videoRef.current?.videoHeight}
//                         />
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                           <div className="text-center text-white">
//                             <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
//                               <Check className="h-8 w-8 text-white" />
//                             </div>
//                             <p className="text-xl font-medium">Scan Complete!</p>
//                             <p className="mt-2">{detectedItems.length} food items found</p>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     <canvas ref={canvasRef} className="hidden" />
//                     <div className="absolute top-4 left-4 flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
//                       <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   {captureState === "idle" && (
//                     <Button 
//                       className="gap-2 w-full" 
//                       onClick={captureFromCamera}
//                       disabled={!model}
//                     >
//                       <Camera className="h-4 w-4" />
//                       <span>{model ? 'Scan Food Items' : 'Loading Models...'}</span>
//                     </Button>
//                   )}

//                   {(captureState === "capturing" || captureState === "processing") && (
//                     <Button disabled className="gap-2 w-full">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       <span>{captureState === "capturing" ? "Capturing..." : "Processing..."}</span>
//                     </Button>
//                   )}

//                   {captureState === "complete" && (
//                     <div className="flex gap-2 w-full">
//                       <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
//                         <RotateCw className="h-4 w-4" />
//                         <span>New Scan</span>
//                       </Button>
//                       <Button className="gap-2 flex-1">
//                         <FileText className="h-4 w-4" />
//                         <span>View Results</span>
//                       </Button>
//                     </div>
//                   )}
//                 </CardFooter>
//               </Card>
//             </div>

//             {/* Results Panel */}
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Food Items Detected</CardTitle>
//                   <CardDescription>Only vegetables and edible items are shown</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {captureState !== "complete" ? (
//                     <div className="py-8 text-center text-muted-foreground">
//                       <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
//                       <p>Food items will appear here after scan</p>
//                       {error && (
//                         <div className="text-red-500 flex items-center justify-center mt-4">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {error}
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <p className="text-sm font-medium">{detectedItems.length} edible items found:</p>
//                       </div>
                      
//                       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
//                         {detectedItems.map((item, index) => (
//                           <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
//                             <div className="flex items-center gap-3">
//                               <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
//                                 {getCategoryIcon(item.item)}
//                               </div>
//                               <div>
//                                 <p className="font-medium text-sm">{item.item}</p>
//                                 <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <Badge variant="outline" className={
//                                 item.freshness === 'Fresh' ? 'bg-green-50 text-green-700 border-green-200' :
//                                 item.freshness === 'Good' ? 'bg-amber-50 text-amber-700 border-amber-200' :
//                                 'bg-red-50 text-red-700 border-red-200'
//                               }>
//                                 {item.freshness}
//                               </Badge>
//                               <p className="text-xs text-muted-foreground mt-1">
//                                 Confidence: {Math.round(item.confidence * 100)}%
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
              
//               {captureState === "complete" && recipeSuggestions.length > 0 && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <ChefHat className="h-5 w-5 text-primary" />
//                       <span>Recipe Suggestions</span>
//                     </CardTitle>
//                     <CardDescription>Based on your detected ingredients</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {recipeSuggestions.map((recipe, index) => (
//                         <div key={index} className="border rounded-lg p-4">
//                           <h3 className="font-medium mb-2">{recipe}</h3>
//                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                             <Utensils className="h-4 w-4" />
//                             <span>Uses: {detectedItems.filter(item => 
//                               RECIPE_DATABASE[item.item.toLowerCase() as keyof typeof RECIPE_DATABASE]?.includes(recipe)
//                             ).map(item => item.item).join(', ')}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </TabsContent>

//         {/* Upload Image Tab */}
//         <TabsContent value="upload">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upload Food Image</CardTitle>
//               <CardDescription>
//                 Scan vegetables and other food items from your photos
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {!uploadedImage ? (
//                 <div className="border-2 border-dashed rounded-lg p-12 text-center">
//                   <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//                     <Upload className="h-8 w-8 text-primary" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2">Upload food photo</h3>
//                   <p className="text-sm text-muted-foreground mb-6">
//                     Only vegetables and edible items will be detected
//                   </p>
//                   <input
//                     type="file"
//                     id="image-upload"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileUpload}
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer">
//                     <Button asChild>
//                       <span>Select Image</span>
//                     </Button>
//                   </label>
//                 </div>
//               ) : (
//                 <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
//                   <img 
//                     src={uploadedImage} 
//                     alt="Uploaded food" 
//                     className="w-full h-full object-contain"
//                   />
//                   <canvas 
//                     ref={detectionCanvasRef} 
//                     className="absolute inset-0 w-full h-full pointer-events-none"
//                   />

//                   {captureState === "processing" && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
//                         <p className="text-white font-medium">Identifying food items...</p>
//                         <p className="text-sm text-white/80 mt-2">
//                           Using TensorFlow for object detection
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {captureState === "complete" && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
//                           <Check className="h-8 w-8 text-white" />
//                         </div>
//                         <p className="text-xl font-medium">Analysis Complete!</p>
//                         <p className="mt-2">{detectedItems.length} food items found</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               {uploadedImage && captureState === "idle" && (
//                 <Button 
//                   className="gap-2 w-full" 
//                   onClick={() => processImage(uploadedImage)}
//                   disabled={!model}
//                 >
//                   <ImageIcon className="h-4 w-4" />
//                   <span>{model ? 'Scan for Food Items' : 'Loading Models...'}</span>
//                 </Button>
//               )}

//               {captureState === "processing" && (
//                 <Button disabled className="gap-2 w-full">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span>Processing...</span>
//                 </Button>
//               )}

//               {captureState === "complete" && (
//                 <div className="flex gap-2 w-full">
//                   <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
//                     <RotateCw className="h-4 w-4" />
//                     <span>New Upload</span>
//                   </Button>
//                   <Button className="gap-2 flex-1">
//                     <FileText className="h-4 w-4" />
//                     <span>View Results</span>
//                   </Button>
//                 </div>
//               )}
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default FoodVisionCapturePage


// !3rd
"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Check, Clock, FileText, ImageIcon, Loader2, RotateCw, Upload, Utensils, Carrot, Apple, Drumstick, Milk, ChefHat, AlertCircle } from "lucide-react"
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';

// Food categories for filtering
const FOOD_CATEGORIES = [
  // Fruits
  'apple', 'orange', 'banana', 'grape', 'strawberry', 'blueberry', 'raspberry', 
  'mango', 'pineapple', 'watermelon', 'melon', 'pear', 'peach', 'plum', 'kiwi',
  'lemon', 'lime', 'cherry', 'pomegranate', 'apricot', 'coconut', 'fig',
  
  // Vegetables
  'carrot', 'broccoli', 'tomato', 'potato', 'onion', 'lettuce', 'cucumber',
  'pepper', 'mushroom', 'garlic', 'ginger', 'spinach', 'kale', 'cabbage',
  'cauliflower', 'eggplant', 'zucchini', 'pumpkin', 'squash', 'radish', 'turnip',
  'beet', 'celery', 'asparagus', 'artichoke', 'pea', 'bean', 'corn', 'okra',
  'brussels sprout', 'leek', 'shallot', 'scallion', 'chive',
  
  // Herbs
  'basil', 'parsley', 'cilantro', 'mint', 'thyme', 'rosemary', 'oregano', 'sage',
  
  // Other foods
  'bread', 'cheese', 'egg', 'meat', 'chicken', 'fish', 'pasta', 'rice', 'noodle',
  'sushi', 'pizza', 'sandwich', 'burger', 'salad', 'soup', 'steak', 'bacon',
  'sausage', 'ham', 'turkey', 'duck', 'lobster', 'shrimp', 'crab', 'oyster',
  'clam', 'mussel', 'tofu', 'tempeh', 'yogurt', 'milk', 'butter', 'cream',
  
  // Generic categories
  'food', 'fruit', 'vegetable', 'produce', 'dairy', 'meat', 'seafood', 'grain'
];

// Recipe suggestions based on ingredients
const RECIPE_DATABASE = {
  // Vegetables
  'tomato': ['Tomato Pasta Sauce', 'Fresh Salsa', 'Bruschetta', 'Caprese Salad'],
  'onion': ['French Onion Soup', 'Caramelized Onions', 'Onion Gravy', 'Blooming Onion'],
  'potato': ['Mashed Potatoes', 'Roasted Potatoes', 'Potato Soup', 'Potato Pancakes'],
  'carrot': ['Carrot Cake', 'Glazed Carrots', 'Carrot Soup', 'Carrot Slaw'],
  'broccoli': ['Broccoli Stir Fry', 'Roasted Broccoli', 'Broccoli Cheese Soup', 'Broccoli Salad'],
  'mushroom': ['Mushroom Risotto', 'Sautéed Mushrooms', 'Cream of Mushroom Soup', 'Stuffed Mushrooms'],
  'cucumber': ['Greek Salad', 'Cucumber Sandwiches', 'Tzatziki Sauce', 'Cucumber Salad'],
  'lettuce': ['Caesar Salad', 'Lettuce Wraps', 'Garden Salad', 'Wedge Salad'],
  'pepper': ['Stuffed Peppers', 'Roasted Bell Peppers', 'Pepper Stir Fry', 'Pepper Relish'],
  'garlic': ['Garlic Bread', 'Roasted Garlic', 'Garlic Butter Sauce', 'Garlic Aioli'],
  
  // Fruits
  'apple': ['Apple Pie', 'Apple Sauce', 'Apple Crumble', 'Waldorf Salad'],
  'banana': ['Banana Bread', 'Banana Pancakes', 'Banana Pudding', 'Banana Smoothie'],
  'orange': ['Orange Chicken', 'Orange Marmalade', 'Orange Salad', 'Orange Cake'],
  
  // Combinations
  'tomato,onion,garlic': ['Marinara Sauce', 'Tomato Basil Soup', 'Shakshuka'],
  'potato,onion': ['Potato Onion Tart', 'Potato Latkes', 'Potato and Onion Soup'],
  'carrot,ginger': ['Carrot Ginger Soup', 'Carrot Ginger Dressing', 'Gingered Carrots'],
};

const FoodVisionCapturePage = () => {
  // State management
  const [captureState, setCaptureState] = useState<"idle" | "capturing" | "processing" | "complete">("idle")
  const [activeTab, setActiveTab] = useState("live")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [detectedItems, setDetectedItems] = useState<any[]>([])
  const [recipeSuggestions, setRecipeSuggestions] = useState<string[]>([])
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  const [classificationModel, setClassificationModel] = useState<mobilenet.MobileNet | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null)

  // Load TensorFlow.js and models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        const [objectDetectionModel, imageClassificationModel] = await Promise.all([
          cocoSsd.load(),
          mobilenet.load()
        ]);
        setModel(objectDetectionModel);
        setClassificationModel(imageClassificationModel);
      } catch (err) {
        setError('Failed to load AI models. Please check your connection and try again.');
        console.error('Error loading models:', err);
      }
    };

    loadModels();
  }, []);

  // Special cases for problematic items
  const isDefinitelyNotFood = (className: string): boolean => {
    const nonFoodItems = [
      'finger', 'hand', 'person', 'plant', 'flower', 'vase', 'bottle',
      'container', 'box', 'utensil', 'tool', 'device', 'electronic'
    ];
    return nonFoodItems.some(item => className.toLowerCase().includes(item));
  };

  const isFoodItem = (className: string): boolean => {
    const lowerClassName = className.toLowerCase();
    
    // Skip if definitely not food
    if (isDefinitelyNotFood(lowerClassName)) return false;
    
    // First check for exact matches
    if (FOOD_CATEGORIES.includes(lowerClassName)) {
      return true;
    }
    
    // Then check for partial matches (like "red apple")
    return FOOD_CATEGORIES.some(category => 
      lowerClassName.includes(category) ||
      category.includes(lowerClassName)
    );
  };

  const getRecipeRecommendations = (items: string[]): string[] => {
    const recipes = new Set<string>();
    
    // Check individual items
    items.forEach(item => {
      const itemRecipes = RECIPE_DATABASE[item.toLowerCase() as keyof typeof RECIPE_DATABASE] || [];
      itemRecipes.forEach(recipe => recipes.add(recipe));
    });
    
    // Check combinations (2 items)
    if (items.length >= 2) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const combo = `${items[i]},${items[j]}`.toLowerCase();
          const comboRecipes = RECIPE_DATABASE[combo as keyof typeof RECIPE_DATABASE] || [];
          comboRecipes.forEach(recipe => recipes.add(recipe));
        }
      }
    }
    
    // Check combinations (3 items)
    if (items.length >= 3) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          for (let k = j + 1; k < items.length; k++) {
            const combo = `${items[i]},${items[j]},${items[k]}`.toLowerCase();
            const comboRecipes = RECIPE_DATABASE[combo as keyof typeof RECIPE_DATABASE] || [];
            comboRecipes.forEach(recipe => recipes.add(recipe));
          }
        }
      }
    }
    
    return Array.from(recipes);
  };

  // Initialize camera when live tab is selected
  useEffect(() => {
    if (activeTab === "live") {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [activeTab])

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (err) {
      console.error("Camera error:", err)
      setError('Failed to access camera. Please check permissions and try again.');
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
  }

  // Image processing functions
  const captureFromCamera = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setCaptureState("capturing")
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    
    const imageData = canvas.toDataURL('image/jpeg')
    await processImage(imageData)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imageData = event.target?.result as string
      setUploadedImage(imageData)
      setCaptureState("processing")
      await processImage(imageData)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageSrc: string) => {
    if (!model || !classificationModel) return [];

    const img = new Image();
    img.src = imageSrc;
    await new Promise((resolve) => { img.onload = resolve; });

    // Run object detection
    const predictions = await model.detect(img);
    
    // Run classification for more detailed analysis
    const tfImg = tf.browser.fromPixels(img);
    const classification = await classificationModel.classify(tfImg);
    tfImg.dispose();

    // Filter and process food items only
    const foodItems = predictions
      .filter(pred => isFoodItem(pred.class))
      .map((pred) => ({
        item: pred.class,
        confidence: pred.score,
        details: classification.find(c => isFoodItem(c.className))?.className || 'Unknown',
        freshness: pred.score > 0.8 ? 'Fresh' : pred.score > 0.6 ? 'Good' : 'Check Quality',
        quantity: 1,
        bbox: [pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]]
      }));

    // Generate recipe recommendations
    const recipes = getRecipeRecommendations(foodItems.map(item => item.item));
    setRecipeSuggestions(recipes);

    return foodItems;
  };

  const processImage = async (imageData: string) => {
    setCaptureState("processing")
    
    try {
      const results = await analyzeImage(imageData)
      setDetectedItems(results)
      setCaptureState("complete")
    } catch (error) {
      console.error("Food detection failed:", error)
      setError('Food detection failed. Please try with a different image.');
      setCaptureState("idle")
    }
  }

  const handleReset = () => {
    setCaptureState("idle")
    setUploadedImage(null)
    setDetectedItems([])
    setRecipeSuggestions([])
    setError(null)
  }

  // Draw bounding boxes on detected food items
  useEffect(() => {
    if (detectionCanvasRef.current && detectedItems.length > 0) {
      const canvas = detectionCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw each food item with category-specific colors
      detectedItems.forEach(item => {
        const [x, y, width, height] = item.bbox
        
        // Set color based on freshness
        let color = "#00AA00" // Default green for fresh
        if (item.freshness === 'Good') color = "#FFA500" // orange
        if (item.freshness === 'Check Quality') color = "#FF4500" // red
        
        // Draw bounding box
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, width, height)
        
        // Draw label background
        ctx.fillStyle = color
        const text = `${item.item} (${Math.round(item.confidence * 100)}%)`
        const textWidth = ctx.measureText(text).width
        ctx.fillRect(x - 2, y - 20, textWidth + 4, 20)
        
        // Draw label text
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "12px Arial"
        ctx.fillText(text, x, y - 5)
      })
    }
  }, [detectedItems])

  // Get icon for food category
  const getCategoryIcon = (itemName: string) => {
    if (itemName.toLowerCase().includes('tomato') || itemName.toLowerCase().includes('carrot') || itemName.toLowerCase().includes('lettuce')) {
      return <Carrot className="h-4 w-4" />
    }
    if (itemName.toLowerCase().includes('apple') || itemName.toLowerCase().includes('banana') || itemName.toLowerCase().includes('orange')) {
      return <Apple className="h-4 w-4" />
    }
    if (itemName.toLowerCase().includes('chicken') || itemName.toLowerCase().includes('beef')) {
      return <Drumstick className="h-4 w-4" />
    }
    if (itemName.toLowerCase().includes('milk') || itemName.toLowerCase().includes('cheese')) {
      return <Milk className="h-4 w-4" />
    }
    return <Utensils className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Food Scanner & Recipe Assistant</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => setActiveTab("upload")}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Image</span>
          </Button>
        </div>
      </div>

      {/* Main tabs */}
      <Tabs defaultValue="live" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="live">Live Camera</TabsTrigger>
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
        </TabsList>

        {/* Live Camera Tab */}
        <TabsContent value="live">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Food Detection Camera</CardTitle>
                  <CardDescription>
                    Scan vegetables and food items in real-time with AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
                    {captureState === "idle" && (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      />
                    )}

                    {captureState === "capturing" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <div className="h-20 w-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                          <p className="text-white font-medium">Capturing image...</p>
                        </div>
                      </div>
                    )}

                    {captureState === "processing" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                          <p className="text-white font-medium">Identifying food items...</p>
                          <p className="text-sm text-white/80 mt-2">
                            Using TensorFlow for object detection
                          </p>
                        </div>
                      </div>
                    )}

                    {captureState === "complete" && (
                      <>
                        <img 
                          src={canvasRef.current?.toDataURL() || ''} 
                          alt="Captured" 
                          className="w-full h-full object-contain"
                        />
                        <canvas 
                          ref={detectionCanvasRef} 
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          width={videoRef.current?.videoWidth}
                          height={videoRef.current?.videoHeight}
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                              <Check className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-xl font-medium">Scan Complete!</p>
                            <p className="mt-2">{detectedItems.length} food items found</p>
                          </div>
                        </div>
                      </>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {captureState === "idle" && (
                    <Button 
                      className="gap-2 w-full" 
                      onClick={captureFromCamera}
                      disabled={!model}
                    >
                      <Camera className="h-4 w-4" />
                      <span>{model ? 'Scan Food Items' : 'Loading Models...'}</span>
                    </Button>
                  )}

                  {(captureState === "capturing" || captureState === "processing") && (
                    <Button disabled className="gap-2 w-full">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{captureState === "capturing" ? "Capturing..." : "Processing..."}</span>
                    </Button>
                  )}

                  {captureState === "complete" && (
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
                        <RotateCw className="h-4 w-4" />
                        <span>New Scan</span>
                      </Button>
                      <Button className="gap-2 flex-1">
                        <FileText className="h-4 w-4" />
                        <span>View Results</span>
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Food Items Detected</CardTitle>
                  <CardDescription>Only vegetables and edible items are shown</CardDescription>
                </CardHeader>
                <CardContent>
                  {captureState !== "complete" ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>Food items will appear here after scan</p>
                      {error && (
                        <div className="text-red-500 flex items-center justify-center mt-4">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {error}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{detectedItems.length} edible items found:</p>
                      </div>
                      
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {detectedItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                {getCategoryIcon(item.item)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{item.item}</p>
                                <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className={
                                item.freshness === 'Fresh' ? 'bg-green-50 text-green-700 border-green-200' :
                                item.freshness === 'Good' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-red-50 text-red-700 border-red-200'
                              }>
                                {item.freshness}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                Confidence: {Math.round(item.confidence * 100)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {captureState === "complete" && recipeSuggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-primary" />
                      <span>Recipe Suggestions</span>
                    </CardTitle>
                    <CardDescription>Based on your detected ingredients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recipeSuggestions.map((recipe, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">{recipe}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Utensils className="h-4 w-4" />
                            <span>Uses: {detectedItems.filter(item => 
                              RECIPE_DATABASE[item.item.toLowerCase() as keyof typeof RECIPE_DATABASE]?.includes(recipe)
                            ).map(item => item.item).join(', ')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Upload Image Tab */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Food Image</CardTitle>
              <CardDescription>
                Scan vegetables and other food items from your photos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedImage ? (
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Upload food photo</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Only vegetables and edible items will be detected
                  </p>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button asChild>
                      <span>Select Image</span>
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded food" 
                    className="w-full h-full object-contain"
                  />
                  <canvas 
                    ref={detectionCanvasRef} 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />

                  {captureState === "processing" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-white font-medium">Identifying food items...</p>
                        <p className="text-sm text-white/80 mt-2">
                          Using TensorFlow for object detection
                        </p>
                      </div>
                    </div>
                  )}

                  {captureState === "complete" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-xl font-medium">Analysis Complete!</p>
                        <p className="mt-2">{detectedItems.length} food items found</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {uploadedImage && captureState === "idle" && (
                <Button 
                  className="gap-2 w-full" 
                  onClick={() => processImage(uploadedImage)}
                  disabled={!model}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>{model ? 'Scan for Food Items' : 'Loading Models...'}</span>
                </Button>
              )}

              {captureState === "processing" && (
                <Button disabled className="gap-2 w-full">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </Button>
              )}

              {captureState === "complete" && (
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="gap-2 flex-1" onClick={handleReset}>
                    <RotateCw className="h-4 w-4" />
                    <span>New Upload</span>
                  </Button>
                  <Button className="gap-2 flex-1">
                    <FileText className="h-4 w-4" />
                    <span>View Results</span>
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FoodVisionCapturePage