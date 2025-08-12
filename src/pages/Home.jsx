/**
 * HOME PAGE COMPONENT
 * ==================
 * Main landing page showing featured and recent blog posts
 * Handles pagination with "Load More" functionality
 * 
 * HOW TO MODIFY:
 * - Featured posts are controlled by "featured: true" in blogPosts.js
 * - Posts per page can be changed by modifying POSTS_PER_PAGE constant
 * - Hero section can be customized in the hero section below
 */

import React from "react";

// ...existing code...
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";
import { getAllPosts, getFeaturedPosts } from "../data/blogPosts";

const POSTS_PER_PAGE = 6; // CHANGE THIS: How many posts to show per "Load More" click

export default function Home() {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Get all blog posts from our data file
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  // Load initial posts on component mount
  useEffect(() => {
    const initialPosts = allPosts.slice(0, POSTS_PER_PAGE);
    setDisplayedPosts(initialPosts);
    setHasMore(allPosts.length > POSTS_PER_PAGE);
  }, []);

  // LOAD MORE FUNCTIONALITY - Shows more posts when clicked
  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const newPosts = allPosts.slice(startIndex, endIndex);
    
    setDisplayedPosts(prev => [...prev, ...newPosts]);
    setCurrentPage(nextPage);
    
    // Check if there are more posts to load
    setHasMore(endIndex < allPosts.length);
  };

  return (
    <>
      {/* SEO HEAD - Google Discover optimization */}
      <SEOHead 
        title="TechGuru India - Latest Tech News, Reviews और Updates"
        description="भारत की #1 tech website। Latest smartphones, laptops, gadgets की reviews और tech news पढ़ें। iPhone, Samsung, OnePlus और बाकी brands की detailed analysis।"
      />
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HERO SECTION - Main welcome area */}
        <section className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 hindi-text">
            भारत की <span className="text-primary">सबसे तेज़</span> Tech Website
          </h1>
          <p className="text-xl text-muted-foreground mb-8 hindi-text max-w-3xl mx-auto">
            Latest smartphones, laptops, gadgets की honest reviews और tech news। 
            सिर्फ tested और verified information मिलती है यहाँ।
          </p>
          
          {/* Newsletter Subscription */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email address..." 
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button className="whitespace-nowrap hindi-text">
              Subscribe करें
            </Button>
          </div>
        </section>

        {/* FEATURED POSTS SECTION - Top 3 featured posts */}
        {featuredPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold hindi-text">Featured Posts</h2>
              <div className="h-0.5 bg-primary/20 flex-1 ml-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* RECENT POSTS SECTION - All posts with pagination */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold hindi-text">Latest Posts</h2>
            <div className="h-0.5 bg-primary/20 flex-1 ml-6"></div>
          </div>
          
          {/* BLOG POSTS GRID - Shows all loaded posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                featured={false}
              />
            ))}
          </div>

          {/* LOAD MORE BUTTON - Shows if more posts available */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMorePosts}
                variant="outline"
                size="lg"
                className="hindi-text"
              >
                <ChevronDown className="w-4 h-4 mr-2" />
                और Posts देखें
              </Button>
            </div>
          )}
          
          {/* END MESSAGE - Shows when all posts loaded */}
          {!hasMore && displayedPosts.length > POSTS_PER_PAGE && (
            <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground hindi-text">
                सभी posts देख लिए गए हैं। नए updates के लिए बाद में आएं!
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}