import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg gradient-primary">
                <Recycle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">PharmaRecycle</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              An AI-assisted academic platform connecting pharmaceutical manufacturers with authorized recyclers for responsible waste management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-semibold mb-4">For Users</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Manufacturer Signup
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Recycler Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
