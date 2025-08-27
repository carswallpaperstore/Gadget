import React, { useMemo } from "react";
/**
 * BLOG POST PAGE (Duplicate-Content Safe)
 * ======================================
 * • Fixes canonical/OG URL to use slug (NOT id)
 * • Avoids direct window usage inside JSX props
 * • Provides robust fallbacks for description
 */

import { useRoute } from 'wouter';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'wouter';
import SocialShare from '../components/SocialShare';
import SEOHead from '../components/SEOHead';
import { getPostBySlug } from '../data/blogPosts';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  // GET SINGLE POST - Fetch post data by slug from URL
  const post = getPostBySlug(params?.slug);

  // Pre-compute canonical + share URL safely (SSR friendly)
  const { canonicalUrl, canonicalPath, shareUrl, metaDescription } = useMemo(() => {
    const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
    const path = post?.slug ? `/blog/${post.slug}` : '';
    const url = origin && path ? `${origin}${path}` : path;
    const desc = (post?.excerpt || (post?.content ? String(post.content).replace(/\n/g, ' ').slice(0, 160) : '')).trim();
    return {
      canonicalUrl: url,
      canonicalPath: path,
      shareUrl: url,
      metaDescription: desc
    };
  }, [post]);

  // Handle post not found
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4 hindi-text">Post नहीं मिली</h1>
        <p className="text-muted-foreground mb-8 hindi-text">
          यह post उपलब्ध नहीं है या हटा दी गई है।
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home पर वापस जाएं
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* SEO HEAD - Individual post optimization */}
      <SEOHead 
        title={`${post.title} | TechGuru India`}
        description={metaDescription}
        image={post.image}
        type="article"
        // ✅ Pass canonical URL based on slug (prevents duplicate canonical issues)
        canonical={canonicalUrl}
        // (If your SEOHead supports url/ogUrl props, keep them in sync)
        url={canonicalUrl}
        ogUrl={canonicalUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": post.title,
          "description": metaDescription,
          "image": [post.image],
          "datePublished": post.publishedAt,
          "dateModified": post.updatedAt || post.publishedAt,
          "author": [{
            "@type": "Person",
            "name": post.author
          }],
          "publisher": {
            "@type": "Organization",
            "name": "TechGuru India",
            "logo": {
              "@type": "ImageObject",
              "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=256&q=80"
            }
          },
          // ✅ Match structured data URL to canonical (not id)
          "mainEntityOfPage": canonicalUrl,
          "inLanguage": "hi-IN",
          // Optional but helpful to disambiguate topical clusters
          "articleSection": post.category || "Technology"
        }}
      />

      <article className="max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hindi-text">वापस जाएं</span>
            </Button>
          </Link>
        </div>

        {/* HERO IMAGE */}
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* ARTICLE HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hindi-text leading-tight">
            {post.title}
          </h1>
          
          {/* POST META - Author and date */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hindi-text">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <time className="english-text" dateTime={new Date(post.publishedAt).toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString('hi-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>

          {/* SOCIAL SHARING */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hindi-text">Share करें:</span>
            {/* ✅ Use canonical/slug URL for shares to avoid multiple URLs for the same content */}
            <SocialShare 
              url={shareUrl}
              title={post.title}
              description={metaDescription}
            />
          </div>
        </header>

        {/* ARTICLE CONTENT */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="hindi-text leading-relaxed">
            {/* CONTENT RENDERING - Formats the blog content with proper styling */}
            {post.content.split('\n\n').map((paragraph, index) => {
              // Handle headings (lines starting with **)
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                const heading = paragraph.replace(/\*\*/g, '');
                return (
                  <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-foreground">
                    {heading}
                  </h2>
                );
              }
              
              // Handle bullet points (lines starting with -)
              if (paragraph.includes('- ')) {
                const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                  <ul key={index} className="my-6 space-y-2">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              
              // Regular paragraphs
              return (
                <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SOCIAL SHARING */}
        <div className="border-t border-border pt-8 mb-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-4 hindi-text">
              यह post helpful लगी? अपने friends के साथ share करें:
            </p>
            {/* ✅ Bottom share uses the same canonical URL */}
            <SocialShare 
              url={shareUrl}
              title={post.title}
              description={metaDescription}
              showLabels={true}
            />
          </div>
        </div>

        {/* AUTHOR INFO */}
        <div className="bg-muted/30 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-2 hindi-text">Author के बारे में</h3>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium hindi-text">{post.author}</p>
              <p className="text-sm text-muted-foreground hindi-text">
                TechGuru India के tech expert और reviewer
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
