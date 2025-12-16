import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Upload, FileText, MapPin, Building2 } from 'lucide-react';
import { mockRecyclers, MATERIAL_TYPES } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const EditProfilePage: React.FC = () => {
  const { toast } = useToast();
  const recycler = mockRecyclers[0]; // Mock current recycler
  
  const [form, setForm] = useState({
    organizationName: recycler.organizationName,
    location: recycler.location,
    email: recycler.email,
    materials: recycler.materialsProcessed,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleMaterialToggle = (material: string) => {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/recycler/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground mt-1">
            Update your organization details
          </p>
        </div>

        {/* Profile Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={form.organizationName}
                onChange={(e) => setForm(prev => ({ ...prev, organizationName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Materials */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Materials Processed</CardTitle>
            <CardDescription>
              Select all material types your facility can process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MATERIAL_TYPES.map(material => (
                <div
                  key={material}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleMaterialToggle(material)}
                >
                  <Checkbox
                    checked={form.materials.includes(material)}
                    onCheckedChange={() => handleMaterialToggle(material)}
                  />
                  <Label className="cursor-pointer">{material}</Label>
                </div>
              ))}
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
              Upload GST certificate or business license
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Current Document</p>
                  <p className="text-sm text-muted-foreground">license.pdf</p>
                </div>
              </div>
              <Badge variant={recycler.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                {recycler.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <Button variant="outline" className="mt-4 gap-2">
              <Upload className="h-4 w-4" />
              Upload New Document
            </Button>
          </CardContent>
        </Card>

        {/* Pricing Link */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pricing Configuration</p>
                <p className="text-sm text-muted-foreground">
                  Set your prices for each material type
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/recycler/pricing">Configure Pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfilePage;
