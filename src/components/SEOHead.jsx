import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SEOHead({ 
  title = "TechGuru India - भारत की सबसे तेज़ गैजेट न्यूज़ साइट",
  description = "भारत की सबसे तेज़ और सटीक गैजेट न्यूज़। मोबाइल, लैपटॉप, कैमरा और स्मार्ट गैजेट्स की ताजा जानकारी।",
  image = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80",
  url,
  type = "website",
  structuredData = null
}) {
  const [location] = useLocation();
  const currentUrl = url || `${window.location.origin}${location}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('description', description);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', type === 'article' ? 'article' : type);
    updateMetaTag('property', 'og:locale', 'hi_IN');
    
    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);
    
    // Update canonical URL
    updateCanonicalUrl(currentUrl);
    
    // Add JSON-LD structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      updateStructuredData({
        "@context": "https://schema.org",
        "@type": type === 'article' ? 'NewsArticle' : 'WebSite',
        "name": title,
        "description": description,
        "image": image,
        "url": currentUrl,
        "inLanguage": "hi-IN",
        "publisher": {
          "@type": "Organization",
          "name": "TechGuru India",
          "url": window.location.origin
        }
      });
    }
  }, [title, description, image, currentUrl, type, structuredData]);

  const updateMetaTag = (attribute, name, content) => {
    if (!content) return;
    
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateCanonicalUrl = (url) => {
    let element = document.querySelector('link[rel="canonical"]');
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      document.head.appendChild(element);
    }
    element.setAttribute('href', url);
  };

  const updateStructuredData = (data) => {
    let element = document.querySelector('script[type="application/ld+json"]');
    if (!element) {
      element = document.createElement('script');
      element.setAttribute('type', 'application/ld+json');
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
  };

  return null; // This component doesn't render anything
}