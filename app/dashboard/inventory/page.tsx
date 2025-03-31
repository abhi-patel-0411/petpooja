// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Camera, Download, Filter, Plus, RefreshCw, Search, Upload } from "lucide-react"
// import InventoryTable from "@/components/inventory-table"
// import InventoryVisualizer from "@/components/inventory-visualizer"

// export default function InventoryPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="gap-1">
//             <Upload className="h-4 w-4" />
//             <span>Import</span>
//           </Button>
//           <Button variant="outline" size="sm" className="gap-1">
//             <Download className="h-4 w-4" />
//             <span>Export</span>
//           </Button>
//           <Button size="sm" className="gap-1">
//             <Plus className="h-4 w-4" />
//             <span>Add Item</span>
//           </Button>
//         </div>
//       </div>

//       <Card className="bg-yellow-50 border-yellow-200">
//         <CardContent className="p-4 flex items-center gap-4">
//           <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
//             <Camera className="h-5 w-5 text-yellow-700" />
//           </div>
//           <div>
//             <h3 className="font-medium text-yellow-800">Computer Vision Scan Available</h3>
//             <p className="text-sm text-yellow-700">Use our AI-powered scanner to automatically update your inventory</p>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             className="ml-auto gap-1 bg-white border-yellow-300 text-yellow-800 hover:bg-yellow-100"
//           >
//             <Camera className="h-4 w-4" />
//             <span>Scan Now</span>
//           </Button>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="list" className="space-y-6">
//         <div className="flex justify-between items-center">
//           <TabsList>
//             <TabsTrigger value="list">List View</TabsTrigger>
//             <TabsTrigger value="visual">Visual View</TabsTrigger>
//           </TabsList>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" className="gap-1">
//               <RefreshCw className="h-4 w-4" />
//               <span>Last updated: 10 mins ago</span>
//             </Button>
//           </div>
//         </div>

//         <TabsContent value="list">
//           <Card>
//             <CardHeader>
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <CardTitle>Inventory Items</CardTitle>
//                   <CardDescription>Manage your restaurant's ingredients and supplies</CardDescription>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <div className="relative">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input placeholder="Search inventory..." className="pl-8 w-[250px]" />
//                   </div>
//                   <Button variant="outline" size="icon">
//                     <Filter className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <InventoryTable />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="visual">
//           <Card>
//             <CardHeader>
//               <CardTitle>Visual Inventory</CardTitle>
//               <CardDescription>AI-powered visual representation of your inventory</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <InventoryVisualizer />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
    
//   )

// }
// !2nd
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpDown,
  Calendar,
  Download,
  Edit,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample inventory data
const initialInventory = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 25,
    unit: "kg",
    price: 3.99,
    value: 99.75,
    expiryDate: "2025-04-02",
    status: "critical",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: 15,
    unit: "kg",
    price: 8.99,
    value: 134.85,
    expiryDate: "2025-04-05",
    status: "warning",
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    quantity: 20,
    unit: "L",
    price: 2.49,
    value: 49.8,
    expiryDate: "2025-04-03",
    status: "warning",
  },
  {
    id: 4,
    name: "Rice",
    category: "Grains",
    quantity: 50,
    unit: "kg",
    price: 1.99,
    value: 99.5,
    expiryDate: "2025-07-15",
    status: "normal",
  },
  {
    id: 5,
    name: "Salmon",
    category: "Seafood",
    quantity: 10,
    unit: "kg",
    price: 15.99,
    value: 159.9,
    expiryDate: "2025-04-02",
    status: "critical",
  },
  {
    id: 6,
    name: "Lettuce",
    category: "Vegetables",
    quantity: 15,
    unit: "kg",
    price: 2.49,
    value: 37.35,
    expiryDate: "2025-04-01",
    status: "critical",
  },
  {
    id: 7,
    name: "Cheese",
    category: "Dairy",
    quantity: 8,
    unit: "kg",
    price: 9.99,
    value: 79.92,
    expiryDate: "2025-04-10",
    status: "normal",
  },
  {
    id: 8,
    name: "Potatoes",
    category: "Vegetables",
    quantity: 30,
    unit: "kg",
    price: 1.49,
    value: 44.7,
    expiryDate: "2025-04-20",
    status: "normal",
  },
  {
    id: 9,
    name: "Beef",
    category: "Meat",
    quantity: 12,
    unit: "kg",
    price: 12.99,
    value: 155.88,
    expiryDate: "2025-04-07",
    status: "normal",
  },
  {
    id: 10,
    name: "Eggs",
    category: "Dairy",
    quantity: 100,
    unit: "pcs",
    price: 0.25,
    value: 25.0,
    expiryDate: "2025-04-15",
    status: "normal",
  },
]

