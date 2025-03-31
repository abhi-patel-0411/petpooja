// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { AlertTriangle, ArrowUpDown, Check, ChevronLeft, ChevronRight, Clock, Edit, ExternalLink } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // Sample inventory data
// const inventoryItems = [
//   {
//     id: "INV-001",
//     name: "Tomatoes",
//     category: "Produce",
//     quantity: 12.5,
//     unit: "kg",
//     lastUpdated: "2023-05-15T10:30:00",
//     expiryDate: "2023-05-25",
//     daysLeft: 8,
//     status: "ok",
//     reorderPoint: 5,
//   },
//   {
//     id: "INV-002",
//     name: "Onions",
//     category: "Produce",
//     quantity: 18.2,
//     unit: "kg",
//     lastUpdated: "2023-05-14T14:45:00",
//     expiryDate: "2023-06-10",
//     daysLeft: 24,
//     status: "ok",
//     reorderPoint: 7,
//   },
//   {
//     id: "INV-003",
//     name: "Chicken Breast",
//     category: "Meat",
//     quantity: 8.5,
//     unit: "kg",
//     lastUpdated: "2023-05-15T09:15:00",
//     expiryDate: "2023-05-22",
//     daysLeft: 5,
//     status: "ok",
//     reorderPoint: 4,
//   },
//   {
//     id: "INV-004",
//     name: "Salmon",
//     category: "Seafood",
//     quantity: 4.2,
//     unit: "kg",
//     lastUpdated: "2023-05-15T11:30:00",
//     expiryDate: "2023-05-19",
//     daysLeft: 2,
//     status: "expiring-soon",
//     reorderPoint: 3,
//   },
//   {
//     id: "INV-005",
//     name: "Rice",
//     category: "Grains",
//     quantity: 25.0,
//     unit: "kg",
//     lastUpdated: "2023-05-10T16:20:00",
//     expiryDate: "2023-12-31",
//     daysLeft: 230,
//     status: "ok",
//     reorderPoint: 10,
//   },
//   {
//     id: "INV-006",
//     name: "Fresh Herbs",
//     category: "Produce",
//     quantity: 0.8,
//     unit: "kg",
//     lastUpdated: "2023-05-15T08:45:00",
//     expiryDate: "2023-05-18",
//     daysLeft: 1,
//     status: "expiring-soon",
//     reorderPoint: 0.5,
//   },
//   {
//     id: "INV-007",
//     name: "Potatoes",
//     category: "Produce",
//     quantity: 15.0,
//     unit: "kg",
//     lastUpdated: "2023-05-12T13:10:00",
//     expiryDate: "2023-06-15",
//     daysLeft: 29,
//     status: "ok",
//     reorderPoint: 8,
//   },
//   {
//     id: "INV-008",
//     name: "Yogurt",
//     category: "Dairy",
//     quantity: 3.2,
//     unit: "kg",
//     lastUpdated: "2023-05-14T10:20:00",
//     expiryDate: "2023-05-19",
//     daysLeft: 2,
//     status: "expiring-soon",
//     reorderPoint: 2,
//   },
//   {
//     id: "INV-009",
//     name: "Bell Peppers",
//     category: "Produce",
//     quantity: 4.5,
//     unit: "kg",
//     lastUpdated: "2023-05-15T09:30:00",
//     expiryDate: "2023-05-20",
//     daysLeft: 3,
//     status: "expiring-soon",
//     reorderPoint: 2,
//   },
//   {
//     id: "INV-010",
//     name: "Flour",
//     category: "Baking",
//     quantity: 12.0,
//     unit: "kg",
//     lastUpdated: "2023-05-05T15:45:00",
//     expiryDate: "2023-11-30",
//     daysLeft: 199,
//     status: "ok",
//     reorderPoint: 5,
//   },
// ]

// export default function InventoryTable() {
//   const [page, setPage] = useState(1)
//   const pageSize = 5
//   const totalPages = Math.ceil(inventoryItems.length / pageSize)

//   const paginatedItems = inventoryItems.slice((page - 1) * pageSize, page * pageSize)

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }).format(date)
//   }

//   const getStatusBadge = (status: string, daysLeft: number) => {
//     if (status === "expiring-soon") {
//       return (
//         <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
//           <Clock className="h-3 w-3 mr-1" />
//           {daysLeft <= 1 ? "Expires Today" : `Expires in ${daysLeft} days`}
//         </Badge>
//       )
//     } else if (status === "low-stock") {
//       return (
//         <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//           <AlertTriangle className="h-3 w-3 mr-1" />
//           Low Stock
//         </Badge>
//       )
//     } else {
//       return (
//         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//           <Check className="h-3 w-3 mr-1" />
//           OK
//         </Badge>
//       )
//     }
//   }

//   const getCategoryBadge = (category: string) => {
//     switch (category) {
//       case "Produce":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{category}</Badge>
//       case "Meat":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">{category}</Badge>
//       case "Seafood":
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">{category}</Badge>
//       case "Dairy":
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{category}</Badge>
//       case "Grains":
//         return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">{category}</Badge>
//       case "Baking":
//         return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">{category}</Badge>
//       default:
//         return <Badge variant="outline">{category}</Badge>
//     }
//   }

//   return (
//     <div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">ID</TableHead>
//               <TableHead>
//                 <div className="flex items-center gap-1">
//                   <span>Name</span>
//                   <ArrowUpDown className="h-3 w-3" />
//                 </div>
//               </TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead className="text-right">Quantity</TableHead>
//               <TableHead>Last Updated</TableHead>
//               <TableHead>Expiry Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedItems.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell className="font-medium">{item.id}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{getCategoryBadge(item.category)}</TableCell>
//                 <TableCell className="text-right">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div className="flex items-center justify-end gap-1">
//                           <span>
//                             {item.quantity} {item.unit}
//                           </span>
//                           {item.quantity <= item.reorderPoint && <AlertTriangle className="h-4 w-4 text-amber-500" />}
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>
//                           Reorder point: {item.reorderPoint} {item.unit}
//                         </p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </TableCell>
//                 <TableCell>{formatDate(item.lastUpdated)}</TableCell>
//                 <TableCell>{formatDate(item.expiryDate)}</TableCell>
//                 <TableCell>{getStatusBadge(item.status, item.daysLeft)}</TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex justify-end gap-2">
//                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                       <Edit className="h-4 w-4" />
//                       <span className="sr-only">Edit</span>
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                       <ExternalLink className="h-4 w-4" />
//                       <span className="sr-only">View details</span>
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <p className="text-sm text-muted-foreground">
//           Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, inventoryItems.length)} of{" "}
//           {inventoryItems.length} items
//         </p>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous page</span>
//           </Button>
//           <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next page</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
// !2nd work but not responsive
// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { AlertTriangle, ArrowUpDown, Check, ChevronLeft, ChevronRight, Clock, Edit, ExternalLink } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // Sample inventory data
// const inventoryItems = [
//   { id: "INV-001", name: "Tomatoes", category: "Produce", quantity: 10, unit: "kg", lastUpdated: "2025-03-29T12:30:00", expiryDate: "2025-03-31", daysLeft: 2, status: "expiring-soon", reorderPoint: 5 },
//   { id: "INV-002", name: "Chicken Breast", category: "Meat", quantity: 3, unit: "kg", lastUpdated: "2025-03-25T09:00:00", expiryDate: "2025-04-02", daysLeft: 3, status: "ok", reorderPoint: 5 },
//   {
//         id: "INV-003",
//         name: "Chicken Breast",
//         category: "Meat",
//         quantity: 8.5,
//         unit: "kg",
//         lastUpdated: "2023-05-15T09:15:00",
//         expiryDate: "2023-05-22",
//         daysLeft: 5,
//         status: "ok",
//         reorderPoint: 4,
//       },
//       {
//         id: "INV-004",
//         name: "Salmon",
//         category: "Seafood",
//         quantity: 4.2,
//         unit: "kg",
//         lastUpdated: "2023-05-15T11:30:00",
//         expiryDate: "2023-05-19",
//         daysLeft: 2,
//         status: "expiring-soon",
//         reorderPoint: 3,
//       },
//       {
//         id: "INV-005",
//         name: "Rice",
//         category: "Grains",
//         quantity: 25.0,
//         unit: "kg",
//         lastUpdated: "2023-05-10T16:20:00",
//         expiryDate: "2023-12-31",
//         daysLeft: 230,
//         status: "ok",
//         reorderPoint: 10,
//       },
//       {
//         id: "INV-006",
//         name: "Fresh Herbs",
//         category: "Produce",
//         quantity: 0.8,
//         unit: "kg",
//         lastUpdated: "2023-05-15T08:45:00",
//         expiryDate: "2023-05-18",
//         daysLeft: 1,
//         status: "expiring-soon",
//         reorderPoint: 0.5,
//       },
//       {
//         id: "INV-007",
//         name: "Potatoes",
//         category: "Produce",
//         quantity: 15.0,
//         unit: "kg",
//         lastUpdated: "2023-05-12T13:10:00",
//         expiryDate: "2023-06-15",
//         daysLeft: 29,
//         status: "ok",
//         reorderPoint: 8,
//       },
//       {
//         id: "INV-008",
//         name: "Yogurt",
//         category: "Dairy",
//         quantity: 3.2,
//         unit: "kg",
//         lastUpdated: "2023-05-14T10:20:00",
//         expiryDate: "2023-05-19",
//         daysLeft: 2,
//         status: "expiring-soon",
//         reorderPoint: 2,
//       },
//       {
//         id: "INV-009",
//         name: "Bell Peppers",
//         category: "Produce",
//         quantity: 4.5,
//         unit: "kg",
//         lastUpdated: "2023-05-15T09:30:00",
//         expiryDate: "2023-05-20",
//         daysLeft: 3,
//         status: "expiring-soon",
//         reorderPoint: 2,
//       },
//       {
//         id: "INV-010",
//         name: "Flour",
//         category: "Baking",
//         quantity: 12.0,
//         unit: "kg",
//         lastUpdated: "2023-05-05T15:45:00",
//         expiryDate: "2023-11-30",
//         daysLeft: 199,
//         status: "ok",
//         reorderPoint: 5,
//       },
// ]

// export default function InventoryTable() {
//   const [page, setPage] = useState(1)
//   const [newItem, setNewItem] = useState({
//     id: "",
//     name: "",
//     category: "",
//     quantity: 0,
//     unit: "",
//     lastUpdated: "",
//     expiryDate: "",
//     daysLeft: 0,
//     status: "ok",
//     reorderPoint: 5,
//   })

//   const [items, setItems] = useState(inventoryItems)
//   const pageSize = 5
//   const totalPages = Math.ceil(items.length / pageSize)

//   const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize)

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }).format(date)
//   }

//   const handleAddItem = () => {
//     if (!newItem.name || !newItem.category || newItem.quantity <= 0 || !newItem.unit || !newItem.expiryDate) return

//     const itemWithId = { ...newItem, id: `INV-${(items.length + 1).toString().padStart(3, "0")}`, lastUpdated: new Date().toISOString(), daysLeft: calculateDaysLeft(newItem.expiryDate) }
//     setItems((prevItems) => [itemWithId, ...prevItems]) // Add new item to the top
//     setNewItem({
//       id: "",
//       name: "",
//       category: "",
//       quantity: 0,
//       unit: "",
//       lastUpdated: "",
//       expiryDate: "",
//       daysLeft: 0,
//       status: "ok",
//       reorderPoint: 5,
//     }) // Reset form after adding
//   }

//   const calculateDaysLeft = (expiryDate: string) => {
//     const now = new Date()
//     const expiry = new Date(expiryDate)
//     const timeDiff = expiry.getTime() - now.getTime()
//     return Math.floor(timeDiff / (1000 * 3600 * 24)) // Calculate days left
//   }

//   const getStatusBadge = (status: string, daysLeft: number) => {
//     if (status === "expiring-soon") {
//       return (
//         <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
//           <Clock className="h-3 w-3 mr-1" />
//           {daysLeft <= 1 ? "Expires Today" : `Expires in ${daysLeft} days`}
//         </Badge>
//       )
//     } else if (status === "low-stock") {
//       return (
//         <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//           <AlertTriangle className="h-3 w-3 mr-1" />
//           Low Stock
//         </Badge>
//       )
//     } else {
//       return (
//         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//           <Check className="h-3 w-3 mr-1" />
//           OK
//         </Badge>
//       )
//     }
//   }

//   const getCategoryBadge = (category: string) => {
//     switch (category) {
//       case "Produce":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{category}</Badge>
//       case "Meat":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">{category}</Badge>
//       case "Seafood":
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">{category}</Badge>
//       case "Dairy":
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{category}</Badge>
//       case "Grains":
//         return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">{category}</Badge>
//       case "Baking":
//         return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">{category}</Badge>
//       default:
//         return <Badge variant="outline">{category}</Badge>
//     }
//   }

//   return (
//     <div>
//       <div className="flex gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Item Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           className="input"
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={newItem.category}
//           onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//           className="input"
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={newItem.quantity}
//           onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
//           className="input"
//         />
//         <input
//           type="text"
//           placeholder="Unit"
//           value={newItem.unit}
//           onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
//           className="input"
//         />
//         <input
//           type="date"
//           value={newItem.expiryDate}
//           onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
//           className="input"
//         />
//         <Button onClick={handleAddItem}>Add Item</Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">ID</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead className="text-right">Quantity</TableHead>
//               <TableHead>Last Updated</TableHead>
//               <TableHead>Expiry Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedItems.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell className="font-medium">{item.id}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{getCategoryBadge(item.category)}</TableCell>
//                 <TableCell className="text-right">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div className="flex items-center justify-end gap-1">
//                           <span>
//                             {item.quantity} {item.unit}
//                           </span>
//                           {item.quantity <= item.reorderPoint && <AlertTriangle className="h-4 w-4 text-amber-500" />}
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Reorder point: {item.reorderPoint} {item.unit}</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </TableCell>
//                 <TableCell>{formatDate(item.lastUpdated)}</TableCell>
//                 <TableCell>{formatDate(item.expiryDate)}</TableCell>
//                 <TableCell>{getStatusBadge(item.status, item.daysLeft)}</TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex justify-end gap-2">
//                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                       <Edit className="h-4 w-4" />
//                       <span className="sr-only">Edit</span>
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                       <ExternalLink className="h-4 w-4" />
//                       <span className="sr-only">View details</span>
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <p className="text-sm text-muted-foreground">
//           Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, items.length)} of {items.length} items
//         </p>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous page</span>
//           </Button>
//           <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next page</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
// !3rd
// import { useState, useEffect, useMemo } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { AlertTriangle, ArrowUpDown, Check, ChevronLeft, ChevronRight, Clock, Edit, ExternalLink, Trash2 } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface InventoryItem {
//   id: string
//   name: string
//   category: string
//   quantity: number
//   unit: string
//   lastUpdated: string
//   expiryDate: string
//   daysLeft: number
//   status: "ok" | "expiring-soon" | "low-stock" | "expired"
//   reorderPoint: number
// }

// const defaultInventoryItems: InventoryItem[] = [
//   { id: "INV-001", name: "Tomatoes", category: "Produce", quantity: 10, unit: "kg", lastUpdated: "2025-03-29T12:30:00", expiryDate: "2025-03-31", daysLeft: 2, status: "expiring-soon", reorderPoint: 5 },
//   { id: "INV-002", name: "Chicken Breast", category: "Meat", quantity: 3, unit: "kg", lastUpdated: "2025-03-25T09:00:00", expiryDate: "2025-04-02", daysLeft: 3, status: "ok", reorderPoint: 5 },
//   { id: "INV-003", name: "Chicken Breast", category: "Meat", quantity: 8.5, unit: "kg", lastUpdated: "2023-05-15T09:15:00", expiryDate: "2023-05-22", daysLeft: 5, status: "ok", reorderPoint: 4 },
//   { id: "INV-004", name: "Salmon", category: "Seafood", quantity: 4.2, unit: "kg", lastUpdated: "2023-05-15T11:30:00", expiryDate: "2023-05-19", daysLeft: 2, status: "expiring-soon", reorderPoint: 3 },
//   { id: "INV-005", name: "Rice", category: "Grains", quantity: 25.0, unit: "kg", lastUpdated: "2023-05-10T16:20:00", expiryDate: "2023-12-31", daysLeft: 230, status: "ok", reorderPoint: 10 },
//   { id: "INV-006", name: "Fresh Herbs", category: "Produce", quantity: 0.8, unit: "kg", lastUpdated: "2023-05-15T08:45:00", expiryDate: "2023-05-18", daysLeft: 1, status: "expiring-soon", reorderPoint: 0.5 },
//   { id: "INV-007", name: "Potatoes", category: "Produce", quantity: 15.0, unit: "kg", lastUpdated: "2023-05-12T13:10:00", expiryDate: "2023-06-15", daysLeft: 29, status: "ok", reorderPoint: 8 },
//   { id: "INV-008", name: "Yogurt", category: "Dairy", quantity: 3.2, unit: "kg", lastUpdated: "2023-05-14T10:20:00", expiryDate: "2023-05-19", daysLeft: 2, status: "expiring-soon", reorderPoint: 2 },
//   { id: "INV-009", name: "Bell Peppers", category: "Produce", quantity: 4.5, unit: "kg", lastUpdated: "2023-05-15T09:30:00", expiryDate: "2023-05-20", daysLeft: 3, status: "expiring-soon", reorderPoint: 2 },
//   { id: "INV-010", name: "Flour", category: "Baking", quantity: 12.0, unit: "kg", lastUpdated: "2023-05-05T15:45:00", expiryDate: "2023-11-30", daysLeft: 199, status: "ok", reorderPoint: 5 },
// ]

// const categories = ["Produce", "Meat", "Seafood", "Dairy", "Grains", "Baking", "Other"]
// const units = ["kg", "g", "L", "ml", "pieces", "boxes", "bags"]

// const loadItems = (): InventoryItem[] => {
//   if (typeof window !== 'undefined') {
//     const saved = localStorage.getItem('inventoryItems')
//     return saved ? JSON.parse(saved) : defaultInventoryItems
//   }
//   return defaultInventoryItems
// }

// export default function InventoryTable() {
//   const [page, setPage] = useState(1)
//   const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'lastUpdated' | 'daysLeft' | 'status'>>({
//     name: "",
//     category: "",
//     quantity: 0,
//     unit: "kg",
//     expiryDate: "",
//     reorderPoint: 5,
//   })
//   const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' })

//   const [items, setItems] = useState<InventoryItem[]>(loadItems())
  
//   const pageSize = 5
//   const totalPages = Math.ceil(items.length / pageSize)

//   useEffect(() => {
//     localStorage.setItem('inventoryItems', JSON.stringify(items))
//   }, [items])

//   const sortedItems = useMemo(() => {
//     const sortableItems = [...items]
//     sortableItems.sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//     return sortableItems
//   }, [items, sortConfig])

//   const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize)

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }).format(date)
//   }

//   const requestSort = (key: keyof InventoryItem) => {
//     let direction: 'asc' | 'desc' = 'asc'
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc'
//     }
//     setSortConfig({ key, direction })
//   }

//   const calculateDaysLeft = (expiryDate: string) => {
//     const now = new Date()
//     const expiry = new Date(expiryDate)
//     const timeDiff = expiry.getTime() - now.getTime()
//     return Math.floor(timeDiff / (1000 * 3600 * 24))
//   }

