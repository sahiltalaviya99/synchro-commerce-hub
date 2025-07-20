import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Platforms from "./pages/Platforms";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import PlatformConfig from "./pages/admin/PlatformConfig";
import AutomationLogs from "./pages/admin/AutomationLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected user routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/platforms" element={<Layout><Platforms /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          {/* Protected admin routes */}
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/users" element={<Layout><ManageUsers /></Layout>} />
          <Route path="/admin/products" element={<Layout><ManageProducts /></Layout>} />
          <Route path="/admin/platforms" element={<Layout><PlatformConfig /></Layout>} />
          <Route path="/admin/logs" element={<Layout><AutomationLogs /></Layout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
