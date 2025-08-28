/**
 * STRUCTURED DATA TEMPLATES
 * =========================
 * 
 * Comprehensive Schema.org templates for:
 * - Website & Organization
 * - Blog Posts & News Articles  
 * - Breadcrumbs & FAQ
 * - Local Business & Product Reviews
 * 
 * All optimized for Google Discover, Rich Snippets, and Knowledge Graph
 */

import { SITE_CONFIG, normalizeCanonicalUrl, generateCanonicalUrl } from './seo-utils.js';

/**
 * Website Schema Template
 * For homepage and main website representation
 */
export function createWebsiteSchema(data = {}) {
  // Ensure canonical URL consistency
  const websiteUrl = data.url ? normalizeCanonicalUrl(data.url) : SITE_CONFIG.domain;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${websiteUrl}/#website`,
    "name": data.name || SITE_CONFIG.name,
    "description": data.description || SITE_CONFIG.description,
    "url": websiteUrl,
    "inLanguage": [SITE_CONFIG.language, "en-IN"],
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_CONFIG.domain}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    }
  };
}

/**
 * Organization Schema Template
 * For company/brand representation
 */
export function createOrganizationSchema(data = {}) {
  // Always use normalized domain for organization
  const organizationUrl = data.url ? normalizeCanonicalUrl(data.url) : SITE_CONFIG.domain;
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.domain}/#organization`,
    "name": data.name || SITE_CONFIG.name,
    "alternateName": "TechGuru India",
    "url": organizationUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${SITE_CONFIG.domain}/#logo`,
      "url": `${SITE_CONFIG.domain}/logo.png`,
      "contentUrl": `${SITE_CONFIG.domain}/logo.png`,
      "width": 512,
      "height": 512,
      "caption": SITE_CONFIG.name
    },
    "image": {
      "@id": `${SITE_CONFIG.domain}/#logo`
    },
    "description": data.description || SITE_CONFIG.description,
    "foundingDate": "2023",
    "slogan": "भारत की सबसे तेज़ गैजेट न्यूज़ साइट",
    "sameAs": [
      "https://twitter.com/TechGuruIndia",
      "https://facebook.com/TechGuruIndia", 
      "https://instagram.com/TechGuruIndia",
      "https://youtube.com/@TechGuruIndia"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": `${SITE_CONFIG.domain}/contact`,
        "availableLanguage": ["Hindi", "English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Technology",
      "Smartphones",
      "Gadgets", 
      "Consumer Electronics",
      "Mobile Technology",
      "Tech Reviews"
    ]
  };
}

/**
 * News Article Schema Template  
 * Optimized for Google Discover and News
 */
export function createNewsArticleSchema(post, canonicalUrl) {
  if (!post) return null;
  
  // Ensure canonical URL is normalized
  const normalizedCanonicalUrl = normalizeCanonicalUrl(canonicalUrl);
  
  const publishedDate = new Date(post.publishedAt).toISOString();
  const modifiedDate = new Date(post.updatedAt || post.publishedAt).toISOString();
  
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${normalizedCanonicalUrl}#article`,
    "headline": post.title,
    "description": post.excerpt || post.seo?.description || post.content?.substring(0, 155),
    "image": {
      "@type": "ImageObject",
      "url": post.image,
      "width": 1200,
      "height": 630,
      "caption": post.title
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": post.author || SITE_CONFIG.author,
      "url": `${SITE_CONFIG.domain}/author/${(post.author || 'admin').toLowerCase().replace(' ', '-')}`
    },
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": normalizedCanonicalUrl
    },
    "url": normalizedCanonicalUrl,
    "inLanguage": SITE_CONFIG.language,
    "articleSection": post.category || "Technology",
    "articleBody": post.content,
    "wordCount": post.content ? post.content.split(' ').length : 0,
    "keywords": post.seo?.keywords?.join(', ') || "",
    
    // Google Discover optimization
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".article-content p"]
    },
    
    // Article rating (if available)
    ...(post.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": post.rating,
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": post.ratingCount || 1
      }
    }),
    
    // Related to product if it's a review
    ...(post.product && {
      "about": {
        "@type": "Product",
        "name": post.product.name,
        "brand": post.product.brand,
        "model": post.product.model
      }
    })
  };
}

/**
 * Blog Posting Schema Template
 * For general blog posts
 */
