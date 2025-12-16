import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Star, 
  IndianRupee,
  Check,
  X,
} from 'lucide-react';
import { mockRecyclers } from '@/lib/mockData';

const CompareRecyclersPage: React.FC = () => {
  const location = useLocation();
  const recyclerIds = location.state?.recyclerIds || [];
  
  const recyclers = recyclerIds
    .map((id: string) => mockRecyclers.find(r => r.id === id))
    .filter(Boolean);

  if (recyclers.length < 2) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Select Recyclers to Compare</h1>
          <p className="text-muted-foreground mb-6">Please select at least 2 recyclers from the list.</p>
          <Button asChild>
            <Link to="/manufacturer/recyclers">Back to Recyclers</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get all unique materials across selected recyclers
  const allMaterials = Array.from(
    new Set(recyclers.flatMap((r: any) => r.materialsProcessed))
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/manufacturer/recyclers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recyclers
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Compare Recyclers</h1>
          <p className="text-muted-foreground mt-1">
            Side-by-side comparison of {recyclers.length} recyclers
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}>
              <div className="p-4 font-semibold text-muted-foreground">Attribute</div>
              {recyclers.map((recycler: any) => (
                <Card key={recycler.id} className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{recycler.organizationName}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {recycler.location}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Data Rows */}
            <div className="mt-4 space-y-2">
              {/* Distance */}
              <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}>
                <div className="p-3 text-sm text-muted-foreground font-medium">Distance</div>
                {recyclers.map((recycler: any) => (
                  <div key={recycler.id} className="p-3 bg-card rounded-lg border border-border text-center">
                    <span className="font-medium">{recycler.distance} km</span>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}>
                <div className="p-3 text-sm text-muted-foreground font-medium">Rating</div>
                {recyclers.map((recycler: any) => (
                  <div key={recycler.id} className="p-3 bg-card rounded-lg border border-border text-center">
                    {recycler.rating ? (
                      <span className="font-medium flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        {recycler.rating}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Pricing Configured */}
              <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}>
                <div className="p-3 text-sm text-muted-foreground font-medium">Pricing Configured</div>
                {recyclers.map((recycler: any) => (
                  <div key={recycler.id} className="p-3 bg-card rounded-lg border border-border text-center">
                    {recycler.pricingConfigured ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </div>
                ))}
              </div>

              {/* Materials Section */}
              <div className="pt-4">
                <div className="p-3 text-sm font-semibold text-foreground border-b border-border mb-2">
                  Materials & Pricing
                </div>
                {allMaterials.map((material: any) => (
                  <div 
                    key={material} 
                    className="grid gap-4 items-center" 
                    style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}
                  >
                    <div className="p-3 text-sm text-muted-foreground">{material}</div>
                    {recyclers.map((recycler: any) => {
                      const pricing = recycler.materialPricing.find((p: any) => p.material === material);
                      const handles = recycler.materialsProcessed.includes(material);
                      
                      return (
                        <div key={recycler.id} className="p-3 bg-card rounded-lg border border-border text-center">
                          {pricing ? (
                            <span className="flex items-center justify-center gap-1 text-primary font-medium">
                              <IndianRupee className="h-3.5 w-3.5" />
                              {pricing.minPrice}-{pricing.maxPrice}/kg
                            </span>
                          ) : handles ? (
                            <span className="text-muted-foreground text-sm">Handles (no price)</span>
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-4 mt-6" style={{ gridTemplateColumns: `200px repeat(${recyclers.length}, 1fr)` }}>
              <div></div>
              {recyclers.map((recycler: any) => (
                <Button key={recycler.id} asChild className="w-full">
                  <Link to={`/manufacturer/recycler/${recycler.id}`}>
                    View Details
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompareRecyclersPage;
