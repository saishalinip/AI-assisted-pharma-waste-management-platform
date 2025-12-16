import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockRecyclers, Recycler } from '@/lib/mockData';
import {
  Search,
  MapPin,
  Star,
  FileText,
  ArrowRight,
  Filter,
  GitCompare,
  Building2,
  IndianRupee,
} from 'lucide-react';

const RecyclerListPage: React.FC = () => {
  const location = useLocation();
  const passedMaterials = location.state?.materials;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredRecyclers = mockRecyclers
    .filter(r => {
      const matchesSearch = r.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMaterial = materialFilter === 'all' || r.materialsProcessed.includes(materialFilter);
      return matchesSearch && matchesMaterial;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return (a.distance || 999) - (b.distance || 999);
        case 'price': {
          const aMin = a.materialPricing.length > 0 ? Math.min(...a.materialPricing.map(p => p.minPrice)) : 999;
          const bMin = b.materialPricing.length > 0 ? Math.min(...b.materialPricing.map(p => p.minPrice)) : 999;
          return aMin - bMin;
        }
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const toggleCompare = (id: string) => {
    setSelectedForCompare(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const allMaterials = Array.from(
    new Set(mockRecyclers.flatMap(r => r.materialsProcessed))
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Find Recyclers</h1>
            <p className="text-muted-foreground mt-1">
              {passedMaterials 
                ? `Showing recyclers for ${passedMaterials[0]?.type || 'your material'}`
                : 'Browse verified recyclers in your area'
              }
            </p>
          </div>
          
          {selectedForCompare.length >= 2 && (
            <Button asChild>
              <Link 
                to="/manufacturer/compare" 
                state={{ recyclerIds: selectedForCompare }}
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare ({selectedForCompare.length})
              </Link>
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recyclers by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={materialFilter} onValueChange={setMaterialFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Materials</SelectItem>
                  {allMaterials.map(mat => (
                    <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price">Price (Low)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Recycler Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecyclers.map((recycler) => (
            <RecyclerCard
              key={recycler.id}
              recycler={recycler}
              isSelected={selectedForCompare.includes(recycler.id)}
              onToggleCompare={() => toggleCompare(recycler.id)}
            />
          ))}
        </div>

        {filteredRecyclers.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Recyclers Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface RecyclerCardProps {
  recycler: Recycler;
  isSelected: boolean;
  onToggleCompare: () => void;
}

const RecyclerCard: React.FC<RecyclerCardProps> = ({ recycler, isSelected, onToggleCompare }) => {
  return (
    <div className={`bg-card rounded-xl border shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{recycler.organizationName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {recycler.location}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-medium">{recycler.distance} km</span>
          </div>
          {recycler.pricingConfigured && recycler.materialPricing.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price Range</span>
              <span className="font-medium flex items-center">
                <IndianRupee className="h-3.5 w-3.5" />
                {Math.min(...recycler.materialPricing.map(p => p.minPrice))} - {Math.max(...recycler.materialPricing.map(p => p.maxPrice))}/kg
              </span>
            </div>
          )}
          {!recycler.pricingConfigured && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pricing</span>
              <span className="text-orange-600 text-xs">Not configured</span>
            </div>
          )}
          {recycler.rating && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {recycler.rating}
              </span>
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Materials Processed</p>
          <div className="flex flex-wrap gap-1.5">
            {recycler.materialsProcessed.map((mat) => (
              <span
                key={mat}
                className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`compare-${recycler.id}`}
              checked={isSelected}
              onCheckedChange={onToggleCompare}
            />
            <label htmlFor={`compare-${recycler.id}`} className="text-xs text-muted-foreground cursor-pointer">
              Compare
            </label>
          </div>
          
          <div className="flex-1 flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/manufacturer/recycler/${recycler.id}`}>
                <FileText className="h-3.5 w-3.5 mr-1" />
                Details
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/manufacturer/recycler/${recycler.id}`}>
                Select
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclerListPage;
