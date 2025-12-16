import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Star, 
  IndianRupee,
  Send,
  AlertCircle,
  Package,
} from 'lucide-react';
import { getRecyclerById } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const RecyclerDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const recycler = getRecyclerById(id || '');
  
  const [isSending, setIsSending] = useState(false);

  if (!recycler) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Recycler Not Found</h1>
          <Button asChild>
            <Link to="/manufacturer/recyclers">Back to Recyclers</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleSendRequest = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    toast({
      title: "Request Sent",
      description: `Recycling request sent to ${recycler.organizationName}.`,
    });
    navigate('/manufacturer/requests');
  };

  const canSendRequest = recycler.pricingConfigured && recycler.materialPricing.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/manufacturer/recyclers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recyclers
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{recycler.organizationName}</h1>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {recycler.location}
                </p>
              </div>
            </div>
            {recycler.rating && (
              <div className="flex items-center gap-1 text-lg">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold">{recycler.rating}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Materials & Pricing */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Materials & Pricing
                </CardTitle>
                <CardDescription>
                  Materials processed and pricing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!canSendRequest && (
                  <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm">This recycler has not configured pricing yet. You cannot send a request until they do.</p>
                  </div>
                )}
                
                <div className="space-y-3">
                  {recycler.materialPricing.length > 0 ? (
                    recycler.materialPricing.map((pricing, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <span className="font-medium">{pricing.material}</span>
                        <span className="flex items-center gap-1 text-primary font-semibold">
                          <IndianRupee className="h-4 w-4" />
                          {pricing.minPrice} - {pricing.maxPrice}/kg
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No pricing information available</p>
                    </div>
                  )}
                </div>
                
                {/* Materials processed without pricing */}
                {recycler.materialsProcessed.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-3">All Materials Processed</p>
                    <div className="flex flex-wrap gap-2">
                      {recycler.materialsProcessed.map((mat) => (
                        <span 
                          key={mat} 
                          className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recycler Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-medium">{recycler.distance} km</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="text-muted-foreground text-sm">On file</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            <Card className={`shadow-sm ${canSendRequest ? 'border-primary/30' : 'border-border'}`}>
              <CardHeader>
                <CardTitle>Send Request</CardTitle>
                <CardDescription>
                  Send a recycling request to this recycler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleSendRequest} 
                  disabled={!canSendRequest || isSending}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                  {isSending ? 'Sending...' : 'Send Recycling Request'}
                </Button>
                {!canSendRequest && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Request disabled: Pricing not configured
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Materials</span>
                  <span className="font-medium">{recycler.materialsProcessed.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Priced Materials</span>
                  <span className="font-medium">{recycler.materialPricing.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecyclerDetailPage;