//   const calculateStatus = (expiryDate: string, quantity: number, reorderPoint: number): InventoryItem['status'] => {
//     const daysLeft = calculateDaysLeft(expiryDate)
//     if (daysLeft <= 0) return "expired"
//     if (daysLeft <= 3) return "expiring-soon"
//     if (quantity <= reorderPoint) return "low-stock"
//     return "ok"
//   }

//   const validateItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'daysLeft' | 'status'>): boolean => {
//     return (
//       !!item.name && 
//       !!item.category && 
//       item.quantity > 0 && 
//       !!item.unit && 
//       !!item.expiryDate
//     )
//   }

//   const handleAddItem = () => {
//     if (!validateItem(newItem)) return

//     const itemWithId: InventoryItem = { 
//       ...newItem,
//       id: `INV-${(items.length + 1).toString().padStart(3, "0")}`, 
//       lastUpdated: new Date().toISOString(), 
//       daysLeft: calculateDaysLeft(newItem.expiryDate),
//       status: calculateStatus(newItem.expiryDate, newItem.quantity, newItem.reorderPoint)
//     }
    
//     setItems((prevItems) => [itemWithId, ...prevItems])
//     setNewItem({
//       name: "",
//       category: "",
//       quantity: 0,
//       unit: "kg",
//       expiryDate: "",
//       reorderPoint: 5,
//     })
//   }

//   const handleEditItem = () => {
//     if (!editingItem || !validateItem(editingItem)) return

//     const updatedItem: InventoryItem = {
//       ...editingItem,
//       lastUpdated: new Date().toISOString(),
//       daysLeft: calculateDaysLeft(editingItem.expiryDate),
//       status: calculateStatus(editingItem.expiryDate, editingItem.quantity, editingItem.reorderPoint)
//     }

//     setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
//     setIsDialogOpen(false)
//     setEditingItem(null)
//   }

//   const handleDeleteItem = (id: string) => {
//     setItems(items.filter(item => item.id !== id))
//     if (paginatedItems.length === 1 && page > 1) {
//       setPage(page - 1)
//     }
//   }

//   const getStatusBadge = (status: InventoryItem['status'], daysLeft: number) => {
//     switch (status) {
//       case "expired":
//         return (
//           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//             <AlertTriangle className="h-3 w-3 mr-1" />
//             Expired
//           </Badge>
//         )
//       case "expiring-soon":
//         return (
//           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
//             <Clock className="h-3 w-3 mr-1" />
//             {daysLeft <= 0 ? "Expired" : daysLeft <= 1 ? "Expires Today" : `Expires in ${daysLeft} days`}
//           </Badge>
//         )
//       case "low-stock":
//         return (
//           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//             <AlertTriangle className="h-3 w-3 mr-1" />
//             Low Stock
//           </Badge>
//         )
//       default:
//         return (
//           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//             <Check className="h-3 w-3 mr-1" />
//             OK
//           </Badge>
//         )
//     }
//   }

//   const getCategoryBadge = (category: string) => {
//     switch (category) {
//       case "Produce":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{category}</Badge>
//       case "Meat":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">{category}</Badge>
//       case "Seafood":
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">{category}</Badge>
//       case "Dairy":
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{category}</Badge>
//       case "Grains":
//         return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">{category}</Badge>
//       case "Baking":
//         return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">{category}</Badge>
//       default:
//         return <Badge variant="outline">{category}</Badge>
//     }
//   }

//   return (
//     <div className="p-4">
//       <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//         <Input
//           type="text"
//           placeholder="Item Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           className="w-48"
//         />
//         <Select
//           value={newItem.category}
//           onValueChange={(value) => setNewItem({ ...newItem, category: value })}
//         >
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((category) => (
//               <SelectItem key={category} value={category}>{category}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Input
//           type="number"
//           placeholder="Quantity"
//           value={newItem.quantity || ""}
//           onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
//           className="w-32"
//           min="0"
//           step="0.1"
//         />
//         <Select
//           value={newItem.unit}
//           onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
//         >
//           <SelectTrigger className="w-32">
//             <SelectValue placeholder="Unit" />
//           </SelectTrigger>
//           <SelectContent>
//             {units.map((unit) => (
//               <SelectItem key={unit} value={unit}>{unit}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Input
//           type="date"
//           value={newItem.expiryDate}
//           onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
//           className="w-40"
//         />
//         <Input
//           type="number"
//           placeholder="Reorder Point"
//           value={newItem.reorderPoint || ""}
//           onChange={(e) => setNewItem({ ...newItem, reorderPoint: Number(e.target.value) })}
//           className="w-40"
//           min="0"
//           step="0.1"
//         />
//         <Button onClick={handleAddItem} disabled={!validateItem(newItem)}>Add Item</Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">
//                 <button 
//                   onClick={() => requestSort('id')}
//                   className="flex items-center"
//                 >
//                   ID
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button 
//                   onClick={() => requestSort('name')}
//                   className="flex items-center"
//                 >
//                   Name
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button 
//                   onClick={() => requestSort('category')}
//                   className="flex items-center"
//                 >
//                   Category
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead className="text-right">
//                 <button 
//                   onClick={() => requestSort('quantity')}
//                   className="flex items-center justify-end w-full"
//                 >
//                   Quantity
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button 
//                   onClick={() => requestSort('lastUpdated')}
//                   className="flex items-center"
//                 >
//                   Last Updated
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button 
//                   onClick={() => requestSort('expiryDate')}
//                   className="flex items-center"
//                 >
//                   Expiry Date
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button 
//                   onClick={() => requestSort('status')}
//                   className="flex items-center"
//                 >
//                   Status
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                 </button>
//               </TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedItems.length > 0 ? (
//               paginatedItems.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell className="font-medium">{item.id}</TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{getCategoryBadge(item.category)}</TableCell>
//                   <TableCell className="text-right">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="flex items-center justify-end gap-1">
//                             <span>
//                               {item.quantity} {item.unit}
//                             </span>
//                             {item.quantity <= item.reorderPoint && <AlertTriangle className="h-4 w-4 text-amber-500" />}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Reorder point: {item.reorderPoint} {item.unit}</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </TableCell>
//                   <TableCell>{formatDate(item.lastUpdated)}</TableCell>
//                   <TableCell>{formatDate(item.expiryDate)}</TableCell>
//                   <TableCell>{getStatusBadge(item.status, item.daysLeft)}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <Dialog open={isDialogOpen && editingItem?.id === item.id} onOpenChange={setIsDialogOpen}>
//                         <DialogTrigger asChild>
//                           <Button 
//                             variant="ghost" 
//                             size="icon" 
//                             className="h-8 w-8"
//                             onClick={() => {
//                               setEditingItem(item)
//                               setIsDialogOpen(true)
//                             }}
//                           >
//                             <Edit className="h-4 w-4" />
//                             <span className="sr-only">Edit</span>
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <DialogHeader>
//                             <DialogTitle>Edit Inventory Item</DialogTitle>
//                           </DialogHeader>
//                           <div className="grid gap-4 py-4">
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="name" className="text-right">
//                                 Name
//                               </label>
//                               <Input
//                                 id="name"
//                                 value={editingItem?.name || ""}
//                                 onChange={(e) => setEditingItem({...editingItem!, name: e.target.value})}
//                                 className="col-span-3"
//                               />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="category" className="text-right">
//                                 Category
//                               </label>
//                               <Select
//                                 value={editingItem?.category || ""}
//                                 onValueChange={(value) => setEditingItem({...editingItem!, category: value})}
//                               >
//                                 <SelectTrigger className="col-span-3">
//                                   <SelectValue placeholder="Category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {categories.map((category) => (
//                                     <SelectItem key={category} value={category}>{category}</SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="quantity" className="text-right">
//                                 Quantity
//                               </label>
//                               <Input
//                                 id="quantity"
//                                 type="number"
//                                 value={editingItem?.quantity || ""}
//                                 onChange={(e) => setEditingItem({...editingItem!, quantity: Number(e.target.value)})}
//                                 className="col-span-3"
//                                 min="0"
//                                 step="0.1"
//                               />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="unit" className="text-right">
//                                 Unit
//                               </label>
//                               <Select
//                                 value={editingItem?.unit || ""}
//                                 onValueChange={(value) => setEditingItem({...editingItem!, unit: value})}
//                               >
//                                 <SelectTrigger className="col-span-3">
//                                   <SelectValue placeholder="Unit" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {units.map((unit) => (
//                                     <SelectItem key={unit} value={unit}>{unit}</SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="expiryDate" className="text-right">
//                                 Expiry Date
//                               </label>
//                               <Input
//                                 id="expiryDate"
//                                 type="date"
//                                 value={editingItem?.expiryDate || ""}
//                                 onChange={(e) => setEditingItem({...editingItem!, expiryDate: e.target.value})}
//                                 className="col-span-3"
//                               />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                               <label htmlFor="reorderPoint" className="text-right">
//                                 Reorder Point
//                               </label>
//                               <Input
//                                 id="reorderPoint"
//                                 type="number"
//                                 value={editingItem?.reorderPoint || ""}
//                                 onChange={(e) => setEditingItem({...editingItem!, reorderPoint: Number(e.target.value)})}
//                                 className="col-span-3"
//                                 min="0"
//                                 step="0.1"
//                               />
//                             </div>
//                           </div>
//                           <div className="flex justify-end gap-2">
//                             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                               Cancel
//                             </Button>
//                             <Button 
//                               onClick={handleEditItem}
//                               disabled={!editingItem || !validateItem(editingItem)}
//                             >
//                               Save Changes
//                             </Button>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <ExternalLink className="h-4 w-4" />
//                         <span className="sr-only">View details</span>
//                       </Button>
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         className="h-8 w-8 hover:text-red-600"
//                         onClick={() => handleDeleteItem(item.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span className="sr-only">Delete</span>
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} className="h-24 text-center">
//                   No items found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <p className="text-sm text-muted-foreground">
//           Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, items.length)} of {items.length} items
//         </p>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous page</span>
//           </Button>
//           <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages || items.length === 0}>
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next page</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// ! 4th
"use client";


// ... rest of your imports
import { useState, useEffect, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpDown, Check, ChevronLeft, ChevronRight, Clock, Edit, ExternalLink, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  addedDate: string
  lastUpdated: string
  expiryDate: string
  daysLeft: number
  status: "ok" | "expiring-soon" | "low-stock" | "expired"
  reorderPoint: number
}

const defaultInventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "Tomatoes", category: "Produce", quantity: 10, unit: "kg", addedDate: "2025-03-25T00:00:00", lastUpdated: "2025-03-29T12:30:00", expiryDate: "2025-03-31", daysLeft: 2, status: "expiring-soon", reorderPoint: 5 },
  { id: "INV-002", name: "Chicken Breast", category: "Meat", quantity: 3, unit: "kg", addedDate: "2025-03-20T00:00:00", lastUpdated: "2025-03-25T09:00:00", expiryDate: "2025-04-02", daysLeft: 3, status: "ok", reorderPoint: 5 },
  { id: "INV-003", name: "Chicken Breast", category: "Meat", quantity: 8.5, unit: "kg", addedDate: "2023-05-10T00:00:00", lastUpdated: "2023-05-15T09:15:00", expiryDate: "2023-05-22", daysLeft: 5, status: "ok", reorderPoint: 4 },
  // ... rest of your items
];

const categories = ["Produce", "Meat", "Seafood", "Dairy", "Grains", "Baking", "Other"]
const units = ["kg", "g", "L", "ml", "pieces", "boxes", "bags"]

const loadItems = (): InventoryItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('inventoryItems')
    return saved ? JSON.parse(saved) : defaultInventoryItems
  }
  return defaultInventoryItems
}

export default function InventoryTable() {
  const [page, setPage] = useState(1)
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'lastUpdated' | 'daysLeft' | 'status'>>({
    name: "",
    category: "",
    quantity: 0,
    unit: "kg",
    addedDate: "",
    expiryDate: "",
    reorderPoint: 5,
  })
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' })

  const [items, setItems] = useState<InventoryItem[]>(loadItems())
  
  const pageSize = 5
  const totalPages = Math.ceil(items.length / pageSize)

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items))
  }, [items])

  const sortedItems = useMemo(() => {
    const sortableItems = [...items]
    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
    return sortableItems
  }, [items, sortConfig])

  const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize)

  const formatDate = (dateString: string) => {
    try {
      // Handle cases where dateString might be in different formats
      let date: Date;
      
      // If it's already in ISO format (with or without time)
      if (dateString.includes('T')) {
        date = new Date(dateString);
      } 
      // If it's just a date string (YYYY-MM-DD)
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        date = new Date(dateString + 'T00:00:00'); // Add time component
      }
      // Fallback for other formats
      else {
        date = new Date(dateString);
      }
  
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
  
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "Invalid date";
    }
  } 

  const requestSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const calculateDaysLeft = (expiryDate: string) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const timeDiff = expiry.getTime() - now.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) // Using Math.ceil to count partial days as full days
  }

  const calculateStatus = (expiryDate: string, quantity: number, reorderPoint: number): InventoryItem['status'] => {
    const daysLeft = calculateDaysLeft(expiryDate)
    if (daysLeft <= 0) return "expired"
    if (daysLeft <= 3) return "expiring-soon"
    if (quantity <= reorderPoint) return "low-stock"
    return "ok"
  }

  const validateItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'daysLeft' | 'status'>): boolean => {
    return (
      !!item.name && 
      !!item.category && 
      item.quantity > 0 && 
      !!item.unit && 
      !!item.addedDate &&
      !!item.expiryDate
    )
  }

  const handleAddItem = () => {
    if (!validateItem(newItem)) return

    const itemWithId: InventoryItem = { 
      ...newItem,
      id: `INV-${(items.length + 1).toString().padStart(3, "0")}`, 
      addedDate: newItem.addedDate || new Date().toISOString(),
      lastUpdated: new Date().toISOString(), 
      daysLeft: calculateDaysLeft(newItem.expiryDate),
      status: calculateStatus(newItem.expiryDate, newItem.quantity, newItem.reorderPoint)
    }
    
    setItems((prevItems) => [itemWithId, ...prevItems])
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "kg",
      addedDate: "",
      expiryDate: "",
      reorderPoint: 5,
    })
  }

  const handleEditItem = () => {
    if (!editingItem || !validateItem(editingItem)) return

    const updatedItem: InventoryItem = {
      ...editingItem,
      lastUpdated: new Date().toISOString(),
      daysLeft: calculateDaysLeft(editingItem.expiryDate),
      status: calculateStatus(editingItem.expiryDate, editingItem.quantity, editingItem.reorderPoint)
    }

    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    if (paginatedItems.length === 1 && page > 1) {
      setPage(page - 1)
    }
  }

  const getStatusBadge = (status: InventoryItem['status'], daysLeft: number) => {
    switch (status) {
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        )
      case "expiring-soon":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            {daysLeft <= 0 ? "Expired" : daysLeft === 1 ? "Expires Tomorrow" : `Expires in ${daysLeft} days`}
          </Badge>
        )
      case "low-stock":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            OK
          </Badge>
        )
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Produce":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{category}</Badge>
      case "Meat":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">{category}</Badge>
      case "Seafood":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">{category}</Badge>
      case "Dairy":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">{category}</Badge>
      case "Grains":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">{category}</Badge>
      case "Baking":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">{category}</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <Input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-48"
        />
        <Select
          value={newItem.category}
          onValueChange={(value) => setNewItem({ ...newItem, category: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity || ""}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          className="w-32"
          min="0"
          step="0.1"
        />
        <Select
          value={newItem.unit}
          onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          placeholder="Added Date"
          value={newItem.addedDate}
          onChange={(e) => setNewItem({ ...newItem, addedDate: e.target.value })}
          className="w-40"
        />
        <Input
          type="date"
          placeholder="Expiry Date"
          value={newItem.expiryDate}
          onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
          className="w-40"
        />
        <Input
          type="number"
          placeholder="Reorder Point"
          value={newItem.reorderPoint || ""}
          onChange={(e) => setNewItem({ ...newItem, reorderPoint: Number(e.target.value) })}
          className="w-40"
          min="0"
          step="0.1"
        />
        <Button onClick={handleAddItem} disabled={!validateItem(newItem)}>Add Item</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <button 
                  onClick={() => requestSort('id')}
                  className="flex items-center"
                >
                  ID
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('name')}
                  className="flex items-center"
                >
                  Name
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('category')}
                  className="flex items-center"
                >
                  Category
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button 
                  onClick={() => requestSort('quantity')}
                  className="flex items-center justify-end w-full"
                >
                  Quantity
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('addedDate')}
                  className="flex items-center"
                >
                  Added Date
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('lastUpdated')}
                  className="flex items-center"
                >
                  Last Updated
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('expiryDate')}
                  className="flex items-center"
                >
                  Expiry Date
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  onClick={() => requestSort('status')}
                  className="flex items-center"
                >
                  Status
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{getCategoryBadge(item.category)}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-end gap-1">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            {item.quantity <= item.reorderPoint && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reorder point: {item.reorderPoint} {item.unit}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{formatDate(item.addedDate)}</TableCell>
                  <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                  <TableCell>{formatDate(item.expiryDate)}</TableCell>
                  <TableCell>{getStatusBadge(item.status, item.daysLeft)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isDialogOpen && editingItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingItem(item)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Inventory Item</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                Name
                              </label>
                              <Input
                                id="name"
                                value={editingItem?.name || ""}
                                onChange={(e) => setEditingItem({...editingItem!, name: e.target.value})}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="category" className="text-right">
                                Category
                              </label>
                              <Select
                                value={editingItem?.category || ""}
                                onValueChange={(value) => setEditingItem({...editingItem!, category: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="quantity" className="text-right">
                                Quantity
                              </label>
                              <Input
                                id="quantity"
                                type="number"
                                value={editingItem?.quantity || ""}
                                onChange={(e) => setEditingItem({...editingItem!, quantity: Number(e.target.value)})}
                                className="col-span-3"
                                min="0"
                                step="0.1"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="unit" className="text-right">
                                Unit
                              </label>
                              <Select
                                value={editingItem?.unit || ""}
                                onValueChange={(value) => setEditingItem({...editingItem!, unit: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  {units.map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="addedDate" className="text-right">
                                Added Date
                              </label>
                              <Input
                                id="addedDate"
                                type="date"
                                value={editingItem?.addedDate || ""}
                                onChange={(e) => setEditingItem({...editingItem!, addedDate: e.target.value})}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="expiryDate" className="text-right">
                                Expiry Date
                              </label>
                              <Input
                                id="expiryDate"
                                type="date"
                                value={editingItem?.expiryDate || ""}
                                onChange={(e) => setEditingItem({...editingItem!, expiryDate: e.target.value})}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="reorderPoint" className="text-right">
                                Reorder Point
                              </label>
                              <Input
                                id="reorderPoint"
                                type="number"
                                value={editingItem?.reorderPoint || ""}
                                onChange={(e) => setEditingItem({...editingItem!, reorderPoint: Number(e.target.value)})}
                                className="col-span-3"
                                min="0"
                                step="0.1"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleEditItem}
                              disabled={!editingItem || !validateItem(editingItem)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:text-red-600"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, items.length)} of {items.length} items
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages || items.length === 0}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}



// !5th database