export function createBlogPostingSchema(post, canonicalUrl) {
  if (!post) return null;
  
  // Ensure canonical URL is normalized
  const normalizedCanonicalUrl = normalizeCanonicalUrl(canonicalUrl);
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${normalizedCanonicalUrl}#blogpost`,
    "headline": post.title,
    "description": post.excerpt || post.seo?.description,
    "image": post.image,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post.updatedAt || post.publishedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || SITE_CONFIG.author
    },
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    },
    "mainEntityOfPage": normalizedCanonicalUrl,
    "url": normalizedCanonicalUrl,
    "inLanguage": SITE_CONFIG.language,
    "keywords": post.seo?.keywords?.join(', ') || "",
    "articleSection": post.category || "Technology",
    "wordCount": post.content ? post.content.split(' ').length : 0
  };
}

/**
 * Breadcrumb Schema Template
 */
export function createBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || !Array.isArray(breadcrumbs)) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * FAQ Schema Template
 * For pages with frequently asked questions
 */
export function createFAQSchema(faqs) {
  if (!faqs || !Array.isArray(faqs)) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Product Review Schema Template
 * For product review articles
 */
export function createProductReviewSchema(post, product, canonicalUrl) {
  if (!post || !product) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${canonicalUrl}#review`,
    "headline": post.title,
    "reviewBody": post.content,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || SITE_CONFIG.author
    },
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    },
    "itemReviewed": {
      "@type": "Product",
      "name": product.name,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "model": product.model,
      "image": product.image || post.image,
      "description": product.description,
      "offers": product.price ? {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": product.seller || "Various Retailers"
        }
      } : undefined
    },
    "reviewRating": post.rating ? {
      "@type": "Rating",
      "ratingValue": post.rating,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "url": canonicalUrl
  };
}

/**
 * How-To Schema Template
 * For tutorial and guide articles
 */
export function createHowToSchema(post, steps, canonicalUrl) {
  if (!post || !steps) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": post.excerpt || post.seo?.description,
    "image": post.image,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "0"
    },
    "totalTime": "PT30M", // 30 minutes default
    "supply": steps.supplies || [],
    "tool": steps.tools || [],
    "step": steps.instructions?.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.description,
      "image": step.image,
      "url": `${canonicalUrl}#step-${index + 1}`
    })) || [],
    "author": {
      "@type": "Person", 
      "name": post.author || SITE_CONFIG.author
    },
    "datePublished": new Date(post.publishedAt).toISOString(),
    "url": canonicalUrl
  };
}

/**
 * Video Object Schema Template
 * For posts with embedded videos
 */
export function createVideoSchema(post, video, canonicalUrl) {
  if (!post || !video) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || post.title,
    "description": video.description || post.excerpt,
    "thumbnailUrl": video.thumbnail || post.image,
    "uploadDate": new Date(post.publishedAt).toISOString(),
    "duration": video.duration || "PT5M", // 5 minutes default
    "contentUrl": video.url,
    "embedUrl": video.embedUrl,
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    },
    "author": {
      "@type": "Person",
      "name": post.author || SITE_CONFIG.author
    }
  };
}

/**
 * Combine multiple schemas into a single JSON-LD
 */
export function combineSchemas(...schemas) {
  const validSchemas = schemas.filter(schema => schema !== null && schema !== undefined);
  
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];
  
  return {
    "@context": "https://schema.org",
    "@graph": validSchemas
  };
}

/**
 * Generate comprehensive structured data for a blog post
 */
export function generateBlogStructuredData(post, canonicalUrl, options = {}) {
  const schemas = [];
  
  // Always include Organization
  schemas.push(createOrganizationSchema());
  
  // Choose appropriate article type
  if (options.isNews || post.category === 'news') {
    schemas.push(createNewsArticleSchema(post, canonicalUrl));
  } else {
    schemas.push(createBlogPostingSchema(post, canonicalUrl));
  }
  
  // Add breadcrumbs if provided
  if (options.breadcrumbs) {
    schemas.push(createBreadcrumbSchema(options.breadcrumbs));
  }
  
  // Add product review if it's a product post
  if (options.product) {
    schemas.push(createProductReviewSchema(post, options.product, canonicalUrl));
  }
  
  // Add How-To if it's a tutorial
  if (options.howTo) {
    schemas.push(createHowToSchema(post, options.howTo, canonicalUrl));
  }
  
  // Add Video if there are videos
  if (options.video) {
    schemas.push(createVideoSchema(post, options.video, canonicalUrl));
  }
  
  // Add FAQ if there are FAQs
  if (options.faqs) {
    schemas.push(createFAQSchema(options.faqs));
  }
  
  return combineSchemas(...schemas);
}