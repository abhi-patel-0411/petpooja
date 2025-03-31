// // components/inventory-tabs.tsx
// "use client";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import InventoryTable from "./inventory-table";

// export function InventoryTabs() {
//   return (
//     <Tabs defaultValue="inventory" className="w-full">
//       <TabsList>
//         <TabsTrigger value="inventory">Inventory</TabsTrigger>
//         <TabsTrigger value="orders">Orders</TabsTrigger>
//         <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
//       </TabsList>
//       <TabsContent value="inventory">
//         <InventoryTable />
//       </TabsContent>
//       <TabsContent value="orders">
//         <div className="p-4">Orders content will go here</div>
//       </TabsContent>
//       <TabsContent value="suppliers">
//         <div className="p-4">Suppliers content will go here</div>
//       </TabsContent>
//     </Tabs>
//   );
// }