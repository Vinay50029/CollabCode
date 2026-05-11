import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Terminal className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">CollabCode</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/features" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</Link>
          <Link to="/docs" className="text-sm text-muted-foreground hover:text-white transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Log In</Link>
          <Link to="/signup" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
          <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Globe className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
