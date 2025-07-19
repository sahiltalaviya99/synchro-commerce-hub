import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Settings } from "lucide-react";

const Platforms = () => {
  const [platforms, setPlatforms] = useState({
    shopify: { connected: true, autoSync: true },
    amazon: { connected: true, autoSync: false },
    myntra: { connected: false, autoSync: false },
    flipkart: { connected: true, autoSync: true }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-xl">Platform Connections</h1>
        <p className="text-muted-foreground mt-2">Connect and manage your e-commerce platforms.</p>
      </div>

      <div className="grid gap-6">
        {Object.entries(platforms).map(([key, platform]) => (
          <div key={key} className="metric-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold capitalize">{key}</h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Auto-sync</span>
                  <Switch checked={platform.autoSync} />
                </div>
                <Button variant={platform.connected ? "outline" : "default"}>
                  {platform.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platforms;