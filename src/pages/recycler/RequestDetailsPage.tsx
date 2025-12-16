import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Package, 
  Scale, 
  Calendar, 
  Check, 
  X,
  Phone,
  CheckCircle,
  ShieldCheck,
  Cpu,
  Image as ImageIcon,
  FileCheck,
} from 'lucide-react';
import { mockRecyclingRequests, mockManufacturers } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/shared/StatusBadge';
import MaterialBadge from '@/components/shared/MaterialBadge';

const RecyclerRequestDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const request = mockRecyclingRequests.find(r => r.id === id) || mockRecyclingRequests[0];
  const manufacturer = mockManufacturers.find(m => m.id === request?.manufacturerId);
  
  const [requestStatus, setRequestStatus] = useState(request?.status || 'pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [contactApproved, setContactApproved] = useState(request?.contactApproved || false);

  // Mock AI classification data
  const aiClassification = {
    primaryMaterial: request?.materialType || 'PVC',
    confidence: 87,
    detectedMaterials: [
      { type: request?.materialType || 'PVC', confidence: 87, isPrimary: true },
      { type: 'Aluminum', confidence: 12, isPrimary: false },
    ],
  };

  const handleAccept = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setRequestStatus('accepted');
    setIsProcessing(false);
    toast({
      title: "Request Accepted",
      description: "You have accepted this recycling request.",
    });
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setRequestStatus('rejected');
    setIsProcessing(false);
    toast({
      title: "Request Rejected",
      description: "You have rejected this recycling request.",
    });
  };

  const handleApproveContact = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setContactApproved(true);
    setIsProcessing(false);
    toast({
      title: "Contact Approved",
      description: "Manufacturer can now view your contact details.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4 hover:bg-muted">
            <Link to="/recycler/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Request Details</h1>
              <p className="text-muted-foreground mt-1">Request ID: {request?.id}</p>
            </div>
            <StatusBadge status={requestStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Summary Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                  Manufacturer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Company Name</span>
                  <span className="font-medium text-foreground">{manufacturer?.companyName || request?.manufacturerName}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Location</span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {request?.location}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Request Date</span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(request?.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Waste Details Section */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-primary" />
                  Waste Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Material Type</p>
                    <MaterialBadge material={request?.materialType || 'PVC'} />
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      {request?.quantity} {request?.unit}
                    </p>
                  </div>
                </div>
                
                {/* Waste Images */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    Waste Images
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 shadow-inner">
                      <img 
                        src={request?.imageUrl || '/placeholder.svg'} 
                        alt="Waste material" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 shadow-inner">
                      <img 
                        src="/placeholder.svg" 
                        alt="Waste material 2" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Classification Info */}
            <Card className="shadow-sm hover:shadow-md transition-shadow border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Cpu className="h-5 w-5 text-primary" />
                  AI Classification Results
                </CardTitle>
                <CardDescription>
                  Material identification based on image analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Primary Classification */}
                <div className="bg-card rounded-lg p-4 border border-border shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Primary Material</span>
                    <MaterialBadge material={aiClassification.primaryMaterial} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Confidence Level</span>
                      <span className="font-medium text-primary">{aiClassification.confidence}%</span>
                    </div>
                    <Progress value={aiClassification.confidence} className="h-2" />
                  </div>
                </div>

                {/* Detected Materials */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Detected Material Types</p>
                  <div className="space-y-2">
                    {aiClassification.detectedMaterials.map((mat, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          mat.isPrimary 
                            ? 'border-primary/30 bg-primary/5' 
                            : 'border-border bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MaterialBadge material={mat.type} size="sm" />
                          {mat.isPrimary && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              Primary
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {mat.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  Material identification is based on image analysis and may require further validation.
                </p>
              </CardContent>
            </Card>

            {/* Contact Sharing */}
            {requestStatus === 'accepted' && request?.contactRequested && !contactApproved && (
              <Card className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <Phone className="h-5 w-5" />
                    Contact Request Pending
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-300">
                    Manufacturer has requested your contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                    By approving, the manufacturer will be able to see your email and phone number.
                  </p>
                  <Button onClick={handleApproveContact} disabled={isProcessing} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approve Contact Sharing
                  </Button>
                </CardContent>
              </Card>
            )}

            {contactApproved && (
              <Card className="border-primary/30 bg-primary/5 shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Contact details shared with manufacturer</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Request Created</p>
                    <p className="text-muted-foreground">{new Date(request?.createdAt || '').toLocaleDateString()}</p>
                  </div>
                </div>
                {requestStatus === 'accepted' && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Accepted</p>
                      <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                {requestStatus === 'rejected' && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Rejected</p>
                      <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            {requestStatus === 'pending' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleAccept} 
                    disabled={isProcessing} 
                    className="w-full gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Accept Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReject} 
                    disabled={isProcessing}
                    className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                    Reject Request
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Status Card for accepted/rejected */}
            {requestStatus !== 'pending' && (
              <Card className={`shadow-sm ${
                requestStatus === 'accepted' 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-destructive/30 bg-destructive/5'
              }`}>
                <CardContent className="py-6">
                  <div className="text-center">
                    {requestStatus === 'accepted' ? (
                      <>
                        <CheckCircle className="h-10 w-10 mx-auto text-primary mb-2" />
                        <p className="font-semibold text-foreground">Request Accepted</p>
                        <p className="text-sm text-muted-foreground mt-1">Awaiting processing</p>
                      </>
                    ) : (
                      <>
                        <X className="h-10 w-10 mx-auto text-destructive mb-2" />
                        <p className="font-semibold text-foreground">Request Rejected</p>
                        <p className="text-sm text-muted-foreground mt-1">No further action required</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecyclerRequestDetailsPage;
