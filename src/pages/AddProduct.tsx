import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const AddProduct = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    platforms: {
      shopify: false,
      amazon: false,
      myntra: false,
      flipkart: false
    }
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platforms = [
    { id: 'shopify', name: 'Shopify', description: 'Your online store' },
    { id: 'amazon', name: 'Amazon', description: 'World\'s largest marketplace' },
    { id: 'myntra', name: 'Myntra', description: 'Fashion & lifestyle' },
    { id: 'flipkart', name: 'Flipkart', description: 'India\'s leading e-commerce' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platformId]: checked
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPlatforms = Object.entries(formData.platforms)
      .filter(([_, selected]) => selected)
      .map(([platform, _]) => platform);

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Select Platforms",
        description: "Please select at least one platform to sync your product.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Product Added Successfully!",
        description: `Your product will be synced to ${selectedPlatforms.length} platform(s).`
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        tags: "",
        platforms: {
          shopify: false,
          amazon: false,
          myntra: false,
          flipkart: false
        }
      });
      setImages([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-xl">Add New Product</h1>
        <p className="text-muted-foreground mt-2">
          Upload your product once and sync it across multiple platforms automatically.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Information */}
        <div className="metric-card">
          <h3 className="heading-md mb-6">Product Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Fashion, Home"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., wireless, bluetooth, premium"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="metric-card">
          <h3 className="heading-md mb-6">Product Images</h3>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Upload product images</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
              </div>
              <Label htmlFor="images" className="cursor-pointer">
                <Button type="button" variant="outline" className="mt-4">
                  Choose Files
                </Button>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Platform Selection */}
        <div className="metric-card">
          <h3 className="heading-md mb-6">Select Platforms</h3>
          <p className="text-muted-foreground mb-6">Choose which platforms to sync your product to.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  id={platform.id}
                  checked={formData.platforms[platform.id as keyof typeof formData.platforms]}
                  onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor={platform.id} className="font-medium cursor-pointer">
                    {platform.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Product..." : "Add Product & Sync"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;