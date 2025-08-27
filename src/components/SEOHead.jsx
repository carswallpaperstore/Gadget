import React, { useEffect, useMemo } from "react";
import { useLocation } from 'wouter';

/**
 * SEOHead (Duplicate-Content Safe)
 * ================================
 * • Forces canonical + og:url to always use slug-based URL
 * • Provides stable fallbacks if window is undefined (SSR)
 * • Prevents duplicate meta/LD tags by reusing one instance
 */

export default function SEOHead({ 
  title = "TechGuru India - भारत की सबसे तेज़ गैजेट न्यूज़ साइट",
  description = "भारत की सबसे तेज़ और सटीक गैजेट न्यूज़। मोबाइल, लैपटॉप, कैमरा और स्मार्ट गैजेट्स की ताजा जानकारी।",
  image = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80",
  url,
  canonical,
  type = "website",
  structuredData = null
}) {
  const [location] = useLocation();

  // Compute safe URLs (slug-based canonical)
  const { currentUrl, canonicalUrl } = useMemo(() => {
    const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
    const loc = location || '/';
    const fullUrl = url || (origin ? `${origin}${loc}` : loc);
    return {
      currentUrl: fullUrl,
      canonicalUrl: canonical || fullUrl
    };
  }, [url, canonical, location]);

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('name', 'description', description);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', type === 'article' ? 'article' : type);
    updateMetaTag('property', 'og:locale', 'hi_IN');
    
    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);
    updateMetaTag('name', 'twitter:url', canonicalUrl);
    
    // Update canonical URL
    updateCanonicalUrl(canonicalUrl);
    
    // Add JSON-LD structured data
    const data = structuredData || {
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'NewsArticle' : 'WebSite',
      "headline": title,
      "name": title,
      "description": description,
      "image": image,
      "url": canonicalUrl,
      "inLanguage": "hi-IN",
      "publisher": {
        "@type": "Organization",
        "name": "TechGuru India",
        "url": typeof window !== 'undefined' && window.location?.origin ? window.location.origin : canonicalUrl
      }
    };
    updateStructuredData(data);
  }, [title, description, image, canonicalUrl, type, structuredData]);

  const updateMetaTag = (attribute, name, content) => {
    if (!content) return;
    let selector = attribute === 'property' ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateCanonicalUrl = (url) => {
    if (!url) return;
    let element = document.querySelector('link[rel="canonical"]');
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      document.head.appendChild(element);
    }
    element.setAttribute('href', url);
  };

  const updateStructuredData = (data) => {
    if (!data) return;
    let element = document.querySelector('script[type="application/ld+json"]');
    if (!element) {
      element = document.createElement('script');
      element.setAttribute('type', 'application/ld+json');
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
  };

  return null;
}
