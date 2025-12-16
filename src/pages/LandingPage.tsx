import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Recycle,
  Upload,
  Search,
  FileCheck,
  ArrowRight,
  Sparkles,
  Shield,
  Building2,
  Factory,
  CheckCircle,
  Leaf,
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: 'Upload Waste Images',
      description: 'Capture and upload images of pharmaceutical waste materials for AI-powered identification.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI Classification',
      description: 'Our ML model identifies material types like PVC, Aluminum, and Multilayer packaging.',
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Find Recyclers',
      description: 'Discover authorized recyclers who can process your specific waste materials.',
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: 'Initiate Request',
      description: 'Send recycling requests and track the entire process from pickup to completion.',
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI-Powered Identification',
      description: 'Computer vision-based material classification for accurate waste categorization.',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Verified Recyclers',
      description: 'All recyclers are verified with proper documentation and licenses.',
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: 'Eco-Friendly Process',
      description: 'Ensure proper disposal and recycling of pharmaceutical packaging waste.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Recycle className="h-4 w-4" />
              <span>AI-Assisted Waste Management</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              Connecting Pharma Manufacturers with{' '}
              <span className="text-primary">Authorized Recyclers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              An intelligent platform for pharmaceutical waste management. Upload waste images, 
              get AI-powered material identification, and connect with verified recyclers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup" className="gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>

            {/* User Type Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 text-left group">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Factory className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Manufacturers</h3>
                <p className="text-muted-foreground mb-4">
                  Upload pharmaceutical waste, get AI-powered classification, and connect with authorized recyclers.
                </p>
                <ul className="space-y-2">
                  {['Company-based accounts', 'Role-based access control', 'AI waste classification'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 text-left group">
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Recyclers</h3>
                <p className="text-muted-foreground mb-4">
                  Receive recycling requests from verified manufacturers and grow your recycling business.
                </p>
                <ul className="space-y-2">
                  {['Receive targeted requests', 'Verified documentation', 'Easy request management'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple four-step process to manage your pharmaceutical waste responsibly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <div className="p-3 rounded-lg bg-muted text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology to make pharmaceutical waste management efficient and transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join our platform today and contribute to responsible pharmaceutical waste management.
          </p>
          <Button 
            variant="secondary" 
            size="xl" 
            asChild 
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link to="/signup" className="gap-2">
              Create Your Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