// Categories for filtering
const categories = ["All", "Vegetables", "Fruits", "Meat", "Seafood", "Dairy", "Grains", "Spices", "Other"]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    expiryDate: "",
  })
  const [editItem, setEditItem] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  // Filter inventory based on search term and category
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort inventory based on column and direction
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1
    }
  })

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Handle add new item
  const handleAddItem = () => {
    const price = Number.parseFloat(newItem.price)
    const quantity = Number.parseFloat(newItem.quantity)

    const newInventoryItem = {
      id: inventory.length + 1,
      name: newItem.name,
      category: newItem.category,
      quantity: quantity,
      unit: newItem.unit,
      price: price,
      value: price * quantity,
      expiryDate: newItem.expiryDate,
      status: getStatus(newItem.expiryDate),
    }

    setInventory([...inventory, newInventoryItem])
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      price: "",
      expiryDate: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Item added",
      description: `${newItem.name} has been added to inventory.`,
    })
  }

  // Handle edit item
  const handleEditItem = () => {
    const price = Number.parseFloat(editItem.price)
    const quantity = Number.parseFloat(editItem.quantity)

    const updatedInventory = inventory.map((item) => {
      if (item.id === editItem.id) {
        return {
          ...editItem,
          value: price * quantity,
          status: getStatus(editItem.expiryDate),
        }
      }
      return item
    })

    setInventory(updatedInventory)
    setIsEditDialogOpen(false)

    toast({
      title: "Item updated",
      description: `${editItem.name} has been updated.`,
    })
  }

  // Handle delete item
  const handleDeleteItem = (id) => {
    const itemToDelete = inventory.find((item) => item.id === id)
    const updatedInventory = inventory.filter((item) => item.id !== id)
    setInventory(updatedInventory)

    toast({
      title: "Item deleted",
      description: `${itemToDelete.name} has been removed from inventory.`,
    })
  }

  // Get status based on expiry date
  const getStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 1) {
      return "critical"
    } else if (diffDays <= 3) {
      return "warning"
    } else {
      return "normal"
    }
  }

  return (
    <div className="space-y-6" data-aos="fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your kitchen inventory and track expiry dates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>Enter the details of the new item to add to your inventory.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Select value={newItem.unit} onValueChange={(value) => setNewItem({ ...newItem, unit: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="pcs">pcs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiryDate" className="text-right">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddItem}>
                  Add Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage and track your kitchen inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Name
                      {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                    <div className="flex items-center">
                      Category
                      {sortColumn === "category" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("quantity")}>
                    <div className="flex items-center justify-end">
                      Quantity
                      {sortColumn === "quantity" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center justify-end">
                      Price
                      {sortColumn === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("value")}>
                    <div className="flex items-center justify-end">
                      Value
                      {sortColumn === "value" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("expiryDate")}>
                    <div className="flex items-center justify-end">
                      Expiry Date
                      {sortColumn === "expiryDate" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No items found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${item.value.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{item.expiryDate}</span>
                          {item.status === "critical" && (
                            <Badge variant="destructive" className="ml-2">
                              Expiring
                            </Badge>
                          )}
                          {item.status === "warning" && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500"
                            >
                              Soon
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog
                          open={isEditDialogOpen && editItem?.id === item.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (!open) setEditItem(null)
                          }}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => setEditItem(item)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Inventory Item</DialogTitle>
                              <DialogDescription>Make changes to the inventory item.</DialogDescription>
                            </DialogHeader>
                            {editItem && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    id="edit-name"
                                    value={editItem.name}
                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-category" className="text-right">
                                    Category
                                  </Label>
                                  <Select
                                    value={editItem.category}
                                    onValueChange={(value) => setEditItem({ ...editItem, category: value })}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories
                                        .filter((cat) => cat !== "All")
                                        .map((category) => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-quantity" className="text-right">
                                    Quantity
                                  </Label>
                                  <Input
                                    id="edit-quantity"
                                    type="number"
                                    value={editItem.quantity}
                                    onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-unit" className="text-right">
                                    Unit
                                  </Label>
                                  <Select
                                    value={editItem.unit}
                                    onValueChange={(value) => setEditItem({ ...editItem, unit: value })}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="kg">kg</SelectItem>
                                      <SelectItem value="g">g</SelectItem>
                                      <SelectItem value="L">L</SelectItem>
                                      <SelectItem value="ml">ml</SelectItem>
                                      <SelectItem value="pcs">pcs</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-price" className="text-right">
                                    Price ($)
                                  </Label>
                                  <Input
                                    id="edit-price"
                                    type="number"
                                    step="0.01"
                                    value={editItem.price}
                                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-expiryDate" className="text-right">
                                    Expiry Date
                                  </Label>
                                  <Input
                                    id="edit-expiryDate"
                                    type="date"
                                    value={editItem.expiryDate}
                                    onChange={(e) => setEditItem({ ...editItem, expiryDate: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button type="submit" onClick={handleEditItem}>
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {sortedInventory.length} of {inventory.length} items
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>Normal</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Camera,
//   Download,
//   Filter,
//   Plus,
//   RefreshCw,
//   Search,
//   Upload,
// } from "lucide-react";
// import InventoryTable from "@/components/inventory-table";
// import InventoryVisualizer from "@/components/inventory-visualizer";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// export default function InventoryPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [itemName, setItemName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [category, setCategory] = useState("");
//   const [inventoryItems, setInventoryItems] = useState([]);

//   const handleAddItem = () => {
//     if (!itemName || !quantity || !category) return;
//     const newItem = { id: Date.now(), itemName, quantity, category };
//     setInventoryItems([...inventoryItems, newItem]);
//     setItemName("");
//     setQuantity("");
//     setCategory("");
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="gap-1">
//             <Upload className="h-4 w-4" />
//             <span>Import</span>
//           </Button>
//           <Button variant="outline" size="sm" className="gap-1">
//             <Download className="h-4 w-4" />
//             <span>Export</span>
//           </Button>
//           <Button size="sm" className="gap-1" onClick={() => setIsDialogOpen(true)}>
//             <Plus className="h-4 w-4" />
//             <span>Add Item</span>
//           </Button>
//         </div>
//       </div>

//       <Card className="bg-yellow-50 border-yellow-200">
//         <CardContent className="p-4 flex items-center gap-4">
//           <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
//             <Camera className="h-5 w-5 text-yellow-700" />
//           </div>
//           <div>
//             <h3 className="font-medium text-yellow-800">Computer Vision Scan Available</h3>
//             <p className="text-sm text-yellow-700">
//               Use our AI-powered scanner to automatically update your inventory
//             </p>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             className="ml-auto gap-1 bg-white border-yellow-300 text-yellow-800 hover:bg-yellow-100"
//           >
//             <Camera className="h-4 w-4" />
//             <span>Scan Now</span>
//           </Button>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="list" className="space-y-6">
//         <div className="flex justify-between items-center">
//           <TabsList>
//             <TabsTrigger value="list">List View</TabsTrigger>
//             <TabsTrigger value="visual">Visual View</TabsTrigger>
//           </TabsList>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" className="gap-1">
//               <RefreshCw className="h-4 w-4" />
//               <span>Last updated: 10 mins ago</span>
//             </Button>
//           </div>
//         </div>

//         <TabsContent value="list">
//           <Card>
//             <CardHeader>
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <CardTitle>Inventory Items</CardTitle>
//                   <CardDescription>Manage your restaurant's ingredients and supplies</CardDescription>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <div className="relative">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input placeholder="Search inventory..." className="pl-8 w-[250px]" />
//                   </div>
//                   <Button variant="outline" size="icon">
//                     <Filter className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <InventoryTable items={inventoryItems} />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="visual">
//           <Card>
//             <CardHeader>
//               <CardTitle>Visual Inventory</CardTitle>
//               <CardDescription>AI-powered visual representation of your inventory</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <InventoryVisualizer />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Item</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
//             <Input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
//             <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//             <Button className="w-full" onClick={handleAddItem}>
//               Add Item
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }