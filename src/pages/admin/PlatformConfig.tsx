import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Globe,
  Key,
  Shield,
  Zap
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const PlatformConfig = () => {
  const [platforms, setPlatforms] = useState([
    {
      id: 1,
      name: "Amazon",
      type: "marketplace",
      status: "active",
      apiKey: "AMZN-****-****-1234",
      webhookUrl: "https://api.amazon.com/webhook",
      syncEnabled: true,
      lastSync: "2024-03-18 10:30",
      users: 156,
      rateLimitPerHour: 1000,
      commissionRate: 15
    },
    {
      id: 2,
      name: "eBay",
      type: "marketplace",
      status: "active",
      apiKey: "EBAY-****-****-5678",
      webhookUrl: "https://api.ebay.com/webhook",
      syncEnabled: true,
      lastSync: "2024-03-18 09:45",
      users: 89,
      rateLimitPerHour: 5000,
      commissionRate: 12
    },
    {
      id: 3,
      name: "Shopify",
      type: "ecommerce",
      status: "maintenance",
      apiKey: "SHOP-****-****-9012",
      webhookUrl: "https://api.shopify.com/webhook",
      syncEnabled: false,
      lastSync: "2024-03-17 15:20",
      users: 203,
      rateLimitPerHour: 2000,
      commissionRate: 0
    },
    {
      id: 4,
      name: "Etsy",
      type: "marketplace",
      status: "active",
      apiKey: "ETSY-****-****-3456",
      webhookUrl: "https://api.etsy.com/webhook",
      syncEnabled: true,
      lastSync: "2024-03-18 11:15",
      users: 67,
      rateLimitPerHour: 1500,
      commissionRate: 20
    }
  ]);

  const [newPlatform, setNewPlatform] = useState({
    name: "",
    type: "",
    apiKey: "",
    webhookUrl: "",
    rateLimitPerHour: 1000,
    commissionRate: 0
  });

  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "maintenance":
        return "secondary";
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "maintenance":
        return <AlertCircle className="h-3 w-3" />;
      case "inactive":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleToggleSync = (platformId: number) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? { ...platform, syncEnabled: !platform.syncEnabled }
        : platform
    ));
    toast({
      title: "Sync settings updated",
      description: "Platform sync configuration has been changed.",
    });
  };

  const handleStatusChange = (platformId: number, newStatus: string) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? { ...platform, status: newStatus }
        : platform
    ));
    toast({
      title: "Platform status updated",
      description: `Platform status changed to ${newStatus}.`,
    });
  };

  const handleDeletePlatform = (platformId: number) => {
    setPlatforms(platforms.filter(platform => platform.id !== platformId));
    toast({
      title: "Platform removed",
      description: "Platform configuration has been deleted.",
    });
  };

  const addNewPlatform = () => {
    if (!newPlatform.name || !newPlatform.type || !newPlatform.apiKey) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const platform = {
      id: Date.now(),
      ...newPlatform,
      status: "inactive",
      webhookUrl: newPlatform.webhookUrl || `https://api.${newPlatform.name.toLowerCase()}.com/webhook`,
      syncEnabled: false,
      lastSync: "Never",
      users: 0
    };

    setPlatforms([...platforms, platform]);
    setNewPlatform({
      name: "",
      type: "",
      apiKey: "",
      webhookUrl: "",
      rateLimitPerHour: 1000,
      commissionRate: 0
    });

    toast({
      title: "Platform added",
      description: "New platform configuration has been created.",
    });
  };

  const stats = {
    total: platforms.length,
    active: platforms.filter(p => p.status === "active").length,
    totalUsers: platforms.reduce((sum, p) => sum + p.users, 0),
    totalRequests: platforms.reduce((sum, p) => sum + p.rateLimitPerHour, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Platform Configuration</h1>
          <p className="text-muted-foreground">
            Manage integrations and API configurations for e-commerce platforms
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Platform</DialogTitle>
              <DialogDescription>
                Configure a new e-commerce platform integration.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Platform name"
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({...newPlatform, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={newPlatform.type} onValueChange={(value) => setNewPlatform({...newPlatform, type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="social">Social Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  placeholder="API Key"
                  value={newPlatform.apiKey}
                  onChange={(e) => setNewPlatform({...newPlatform, apiKey: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rateLimit" className="text-right">
                  Rate Limit
                </Label>
                <Input
                  id="rateLimit"
                  type="number"
                  placeholder="1000"
                  value={newPlatform.rateLimitPerHour}
                  onChange={(e) => setNewPlatform({...newPlatform, rateLimitPerHour: parseInt(e.target.value) || 1000})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewPlatform}>Add Platform</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platforms</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Configured integrations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Users</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests/Hour</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total rate limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Configuration */}
      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="global">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>
                Manage API keys, webhooks, and sync settings for each platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Rate Limit</TableHead>
                    <TableHead>Sync</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platforms.map((platform) => (
                    <TableRow key={platform.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{platform.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {platform.type} • {platform.apiKey}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(platform.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(platform.status)}
                            {platform.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{platform.users}</TableCell>
                      <TableCell>{platform.rateLimitPerHour}/hr</TableCell>
                      <TableCell>
                        <Switch
                          checked={platform.syncEnabled}
                          onCheckedChange={() => handleToggleSync(platform.id)}
                        />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {platform.lastSync}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Configuration
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Regenerate API Key
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(platform.id, platform.status === "active" ? "inactive" : "active")}>
                              {platform.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeletePlatform(platform.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Platform
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Global API Settings</CardTitle>
                <CardDescription>
                  Configure global settings that apply to all platform integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Timeout (seconds)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Retry Attempts</Label>
                    <Input type="number" defaultValue="3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Webhook Secret</Label>
                  <Input type="password" defaultValue="webhook-secret-key" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-retry" />
                  <Label htmlFor="auto-retry">Enable automatic retry on failures</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="logging" defaultChecked />
                  <Label htmlFor="logging">Enable detailed API logging</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sync Configuration</CardTitle>
                <CardDescription>
                  Configure how often and when data synchronization occurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sync Interval (minutes)</Label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Batch Size</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-sync" defaultChecked />
                  <Label htmlFor="auto-sync">Enable automatic synchronization</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sync-images" defaultChecked />
                  <Label htmlFor="sync-images">Synchronize product images</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformConfig;