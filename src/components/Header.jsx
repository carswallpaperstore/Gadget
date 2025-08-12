/**
 * HEADER COMPONENT
 * ===============
 * Main navigation header with search and notification functionality
 * Contains responsive menu and branding
 */

import { useState } from 'react';
import React from "react";
import { Menu, Search, Bell, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'wouter';
import SearchModal from './SearchModal';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Close mobile menu on link click
  const handleMobileLink = () => setShowMobileMenu(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-3 md:px-8">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-3 rounded-full border border-gray-200 shadow-sm bg-white/90"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo - BRANDING CENTER */}
          <Link href="/" className="flex items-center space-x-2 flex-1 md:flex-none">
            <div className="font-bold text-2xl tracking-tight english-text text-primary">
              TechGuru India
            </div>
          </Link>

          {/* Desktop Navigation - MAIN MENU */}
          <nav className="hidden md:flex items-center gap-6 flex-1 ml-8">
            <Link href="/" className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors hindi-text px-3 py-1 rounded-md hover:bg-primary/10">
              <span>होम</span> <span className="ml-1 text-xs text-gray-500 align-middle">(Home)</span>
            </Link>
            <Link href="/about" className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors hindi-text px-3 py-1 rounded-md hover:bg-primary/10">
              <span>हमारे बारे में</span> <span className="ml-1 text-xs text-gray-500 align-middle">(About)</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors hindi-text px-3 py-1 rounded-md hover:bg-primary/10">
              <span>संपर्क करें</span> <span className="ml-1 text-xs text-gray-500 align-middle">(Contact)</span>
            </Link>
          </nav>

          {/* Action Buttons - SEARCH & NOTIFICATIONS */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full border border-gray-200 shadow-sm bg-white/90"
              onClick={() => setShowSearch(true)}
              title="Search blogs"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {showMobileMenu && (
          <nav className="md:hidden fixed inset-0 z-50 flex" style={{background: 'white'}} onClick={() => setShowMobileMenu(false)}>
            <div className="h-full w-full bg-white p-0 flex flex-col animate-slideInLeft" onClick={e => e.stopPropagation()}>
              <div className="w-full bg-white p-6 flex flex-col gap-0 min-h-full relative">
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-200" onClick={() => setShowMobileMenu(false)} aria-label="Close menu">
                  <X className="h-7 w-7 text-gray-700" />
                </button>
                <Link href="/" className="flex items-center gap-2 text-lg font-bold hindi-text border-b pb-2 text-primary bg-white transition" style={{paddingLeft: 16, paddingRight: 16, minHeight: 44}} onClick={handleMobileLink}>
                  <span>होम</span> <span className="ml-1 text-xs text-gray-500 align-middle">(Home)</span>
                </Link>
                <Link href="/about" className="flex items-center gap-2 text-lg font-bold hindi-text border-b pb-2 text-primary bg-white transition" style={{paddingLeft: 16, paddingRight: 16, minHeight: 44}} onClick={handleMobileLink}>
                  <span>हमारे बारे में</span> <span className="ml-1 text-xs text-gray-500 align-middle">(About)</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 text-lg font-bold hindi-text text-primary bg-white transition" style={{paddingLeft: 16, paddingRight: 16, minHeight: 44}} onClick={handleMobileLink}>
                  <span>संपर्क करें</span> <span className="ml-1 text-xs text-gray-500 align-middle">(Contact)</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <SearchModal 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />
    </>
  );
}