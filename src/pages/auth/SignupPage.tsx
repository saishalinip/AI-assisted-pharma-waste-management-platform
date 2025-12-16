import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Recycle, ArrowRight, Factory, Building2, MapPin, Mail, Building, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MATERIAL_TYPES } from '@/lib/mockData';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [manufacturerForm, setManufacturerForm] = useState({ companyName: '', location: '', email: '', password: '', document: null as File | null });
  const [recyclerForm, setRecyclerForm] = useState({ organizationName: '', location: '', email: '', password: '', materials: [] as string[], document: null as File | null });
  const [isLoading, setIsLoading] = useState(false);

  const handleMaterialToggle = (material: string) => {
    setRecyclerForm(prev => ({
      ...prev,
      materials: prev.materials.includes(material) ? prev.materials.filter(m => m !== material) : [...prev.materials, material]
    }));
  };

  const handleManufacturerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    login('manufacturer', { id: 'usr-new', email: manufacturerForm.email, name: manufacturerForm.companyName.split(' ')[0] + ' Admin', role: 'manager', manufacturerId: 'mfr-new', status: 'active' });
    toast({ title: 'Account Created!', description: 'Welcome to PharmaRecycle. Your account is pending verification.' });
    navigate('/manufacturer/dashboard');
    setIsLoading(false);
  };

  const handleRecyclerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    login('recycler', { id: 'rec-new', organizationName: recyclerForm.organizationName, location: recyclerForm.location, email: recyclerForm.email, materialsProcessed: recyclerForm.materials, materialPricing: [], pricingConfigured: false, verificationStatus: 'pending', createdAt: new Date().toISOString() });
    toast({ title: 'Account Created!', description: 'Welcome! Please configure your pricing before accepting requests.' });
    navigate('/recycler/dashboard');
    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4 gradient-hero">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg gradient-primary"><Recycle className="h-6 w-6 text-primary-foreground" /></div>
              <span className="font-semibold text-xl">PharmaRecycle</span>
            </div>
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">Choose your account type to get started</p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-8">
            <Tabs defaultValue="manufacturer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="manufacturer" className="gap-2"><Factory className="h-4 w-4" />Manufacturer</TabsTrigger>
                <TabsTrigger value="recycler" className="gap-2"><Building2 className="h-4 w-4" />Recycler</TabsTrigger>
              </TabsList>

              <TabsContent value="manufacturer">
                <form onSubmit={handleManufacturerSignup} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mfr-company">Company Name</Label>
                      <div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="mfr-company" placeholder="PharmaCorp Industries" value={manufacturerForm.companyName} onChange={(e) => setManufacturerForm({ ...manufacturerForm, companyName: e.target.value })} className="pl-10" required /></div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mfr-location">Location</Label>
                      <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="mfr-location" placeholder="Mumbai, Maharashtra" value={manufacturerForm.location} onChange={(e) => setManufacturerForm({ ...manufacturerForm, location: e.target.value })} className="pl-10" required /></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mfr-email">Official Company Email</Label>
                    <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="mfr-email" type="email" placeholder="contact@company.com" value={manufacturerForm.email} onChange={(e) => setManufacturerForm({ ...manufacturerForm, email: e.target.value })} className="pl-10" required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="mfr-password">Password</Label><Input id="mfr-password" type="password" placeholder="Create a strong password" value={manufacturerForm.password} onChange={(e) => setManufacturerForm({ ...manufacturerForm, password: e.target.value })} required /></div>
                  <div className="space-y-2">
                    <Label>Verification Document</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <input type="file" id="mfr-doc" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setManufacturerForm({ ...manufacturerForm, document: e.target.files?.[0] || null })} />
                      <label htmlFor="mfr-doc" className="cursor-pointer"><FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm font-medium">{manufacturerForm.document ? manufacturerForm.document.name : 'Upload GST Certificate or Company License'}</p><p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 5MB)</p></label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Manufacturer Account'}<ArrowRight className="h-4 w-4 ml-2" /></Button>
                  <p className="text-xs text-muted-foreground text-center">The first user will be assigned as Manager with full access.</p>
                </form>
              </TabsContent>

              <TabsContent value="recycler">
                <form onSubmit={handleRecyclerSignup} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rec-org">Organization Name</Label>
                      <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="rec-org" placeholder="EcoRecycle Solutions" value={recyclerForm.organizationName} onChange={(e) => setRecyclerForm({ ...recyclerForm, organizationName: e.target.value })} className="pl-10" required /></div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rec-location">Location</Label>
                      <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="rec-location" placeholder="Pune, Maharashtra" value={recyclerForm.location} onChange={(e) => setRecyclerForm({ ...recyclerForm, location: e.target.value })} className="pl-10" required /></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rec-email">Email</Label>
                    <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="rec-email" type="email" placeholder="contact@recycler.com" value={recyclerForm.email} onChange={(e) => setRecyclerForm({ ...recyclerForm, email: e.target.value })} className="pl-10" required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="rec-password">Password</Label><Input id="rec-password" type="password" placeholder="Create a strong password" value={recyclerForm.password} onChange={(e) => setRecyclerForm({ ...recyclerForm, password: e.target.value })} required /></div>
                  <div className="space-y-2">
                    <Label>Materials Processed</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {MATERIAL_TYPES.map(material => (
                        <div key={material} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleMaterialToggle(material)}>
                          <Checkbox checked={recyclerForm.materials.includes(material)} onCheckedChange={() => handleMaterialToggle(material)} />
                          <Label className="cursor-pointer text-sm">{material}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Verification Document</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <input type="file" id="rec-doc" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setRecyclerForm({ ...recyclerForm, document: e.target.files?.[0] || null })} />
                      <label htmlFor="rec-doc" className="cursor-pointer"><FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm font-medium">{recyclerForm.document ? recyclerForm.document.name : 'Upload GST Certificate or License'}</p><p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 5MB)</p></label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading || recyclerForm.materials.length === 0}>{isLoading ? 'Creating Account...' : 'Create Recycler Account'}<ArrowRight className="h-4 w-4 ml-2" /></Button>
                  <p className="text-xs text-muted-foreground text-center">You'll need to configure pricing after signup before accepting requests.</p>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 pt-6 border-t border-border text-center"><p className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Login</Link></p></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;