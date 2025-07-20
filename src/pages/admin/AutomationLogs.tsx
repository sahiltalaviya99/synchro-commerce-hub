import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  RefreshCw,
  Calendar,
  Zap,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AutomationLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "2024-03-18 11:30:15",
      type: "sync",
      action: "Product Sync",
      platform: "Amazon",
      user: "John Doe",
      status: "success",
      duration: "2.3s",
      details: "Synchronized 45 products successfully",
      itemsProcessed: 45,
      errors: 0
    },
    {
      id: 2,
      timestamp: "2024-03-18 11:25:42",
      type: "inventory",
      action: "Inventory Update",
      platform: "eBay",
      user: "Jane Smith", 
      status: "warning",
      duration: "1.8s",
      details: "Updated inventory for 23 items, 2 items out of stock",
      itemsProcessed: 23,
      errors: 0
    },
    {
      id: 3,
      timestamp: "2024-03-18 11:20:08",
      type: "pricing",
      action: "Price Update",
      platform: "Shopify",
      user: "Mike Johnson",
      status: "error",
      duration: "5.1s",
      details: "Failed to update prices due to API rate limit",
      itemsProcessed: 0,
      errors: 15
    },
    {
      id: 4,
      timestamp: "2024-03-18 11:15:33",
      type: "order",
      action: "Order Processing",
      platform: "Etsy",
      user: "Sarah Wilson",
      status: "success",
      duration: "0.9s",
      details: "Processed 12 new orders",
      itemsProcessed: 12,
      errors: 0
    },
    {
      id: 5,
      timestamp: "2024-03-18 11:10:22",
      type: "sync",
      action: "Product Sync",
      platform: "Amazon",
      user: "John Doe",
      status: "running",
      duration: "ongoing",
      details: "Synchronizing products in progress...",
      itemsProcessed: 32,
      errors: 0
    }
  ]);

  const { toast } = useToast();

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      case "running":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3" />;
      case "error":
        return <XCircle className="h-3 w-3" />;
      case "running":
        return <Clock className="h-3 w-3 animate-spin" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sync":
        return <RefreshCw className="h-4 w-4" />;
      case "inventory":
        return <Package className="h-4 w-4" />;
      case "pricing":
        return <DollarSign className="h-4 w-4" />;
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === "success").length,
    errors: logs.filter(l => l.status === "error").length,
    running: logs.filter(l => l.status === "running").length
  };

  const exportLogs = () => {
    toast({
      title: "Exporting logs",
      description: "Log export will be available for download shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Automation Logs</h1>
          <p className="text-muted-foreground">
            Monitor and review all automated processes and their execution status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processes</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.success}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.success / stats.total) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.errors}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.running}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Logs</CardTitle>
          <CardDescription>
            Detailed logs of all automated processes and their execution details
          </CardDescription>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sync">Sync</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="pricing">Pricing</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Process</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-muted-foreground">{log.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.platform}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(log.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(log.status)}
                        {log.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.duration}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{log.itemsProcessed} processed</div>
                      {log.errors > 0 && (
                        <div className="text-red-500">{log.errors} errors</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Log Details</DialogTitle>
                          <DialogDescription>
                            Detailed information about this automation process
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Process ID</Label>
                              <p className="text-sm text-muted-foreground">{log.id}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Timestamp</Label>
                              <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Platform</Label>
                              <p className="text-sm text-muted-foreground">{log.platform}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">User</Label>
                              <p className="text-sm text-muted-foreground">{log.user}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Details</Label>
                            <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Duration</Label>
                              <p className="text-sm text-muted-foreground">{log.duration}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Items Processed</Label>
                              <p className="text-sm text-muted-foreground">{log.itemsProcessed}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Errors</Label>
                              <p className="text-sm text-muted-foreground">{log.errors}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Import missing components
import { Label } from "@/components/ui/label";
import { Package, DollarSign, ShoppingCart } from "lucide-react";

export default AutomationLogs;