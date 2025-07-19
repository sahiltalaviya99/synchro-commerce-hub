import { useState } from "react";
import { Search, Filter, Edit, Trash2, RefreshCw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import PlatformBadge from "@/components/PlatformBadge";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data - in real app this would come from API
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 299.99,
      platforms: ["shopify", "amazon"],
      status: "success",
      lastSync: "2 hours ago",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      category: "Electronics",
      price: 499.99,
      platforms: ["shopify", "amazon", "flipkart"],
      status: "syncing",
      lastSync: "Syncing...",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Eco-Friendly Water Bottle",
      category: "Home & Garden",
      price: 24.99,
      platforms: ["myntra"],
      status: "failed",
      lastSync: "Failed 1 hour ago",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      category: "Fashion",
      price: 39.99,
      platforms: ["myntra", "flipkart"],
      status: "pending",
      lastSync: "Pending",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 129.99,
      platforms: ["shopify", "amazon", "myntra", "flipkart"],
      status: "success",
      lastSync: "1 day ago",
      image: "/placeholder.svg"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || product.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSyncNow = (productId: number, productName: string) => {
    toast({
      title: "Sync Initiated",
      description: `Started syncing "${productName}" to all connected platforms.`
    });
  };

  const handleEdit = (productId: number) => {
    toast({
      title: "Edit Product",
      description: "Edit functionality would open here."
    });
  };

  const handleDelete = (productId: number, productName: string) => {
    toast({
      title: "Product Deleted",
      description: `"${productName}" has been removed from all platforms.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "success";
      case "syncing": return "syncing";
      case "failed": return "failed";
      case "pending": return "pending";
      default: return "pending";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-xl">Products</h1>
        <p className="text-muted-foreground mt-2">
          Manage all your products and their sync status across platforms.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="metric-card">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-border rounded-lg px-3 py-2 text-sm bg-background"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="syncing">Syncing</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="metric-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Platforms</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Last Sync</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover bg-muted"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">{product.category}</td>
                  <td className="py-4 px-4 text-sm font-medium">${product.price}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {product.platforms.map((platform) => (
                        <PlatformBadge key={platform} platform={platform as any}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </PlatformBadge>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={getStatusColor(product.status) as any}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{product.lastSync}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSyncNow(product.id, product.name)}
                        className="h-8 w-8 p-0"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;