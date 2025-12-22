import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import MaterialBadge from '@/components/shared/MaterialBadge';
import { mockClassifyWaste, MaterialClassification } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  Info,
  Loader2,
  CheckCircle,
} from 'lucide-react';

const WasteUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'kg' | 'tons'>('kg');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationProgress, setClassificationProgress] = useState(0);
  const [classificationResult, setClassificationResult] = useState<MaterialClassification[] | null>(null);

  const addImages = useCallback((files: File[]) => {
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);
    
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setPreviews(prev => {
      prev.forEach(url => URL.revokeObjectURL(url));
      return newPreviews;
    });
    
    // Reset classification when images change
    setClassificationResult(null);
  }, [images]);

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addImages(files);
  }, [addImages]);

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setClassificationResult(null);
  };

  const handleClassify = async () => {
    if (images.length === 0) {
      toast({
        title: 'No Images',
        description: 'Please upload at least one image to classify.',
        variant: 'destructive',
      });
      return;
    }

    setIsClassifying(true);
    setClassificationProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setClassificationProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const result = await mockClassifyWaste();
      clearInterval(progressInterval);
      setClassificationProgress(100);
      
      setTimeout(() => {
        setClassificationResult(result);
        setIsClassifying(false);
        toast({
          title: 'Classification Complete',
          description: 'Material types have been identified.',
        });
      }, 300);
    } catch (error) {
      clearInterval(progressInterval);
      setIsClassifying(false);
      toast({
        title: 'Classification Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleProceed = () => {
    if (!classificationResult) return;
    
    toast({
      title: 'Waste Registered',
      description: 'Redirecting to recycler recommendations...',
    });
    
    // Navigate to recycler recommendations with material type
    navigate('/manufacturer/recyclers', {
      state: {
        materials: classificationResult,
        quantity,
        unit,
      },
    });
  };

  const primaryMaterial = classificationResult?.find(m => m.isPrimary);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Upload Waste for Classification</h1>
          <p className="text-muted-foreground mt-1">
            Upload images of pharmaceutical waste for AI-powered material identification
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <Label className="text-base font-medium mb-4 block">Waste Images</Label>
              
              <div
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => addImages(Array.from(e.target.files || []))}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium">Drag & drop images or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB each (max 5 images)</p>
                </label>
              </div>

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border border-border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity & Details */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={(v) => setUnit(v as 'kg' | 'tons')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category (Optional)</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="blister">Blister Packs</SelectItem>
                    <SelectItem value="packaging">Packaging Waste</SelectItem>
                    <SelectItem value="bottles">Bottles & Containers</SelectItem>
                    <SelectItem value="mixed">Mixed Waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Classify Button */}
            <Button
              onClick={handleClassify}
              disabled={images.length === 0 || isClassifying}
              size="lg"
              className="w-full gap-2"
            >
              {isClassifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Identifying Materials...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Identify Material
                </>
              )}
            </Button>

            {isClassifying && (
              <div className="space-y-2">
                <Progress value={classificationProgress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Analyzing image with AI model...
                </p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Classification Result */}
            <div className={`bg-card rounded-xl border border-border p-6 shadow-card transition-opacity duration-300 ${classificationResult ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Identified Material Type(s)</h3>
              </div>

              {classificationResult ? (
                <div className="space-y-4">
                  {/* Material Badges */}
                  <div className="flex flex-wrap gap-2">
                    {classificationResult.map((material, index) => (
                      <MaterialBadge
                        key={index}
                        material={material.type}
                        showConfidence
                        confidence={material.confidence}
                        isPrimary={material.isPrimary}
                        size="lg"
                      />
                    ))}
                  </div>

                  {/* Primary Material Highlight */}
                  {primaryMaterial && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Primary Material Detected</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{primaryMaterial.type}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-medium">{primaryMaterial.confidence}%</span>
                        </div>
                        <Progress value={primaryMaterial.confidence} className="h-2" />
                      </div>
                    </div>
                  )}

                  {/* Info Note */}
                  <div className="flex gap-2 p-3 rounded-lg bg-muted text-sm">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Material identification is based on image analysis and may require further validation.
                    </p>
                  </div>

                  {/* Proceed Button */}
                  <Button
                    onClick={handleProceed}
                    variant="hero"
                    size="lg"
                    className="w-full gap-2"
                    disabled={!quantity}
                  >
                    Find Matching Recyclers
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">
                    Upload images and click "Identify Material" to see classification results
                  </p>
                </div>
              )}
            </div>

            {/* How It Works */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <h4 className="font-medium mb-3">How AI Classification Works</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">1.</span>
                  Upload clear images of your pharmaceutical waste
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">2.</span>
                  Our ML model analyzes material properties using computer vision
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">3.</span>
                  Identified materials are matched with capable recyclers
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">4.</span>
                  Submit request to your preferred recycler
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WasteUploadPage;
