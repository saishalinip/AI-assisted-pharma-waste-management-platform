import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  variant?: 'default' | 'dashboard';
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true, variant = 'dashboard' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${variant === 'dashboard' ? 'gradient-dashboard' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
