import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Calendar,
  Package,
  Building2,
  Upload
} from 'lucide-react';
import { mockRecyclingRequests } from '@/lib/mockData';
import MaterialBadge from '@/components/shared/MaterialBadge';

const RecyclerRecordsPage: React.FC = () => {
  const [monthFilter, setMonthFilter] = useState('all');
  
  const completedRequests = mockRecyclingRequests.filter(r => r.status === 'completed');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
              <h1 className="text-2xl font-bold">Processing Records</h1>
              <p className="text-muted-foreground mt-1">
                View your completed recycling history
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Records
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Filter by Month:</span>
              </div>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{completedRequests.length}</div>
              <p className="text-sm text-muted-foreground">Total Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {completedRequests.reduce((acc, r) => acc + (r.unit === 'tons' ? r.quantity * 1000 : r.quantity), 0)} kg
              </div>
              <p className="text-sm text-muted-foreground">Total Processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {completedRequests.filter(r => r.proofDocuments?.length).length}
              </div>
              <p className="text-sm text-muted-foreground">With Proof Documents</p>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Recyclings</CardTitle>
            <CardDescription>
              All processed materials with documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {completedRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No completed records yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedRequests.map(request => (
                  <div 
                    key={request.id}
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <MaterialBadge material={request.materialType} />
                          <span className="font-medium">{request.quantity} {request.unit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{request.manufacturerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Completed: {request.completedAt ? new Date(request.completedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="default">Completed</Badge>
                        {request.proofDocuments && request.proofDocuments.length > 0 && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{request.proofDocuments.length} documents</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Upload Proof Section */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Proof Documents</span>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Proof
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RecyclerRecordsPage;
