import { Package, ShoppingCart, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import PlatformBadge from "@/components/PlatformBadge";

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const metrics = {
    totalProducts: 127,
    platformsConnected: 4,
    pendingSyncs: 8,
    successfulSyncs: 119
  };

  const recentActivities = [
    {
      id: 1,
      product: "Premium Wireless Headphones",
      action: "Synced to Shopify",
      status: "success" as const,
      platform: "shopify" as const,
      time: "2 minutes ago"
    },
    {
      id: 2,
      product: "Smart Watch Series X",
      action: "Syncing to Amazon",
      status: "syncing" as const,
      platform: "amazon" as const,
      time: "5 minutes ago"
    },
    {
      id: 3,
      product: "Eco-Friendly Water Bottle",
      action: "Failed to sync to Myntra",
      status: "failed" as const,
      platform: "myntra" as const,
      time: "10 minutes ago"
    },
    {
      id: 4,
      product: "Organic Cotton T-Shirt",
      action: "Pending sync to Flipkart",
      status: "pending" as const,
      platform: "flipkart" as const,
      time: "15 minutes ago"
    },
    {
      id: 5,
      product: "Bluetooth Speaker",
      action: "Synced to Amazon",
      status: "success" as const,
      platform: "amazon" as const,
      time: "30 minutes ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="heading-xl">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your product syncing today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Products"
          value={metrics.totalProducts}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Platforms Connected"
          value={metrics.platformsConnected}
          subtitle="Shopify, Amazon, Myntra, Flipkart"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Pending Syncs"
          value={metrics.pendingSyncs}
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Successful Syncs"
          value={metrics.successfulSyncs}
          subtitle="This month"
          icon={TrendingUp}
          trend={{ value: 18, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="gradient-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-primary-foreground/80 text-sm">
              Get started with your product management
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Add Product
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Connect Platform
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-md">Recent Sync Activities</h3>
          <button className="text-primary hover:text-primary-hover text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-success" />}
                  {activity.status === 'syncing' && <Clock className="h-5 w-5 text-info animate-spin" />}
                  {activity.status === 'failed' && <AlertCircle className="h-5 w-5 text-destructive" />}
                  {activity.status === 'pending' && <Clock className="h-5 w-5 text-warning" />}
                </div>
                <div>
                  <p className="font-medium">{activity.product}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <PlatformBadge platform={activity.platform}>
                  {activity.platform.charAt(0).toUpperCase() + activity.platform.slice(1)}
                </PlatformBadge>
                <StatusBadge status={activity.status}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </StatusBadge>
                <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;