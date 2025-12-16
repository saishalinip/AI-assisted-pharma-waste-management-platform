import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import MaterialBadge from '@/components/shared/MaterialBadge';
import { mockRecyclingRequests, mockRecyclers, mockManufacturers, RecyclingRequest } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  FileText,
  Calendar,
  Eye,
  Check,
  X,
  AlertCircle,
  Settings,
} from 'lucide-react';

const RecyclerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const recycler = user?.recycler || mockRecyclers[0];
  
  const [requests, setRequests] = useState<RecyclingRequest[]>(mockRecyclingRequests);

  const incomingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');
  const completedRequests = requests.filter(r => r.status === 'completed');

  const hasPricingConfigured = recycler?.materialPricing && recycler.materialPricing.length > 0;

  const handleAccept = (requestId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'accepted' as const, acceptedAt: new Date().toISOString() } : r
    ));
    toast({
      title: "Request Accepted",
      description: "You have accepted this recycling request.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));
    toast({
      title: "Request Rejected",
      description: "You have rejected this recycling request.",
    });
  };

  const stats = [
    {
      title: 'Pending Requests',
      value: incomingRequests.length,
      subtitle: 'Awaiting your response',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: 'Accepted',
      value: acceptedRequests.length,
      subtitle: 'Ready for processing',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Completed',
      value: completedRequests.length,
      subtitle: 'Successfully recycled',
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Total Processed',
      value: '2.5 tons',
      subtitle: 'This month',
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome, {recycler?.organizationName || 'Recycler'}
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Manage incoming recycling requests
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild className="shadow-sm">
              <Link to="/recycler/pricing" className="gap-2">
                <Settings className="h-4 w-4" />
                Pricing
              </Link>
            </Button>
            <Button variant="outline" asChild className="shadow-sm">
              <Link to="/recycler/profile" className="gap-2">
                <FileText className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Pricing Warning Banner */}
        {!hasPricingConfigured && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-amber-800 dark:text-amber-200">Pricing Configuration Required</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Configure your pricing to receive recycling requests from manufacturers.
              </p>
            </div>
            <Button size="sm" asChild className="shrink-0">
              <Link to="/recycler/pricing">Configure Now</Link>
            </Button>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border/70 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 shadow-sm">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-xl text-foreground">{recycler?.organizationName}</h2>
                  <StatusBadge status={recycler?.verificationStatus || 'pending'} size="sm" />
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {recycler?.location}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recycler?.materialsProcessed.map((mat) => (
                <span
                  key={mat}
                  className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary font-medium shadow-sm"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Incoming Requests */}
        <div className="bg-card rounded-xl border border-border/70 shadow-card">
          <div className="p-6 border-b border-border/70">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-foreground">Incoming Requests</h3>
                <p className="text-sm text-muted-foreground mt-1">Review and respond to recycling requests</p>
              </div>
              <Button variant="outline" size="sm" asChild className="shadow-sm">
                <Link to="/recycler/records">View Records</Link>
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border/60">
            {requests.map((request) => {
              const manufacturer = mockManufacturers.find(m => m.id === request.manufacturerId);
              
              return (
                <div key={request.id} className="p-6 hover:bg-secondary/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Request Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shrink-0 shadow-sm">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <MaterialBadge 
                            material={request.materialType}
                            size="sm"
                          />
                          <StatusBadge status={request.status} size="sm" />
                        </div>
                        <p className="font-semibold text-foreground truncate">{manufacturer?.companyName}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{request.quantity} {request.unit}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {request.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <Link to={`/recycler/requests/${request.id}`}>
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleAccept(request.id)}
                          >
                            <Check className="h-3.5 w-3.5" />
                            Accept
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {requests.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2 text-foreground">No Pending Requests</h3>
              <p className="text-muted-foreground">
                New recycling requests will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RecyclerDashboard;
