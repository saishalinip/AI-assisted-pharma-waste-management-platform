import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import MaterialBadge from '@/components/shared/MaterialBadge';
import { mockWasteUploads, mockRecyclingRequests, mockManufacturers } from '@/lib/mockData';
import {
  Upload,
  Recycle,
  Clock,
  CheckCircle,
  ArrowRight,
  Package,
  FileText,
  MapPin,
  Calendar,
} from 'lucide-react';

const ManufacturerDashboard: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const manufacturer = mockManufacturers[0];

  const stats = [
    {
      title: 'Total Uploads',
      value: mockWasteUploads.length,
      subtitle: 'Waste materials uploaded',
      icon: <Upload className="h-5 w-5" />,
    },
    {
      title: 'Pending Requests',
      value: mockRecyclingRequests.filter(r => r.status === 'pending').length,
      subtitle: 'Awaiting recycler response',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: 'Completed',
      value: mockRecyclingRequests.filter(r => r.status === 'completed').length,
      subtitle: 'Successfully recycled',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Active Recyclers',
      value: 4,
      subtitle: 'Available in your area',
      icon: <Recycle className="h-5 w-5" />,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome, {user?.manufacturerUser?.name || 'User'}
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Manage your pharmaceutical waste and recycling requests
            </p>
          </div>
          
          {hasPermission('upload-waste') && (
            <Button asChild size="lg" className="shadow-md">
              <Link to="/manufacturer/upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Waste
              </Link>
            </Button>
          )}
        </div>

        {/* Company Card */}
        <div className="bg-card rounded-xl border border-border/70 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl gradient-primary shadow-sm">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-foreground">{manufacturer.companyName}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {manufacturer.location}
                  </span>
                  <StatusBadge status={manufacturer.verificationStatus} size="sm" />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild className="shadow-sm">
                <Link to="/manufacturer/profile" className="gap-2">
                  <FileText className="h-4 w-4" />
                  View Profile
                </Link>
              </Button>
              {hasPermission('manage-users') && (
                <Button variant="outline" size="sm" asChild className="shadow-sm">
                  <Link to="/manufacturer/users">Manage Users</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border/70 p-6 shadow-card">
            <h3 className="font-bold text-xl mb-5 text-foreground">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-5 justify-start shadow-sm hover:shadow-md transition-all" asChild>
                <Link to="/manufacturer/upload" className="flex-col items-start gap-1.5">
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Upload Waste</span>
                  <span className="text-xs text-muted-foreground">AI-powered identification</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-5 justify-start shadow-sm hover:shadow-md transition-all" asChild>
                <Link to="/manufacturer/recyclers" className="flex-col items-start gap-1.5">
                  <Recycle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Find Recyclers</span>
                  <span className="text-xs text-muted-foreground">Browse verified recyclers</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-5 justify-start shadow-sm hover:shadow-md transition-all" asChild>
                <Link to="/manufacturer/requests" className="flex-col items-start gap-1.5">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold">View Requests</span>
                  <span className="text-xs text-muted-foreground">Track recycling requests</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-5 justify-start shadow-sm hover:shadow-md transition-all" asChild>
                <Link to="/manufacturer/records" className="flex-col items-start gap-1.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Records</span>
                  <span className="text-xs text-muted-foreground">Past recycling records</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-card rounded-xl border border-border/70 p-6 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-xl text-foreground">Recent Uploads</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/manufacturer/records" className="gap-1">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockWasteUploads.slice(0, 3).map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 hover:bg-secondary/60 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-sm">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      {upload.identifiedMaterials.slice(0, 2).map((mat, i) => (
                        <MaterialBadge key={i} material={mat.type} size="sm" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{upload.quantity} {upload.unit}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {upload.createdAt}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={upload.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManufacturerDashboard;
