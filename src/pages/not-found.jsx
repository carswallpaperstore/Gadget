import React from "react";
import { Link } from 'wouter';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead 
        title="Page Not Found - TechGuru India"
        description="यह page उपलब्ध नहीं है। TechGuru India के home page पर जाएं और latest tech news पढ़ें।"
      />
      
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4 hindi-text">
            Page नहीं मिला
          </h1>
          
          <p className="text-muted-foreground mb-8 hindi-text leading-relaxed">
            यह page उपलब्ध नहीं है या हटा दिया गया है। 
            हो सकता है आपने गलत URL type किया हो।
          </p>

          <Link href="/">
            <Button size="lg">
              <Home className="w-4 h-4 mr-2" />
              होम पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}