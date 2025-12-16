import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  FileText, 
  Upload,
  Recycle,
  Package,
  CheckCircle,
  Users,
  Edit
} from 'lucide-react';
import { mockManufacturers, mockWasteUploads, mockRecyclingRequests } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/shared/StatCard';

const CompanyProfilePage: React.FC = () => {
  const { hasPermission } = useAuth();
  const manufacturer = mockManufacturers[0]; // Mock current manufacturer
  
  // Calculate stats
  const totalUploads = mockWasteUploads.filter(w => w.manufacturerId === manufacturer.id).length;
  const totalRequests = mockRecyclingRequests.filter(r => r.manufacturerId === manufacturer.id).length;
  const completedRecyclings = mockRecyclingRequests.filter(
    r => r.manufacturerId === manufacturer.id && r.status === 'completed'
  ).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/manufacturer/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Company Profile</h1>
              <p className="text-muted-foreground mt-1">
                View and manage your company information
              </p>
            </div>
            {hasPermission('edit-company') && (
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Info
              </Button>
            )}
          </div>
        </div>

        {/* Company Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="font-medium text-lg">{manufacturer.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {manufacturer.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{manufacturer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{new Date(manufacturer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Document */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Verification Document
            </CardTitle>
            <CardDescription>
              Your uploaded business verification document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-medium">GST Certificate</p>
                  <p className="text-sm text-muted-foreground">gst-cert.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={manufacturer.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                  {manufacturer.verificationStatus === 'verified' ? 'Verified' : 
                   manufacturer.verificationStatus === 'pending' ? 'Pending' : 'Uploaded'}
                </Badge>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
            {hasPermission('edit-company') && (
              <Button variant="outline" className="mt-4 gap-2">
                <Upload className="h-4 w-4" />
                Upload New Document
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Company Statistics</CardTitle>
            <CardDescription>
              Overview of your recycling activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Uploads"
                value={totalUploads}
                icon={<Package className="h-5 w-5" />}
              />
              <StatCard
                title="Total Requests"
                value={totalRequests}
                icon={<Recycle className="h-5 w-5" />}
              />
              <StatCard
                title="Completed Recyclings"
                value={completedRecyclings}
                icon={<CheckCircle className="h-5 w-5" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Manager Actions */}
        {hasPermission('manage-users') && (
          <Card>
            <CardHeader>
              <CardTitle>Manager Actions</CardTitle>
              <CardDescription>
                Administrative actions available to managers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" asChild className="w-full justify-start gap-2">
                <Link to="/manufacturer/users">
                  <Users className="h-4 w-4" />
                  Manage Company Users
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Edit className="h-4 w-4" />
                Edit Company Information
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CompanyProfilePage;
