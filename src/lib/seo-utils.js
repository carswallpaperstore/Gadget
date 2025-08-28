/**
 * SEO UTILITY FUNCTIONS
 * =====================
 * 
 * This file contains all SEO-related utility functions for:
 * - Canonical URL generation
 * - Meta description optimization  
 * - Schema.org structured data
 * - Open Graph optimization
 * - Core Web Vitals helpers
 */

// Website configuration - CANONICAL URL SETTINGS
export const SITE_CONFIG = {
  name: "TechGuru India",
  domain: "https://www.techguruindia.co.in", // IMPORTANT: No trailing slash for consistency
  description: "भारत की सबसे तेज़ और सटीक गैजेट न्यूज़। मोबाइल, लैपटॉप, कैमरा और स्मार्ट गैजेट्स की ताजा जानकारी।",
  defaultImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80",
  author: "TechGuru India Team",
  twitterHandle: "@TechGuruIndia",
  language: "hi-IN",
  locale: "hi_IN",
  // Canonical URL rules
  canonicalRules: {
    alwaysLowercase: true,
    noTrailingSlash: true,
    noQueryParams: true,
    httpsOnly: true
  }
};

/**
 * Normalize URL path to prevent duplicates
 * Removes trailing slashes, converts to lowercase, removes query params
 */
export function normalizeUrlPath(path = "") {
  if (!path) return "";
  
  let normalized = String(path)
    .trim()
    .toLowerCase()
    // Remove query parameters and fragments
    .split('?')[0]
    .split('#')[0]
    // Remove leading and trailing slashes
    .replace(/^\/+|\/+$/g, '')
    // Replace multiple slashes with single slash
    .replace(/\/+/g, '/')
    // Remove invalid characters for URLs
    .replace(/[^a-z0-9\-\/]/g, '-')
    // Remove multiple consecutive dashes
    .replace(/-+/g, '-')
    // Remove leading/trailing dashes
    .replace(/^-+|-+$/g, '');
  
  return normalized;
}

/**
 * Generate canonical URL from path
 * Ensures all URLs are absolute and consistent
 */
export function generateCanonicalUrl(path = "") {
  // Normalize the path first
  const cleanPath = normalizeUrlPath(path);
  
  // For empty path, return domain only (always without trailing slash)
  if (!cleanPath) return SITE_CONFIG.domain;
  
  return `${SITE_CONFIG.domain}/${cleanPath}`;
}

/**
 * Generate blog post canonical URL from slug
 * Always uses /blog/slug pattern for consistency
 */
export function generateBlogCanonicalUrl(slug) {
  if (!slug) return SITE_CONFIG.domain;
  
  // Normalize slug to prevent duplicate URLs
  const normalizedSlug = normalizeUrlPath(slug);
  if (!normalizedSlug) return SITE_CONFIG.domain;
  
  return `${SITE_CONFIG.domain}/blog/${normalizedSlug}`;
}

/**
 * Optimize meta description for Google Discover and Search
 * - Keeps under 160 characters
 * - Removes newlines and extra spaces
 * - Ensures engaging content for Discover
 */
export function optimizeMetaDescription(text, maxLength = 155) {
  if (!text) return SITE_CONFIG.description;
  
  // Clean the text
  const cleaned = text
    .replace(/\n/g, " ")           // Replace newlines with spaces
    .replace(/\s+/g, " ")          // Replace multiple spaces with single space
    .trim();                       // Remove leading/trailing whitespace
  
  // Truncate if too long, but try to end at word boundary
  if (cleaned.length <= maxLength) return cleaned;
  
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  
  // If there's a space near the end, cut there, otherwise just truncate
  return lastSpace > maxLength - 20 
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

/**
 * Generate optimized page title for SEO
 * Format: Page Title | Site Name
 */
export function generatePageTitle(title, includeSiteName = true) {
  if (!title) return SITE_CONFIG.name;
  
  return includeSiteName 
    ? `${title} | ${SITE_CONFIG.name}`
    : title;
}

/**
 * Generate structured data for Website schema
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.domain,
    "inLanguage": SITE_CONFIG.language,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.domain,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.domain}/logo.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_CONFIG.domain}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate structured data for Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.domain,
    "logo": `${SITE_CONFIG.domain}/logo.png`,
    "description": SITE_CONFIG.description,
    "sameAs": [
      "https://twitter.com/TechGuruIndia",
      "https://facebook.com/TechGuruIndia",
      "https://instagram.com/TechGuruIndia"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": `${SITE_CONFIG.domain}/contact`
    }
  };
}

/**
 * Generate structured data for BlogPosting schema
 */
export function generateBlogPostSchema(post, canonicalUrl) {
  if (!post) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle", // NewsArticle for better Google Discover eligibility
    "headline": post.title,
    "description": optimizeMetaDescription(post.excerpt || post.content),
    "image": [post.image],
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author || SITE_CONFIG.author
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.domain}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "url": canonicalUrl,
    "inLanguage": SITE_CONFIG.language,
    "articleSection": post.category || "Technology",
    "keywords": post.seo?.keywords || [],
    // Google Discover optimization
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".article-content"]
    }
  };
}

/**
 * Generate Open Graph data optimized for social sharing
 */
export function generateOpenGraphData(data = {}) {
  const {
    title = SITE_CONFIG.name,
    description = SITE_CONFIG.description,
    image = SITE_CONFIG.defaultImage,
    url = SITE_CONFIG.domain,
    type = "website",
    siteName = SITE_CONFIG.name
  } = data;

  return {
    "og:title": title,
    "og:description": optimizeMetaDescription(description),
    "og:image": image,
    "og:url": url,
    "og:type": type,
    "og:site_name": siteName,
    "og:locale": SITE_CONFIG.locale,
    // Twitter Card data
    "twitter:card": "summary_large_image",
    "twitter:site": SITE_CONFIG.twitterHandle,
    "twitter:creator": SITE_CONFIG.twitterHandle,
    "twitter:title": title,
    "twitter:description": optimizeMetaDescription(description),
    "twitter:image": image
  };
}

/**
 * Generate hreflang links for multilingual SEO
 */
export function generateHreflangData(canonicalUrl) {
  return [
    {
      rel: "alternate",
      hreflang: "hi-IN",
      href: canonicalUrl
    },
    {
      rel: "alternate", 
      hreflang: "en-IN",
      href: canonicalUrl
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: canonicalUrl
    }
  ];
}

/**
 * Extract keywords from content for SEO
 */
export function extractKeywords(content, title) {
  if (!content && !title) return [];
  
  const text = `${title || ""} ${content || ""}`.toLowerCase();
  const keywords = [];
  
  // Common tech keywords in Hindi/English
  const techKeywords = [
    "smartphone", "mobile", "फोन", "स्मार्टफोन",
    "camera", "कैमरा", "battery", "बैटरी",
    "processor", "प्रोसेसर", "display", "डिस्प्ले",
    "5g", "tech", "technology", "गैजेट", "gadget",
    "review", "रिव्यू", "price", "कीमत", "launch", "लॉन्च"
  ];
  
  techKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Core Web Vitals optimization helpers
 */
export const coreWebVitals = {
  // Preload critical resources
  preloadCriticalResources() {
    const links = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "dns-prefetch", href: "https://analytics.google.com" }
    ];
    
    return links;
  },
  
  // Generate critical CSS for above-the-fold content
  getCriticalCSS() {
    return `
      /* Critical CSS for Core Web Vitals */
      body { font-family: system-ui, -apple-system, sans-serif; }
      .hero-section { min-height: 400px; }
      .blog-card img { aspect-ratio: 16/9; object-fit: cover; }
    `;
  }
};

/**
 * Generate unique content identifiers to prevent duplicates
 */
export function generateContentHash(title, description) {
  const content = `${title || ''}|${description || ''}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Check if content is unique across posts
 */
export function validateContentUniqueness(currentPost, allPosts = []) {
  const issues = [];
  const currentHash = generateContentHash(currentPost.title, currentPost.description);
  
  allPosts.forEach(post => {
    if (post.id !== currentPost.id) {
      // Check for identical titles
      if (post.title && currentPost.title && 
          post.title.toLowerCase().trim() === currentPost.title.toLowerCase().trim()) {
        issues.push(`Duplicate title found in post ${post.id}: "${post.title}"`);
      }
      
      // Check for identical descriptions
      if (post.description && currentPost.description &&
          post.description.toLowerCase().trim() === currentPost.description.toLowerCase().trim()) {
        issues.push(`Duplicate description found in post ${post.id}`);
      }
      
      // Check for identical slugs
      if (post.slug && currentPost.slug &&
          normalizeUrlPath(post.slug) === normalizeUrlPath(currentPost.slug)) {
        issues.push(`Duplicate slug found in post ${post.id}: "${post.slug}"`);
      }
      
      // Check for very similar content hashes
      const postHash = generateContentHash(post.title, post.description);
      if (postHash === currentHash) {
        issues.push(`Very similar content found in post ${post.id}`);
      }
    }
  });
  
  return {
    isUnique: issues.length === 0,
    issues,
    contentHash: currentHash
  };
}

/**
 * Validate canonical URL format
 */
export function validateCanonicalUrl(url) {
  const issues = [];
  
  if (!url) {
    issues.push("Canonical URL is required");
    return { isValid: false, issues };
  }
  
  // Must start with https://
  if (!url.startsWith('https://')) {
    issues.push("Canonical URL must use HTTPS");
  }
  
  // Must match domain
  if (!url.startsWith(SITE_CONFIG.domain)) {
    issues.push(`Canonical URL must start with ${SITE_CONFIG.domain}`);
  }
  
  // Check for trailing slash (should not have one except for root)
  if (url !== SITE_CONFIG.domain && url.endsWith('/')) {
    issues.push("Canonical URL should not have trailing slash (except root domain)");
  }
  
  // Check for query parameters
  if (url.includes('?') || url.includes('#')) {
    issues.push("Canonical URL should not contain query parameters or fragments");
  }
  
  // Check for uppercase characters
  if (url !== url.toLowerCase()) {
    issues.push("Canonical URL should be lowercase");
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    normalizedUrl: normalizeCanonicalUrl(url)
  };
}

/**
 * Normalize canonical URL to prevent duplicates
 */
export function normalizeCanonicalUrl(url) {
  if (!url) return SITE_CONFIG.domain;
  
  // Extract path from URL
  const urlObj = new URL(url.startsWith('http') ? url : `${SITE_CONFIG.domain}/${url}`);
  const path = urlObj.pathname;
  
  // Normalize path
  const normalizedPath = normalizeUrlPath(path);
  
  // Return canonical URL
  return normalizedPath ? `${SITE_CONFIG.domain}/${normalizedPath}` : SITE_CONFIG.domain;
}

/**
 * Validate SEO data with enhanced checks
 */
export function validateSEOData(data, allPosts = []) {
  const issues = [];
  
  // Basic validation
  if (!data.title || data.title.length < 10) {
    issues.push("Title should be at least 10 characters");
  }
  
  if (!data.description || data.description.length < 50) {
    issues.push("Description should be at least 50 characters");
  }
  
  if (data.title && data.title.length > 60) {
    issues.push("Title should be under 60 characters for Google");
  }
  
  if (data.description && data.description.length > 160) {
    issues.push("Description should be under 160 characters for Google");
  }
  
  // Canonical URL validation
  const canonicalValidation = validateCanonicalUrl(data.canonicalUrl);
  if (!canonicalValidation.isValid) {
    issues.push(...canonicalValidation.issues);
  }
  
  // Content uniqueness validation
  if (allPosts.length > 0) {
    const uniquenessValidation = validateContentUniqueness(data, allPosts);
    if (!uniquenessValidation.isUnique) {
      issues.push(...uniquenessValidation.issues);
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    canonicalUrl: canonicalValidation.normalizedUrl,
    contentHash: data.title && data.description ? generateContentHash(data.title, data.description) : null
  };
}