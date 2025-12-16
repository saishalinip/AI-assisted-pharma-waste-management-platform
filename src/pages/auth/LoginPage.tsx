import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { mockManufacturerUsers, mockRecyclers } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Recycle, Mail, Lock, ArrowRight, Factory, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [manufacturerForm, setManufacturerForm] = useState({ email: '', password: '' });
  const [recyclerForm, setRecyclerForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleManufacturerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockManufacturerUsers.find(u => u.email === manufacturerForm.email);
    if (user) {
      login('manufacturer', user);
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${user.name} (${user.role})`,
      });
      navigate('/manufacturer/dashboard');
    } else {
      // Demo: log in as manager for any email
      const demoUser = mockManufacturerUsers[0];
      login('manufacturer', demoUser);
      toast({
        title: 'Demo Mode',
        description: `Logged in as ${demoUser.name} (Manager)`,
      });
      navigate('/manufacturer/dashboard');
    }
    setIsLoading(false);
  };

  const handleRecyclerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const recycler = mockRecyclers[0]; // Demo mode
    login('recycler', recycler);
    toast({
      title: 'Welcome back!',
      description: `Logged in as ${recycler.organizationName}`,
    });
    navigate('/recycler/dashboard');
    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 gradient-hero">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg gradient-primary">
                <Recycle className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl">PharmaRecycle</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Login to access your dashboard
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-card p-8">
            <Tabs defaultValue="manufacturer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="manufacturer" className="gap-2">
                  <Factory className="h-4 w-4" />
                  Manufacturer
                </TabsTrigger>
                <TabsTrigger value="recycler" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Recycler
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manufacturer">
                <form onSubmit={handleManufacturerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mfr-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mfr-email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={manufacturerForm.email}
                        onChange={(e) => setManufacturerForm({ ...manufacturerForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mfr-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mfr-password"
                        type="password"
                        placeholder="••••••••"
                        value={manufacturerForm.password}
                        onChange={(e) => setManufacturerForm({ ...manufacturerForm, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login as Manufacturer'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="recycler">
                <form onSubmit={handleRecyclerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rec-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rec-email"
                        type="email"
                        placeholder="your.email@recycler.com"
                        value={recyclerForm.email}
                        onChange={(e) => setRecyclerForm({ ...recyclerForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rec-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rec-password"
                        type="password"
                        placeholder="••••••••"
                        value={recyclerForm.password}
                        onChange={(e) => setRecyclerForm({ ...recyclerForm, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login as Recycler'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Demo Mode: Enter any email to login
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
