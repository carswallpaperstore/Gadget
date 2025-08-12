/**
 * SEARCH MODAL COMPONENT
 * =====================
 * Handles blog post search functionality with instant results
 * Shows search results in a modal overlay
 */

import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import React from "react";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { searchPosts } from '../data/blogPosts';
import { Link } from 'wouter';

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Add small delay for better UX
    const searchTimeout = setTimeout(() => {
      const results = searchPosts(searchQuery);
      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Handle modal close
  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  // Handle result click
  const handleResultClick = () => {
    handleClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white rounded-lg shadow-2xl border border-border overflow-hidden">
            {/* Search Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Blog posts में search करें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus:ring-0 text-lg bg-transparent"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground hindi-text">Search कर रहे हैं...</p>
                </div>
              ) : searchQuery.trim() === '' ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground hindi-text">कुछ search करके देखें</p>
                  <p className="text-sm text-muted-foreground/70 mt-2 hindi-text">
                    Title, content या tags में search कर सकते हैं
                  </p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground hindi-text">कोई result नहीं मिला</p>
                  <p className="text-sm text-muted-foreground/70 mt-2 hindi-text">
                    "{searchQuery}" के लिए कुछ नहीं मिला
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {searchResults.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      onClick={handleResultClick}
                    >
                      <div className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                        <h3 className="font-medium text-foreground mb-2 hindi-text line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground hindi-text line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground space-x-3">
                          <span className="hindi-text">{post.author}</span>
                          <span>•</span>
                          <span className="english-text">
                            {new Date(post.publishedAt).toLocaleDateString('hi-IN')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Tips */}
            {searchQuery.trim() === '' && (
              <div className="p-4 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground hindi-text">
                  <strong>Tips:</strong> Product names, brands, या features search करें
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}