
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  return <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <img 
            src="/lovable-uploads/301afc41-4ea8-4222-b581-679fdc58c384.png" 
            alt="PwC Logo" 
            className="h-9" 
          />
          <span className="font-medium text-lg">Maturity Assessment Demo</span>
        </Link>
        
        {location.pathname !== '/' && <div className="flex items-center text-muted-foreground text-sm">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3 mx-1" />
            {location.pathname.includes('/assessment') && <span className="text-foreground">Assessment</span>}
            {location.pathname.includes('/results') && <span className="text-foreground">Results</span>}
          </div>}
      </div>
    </header>;
};

export default Navbar;
