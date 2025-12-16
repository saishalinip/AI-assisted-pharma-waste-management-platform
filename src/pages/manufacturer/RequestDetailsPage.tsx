import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Package, 
  Scale, 
  Calendar, 
  Phone,
  Mail,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { mockRecyclingRequests, getRecyclerById } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/shared/StatusBadge';
import MaterialBadge from '@/components/shared/MaterialBadge';

const ManufacturerRequestDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const request = mockRecyclingRequests.find(r => r.id === id) || mockRecyclingRequests[0];
  const recycler = getRecyclerById(request.recyclerId);
  
  const [isRequesting, setIsRequesting] = useState(false);
  const [contactRequested, setContactRequested] = useState(request?.contactRequested || false);
  const [contactApproved, setContactApproved] = useState(request?.contactApproved || false);

  const handleRequestContact = async () => {
    setIsRequesting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setContactRequested(true);
    setIsRequesting(false);
    toast({
      title: "Contact Requested",
      description: "Your request for contact details has been sent to the recycler.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/manufacturer/requests">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Requests
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Request Details</h1>
              <p className="text-muted-foreground mt-1">Request ID: {request.id}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Material Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Material Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Material Type:</span>
                  <MaterialBadge material={request.materialType} />
                </div>
                <div className="flex items-center gap-3">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span>Quantity: <strong>{request.quantity} {request.unit}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Location: {request.location}</span>
                </div>
                
                {/* Waste Image */}
                {request.imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Waste Image</p>
                    <div className="border rounded-lg overflow-hidden bg-muted/30">
                      <img 
                        src={request.imageUrl} 
                        alt="Waste material" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recycler Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Recycler Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organization</span>
                  <span className="font-medium">{request.recyclerName}</span>
                </div>
                {recycler && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{recycler.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Details (if approved) */}
            {contactApproved && (
              <Card className="border-primary/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                  <CardDescription>
                    Recycler has approved sharing their contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>recycler@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+91 98765 43210</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Request Contact Button */}
            {request.status === 'accepted' && !contactRequested && !contactApproved && (
              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Need to contact the recycler?</p>
                      <p className="text-sm text-muted-foreground">
                        Request contact details to coordinate the recycling process
                      </p>
                    </div>
                    <Button onClick={handleRequestContact} disabled={isRequesting} className="gap-2">
                      <Phone className="h-4 w-4" />
                      {isRequesting ? 'Requesting...' : 'Request Contact Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Requested Status */}
            {request.status === 'accepted' && contactRequested && !contactApproved && (
              <Card className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-200">Contact Request Pending</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Waiting for recycler to approve sharing contact details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Proof Documents (for completed requests) */}
            {request.status === 'completed' && request.proofDocuments && request.proofDocuments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Proof Documents
                  </CardTitle>
                  <CardDescription>
                    Documents uploaded by the recycler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {request.proofDocuments.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">Document {index + 1}</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Request Created</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {request.acceptedAt && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Request Accepted</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(request.acceptedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {request.completedAt && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Recycling Completed</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(request.completedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManufacturerRequestDetailsPage;
