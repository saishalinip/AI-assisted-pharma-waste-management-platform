import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react';
import { mockRecyclers, MaterialPricing } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const PricingConfigPage: React.FC = () => {
  const { toast } = useToast();
  const recycler = mockRecyclers[0]; // Mock current recycler
  
  const [pricing, setPricing] = useState<MaterialPricing[]>(
    recycler.materialsProcessed.map(material => {
      const existing = recycler.materialPricing.find(p => p.material === material);
      return existing || { material, minPrice: 0, maxPrice: 0 };
    })
  );
  const [isSaving, setIsSaving] = useState(false);

  const handlePriceChange = (material: string, field: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = parseFloat(value) || 0;
    setPricing(prev => prev.map(p => 
      p.material === material ? { ...p, [field]: numValue } : p
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Pricing Saved",
      description: "Your material pricing has been updated successfully.",
    });
  };

  const isComplete = pricing.every(p => p.minPrice > 0 && p.maxPrice > 0 && p.maxPrice >= p.minPrice);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/recycler/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Pricing Configuration</h1>
              <p className="text-muted-foreground mt-1">
                Set your pricing for each material type you process
              </p>
            </div>
            <Badge variant={isComplete ? "default" : "secondary"} className="gap-1">
              {isComplete ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  Pricing Configured
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  Pricing Pending
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> You must configure pricing for all materials before manufacturers can send recycling requests. 
              Prices are in ₹ per kg.
            </p>
          </CardContent>
        </Card>

        {/* Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle>Material Pricing</CardTitle>
            <CardDescription>
              Set minimum and maximum price per kg for each material
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pricing.map((item) => (
                <div key={item.material} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-base py-1 px-3">
                      {item.material}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${item.material}-min`}>Min Price (₹/kg)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${item.material}-min`}
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.minPrice || ''}
                        onChange={(e) => handlePriceChange(item.material, 'minPrice', e.target.value)}
                        className="pl-9"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${item.material}-max`}>Max Price (₹/kg)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${item.material}-max`}
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.maxPrice || ''}
                        onChange={(e) => handlePriceChange(item.material, 'maxPrice', e.target.value)}
                        className="pl-9"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Pricing'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PricingConfigPage;
