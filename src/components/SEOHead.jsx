import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { 
  generateCanonicalUrl, 
  generateBlogCanonicalUrl,
  normalizeCanonicalUrl,
  validateCanonicalUrl,
  normalizeUrlPath,
  optimizeMetaDescription,
  generatePageTitle,
  generateOpenGraphData,
  generateHreflangData,
  coreWebVitals,
  SITE_CONFIG
} from '../lib/seo-utils.js';
import { 
  createWebsiteSchema,
  createOrganizationSchema,
  generateBlogStructuredData,
  combineSchemas
} from '../lib/structured-data.js';

/**
 * ADVANCED SEO HEAD COMPONENT
 * ===========================
 * 
 * Comprehensive SEO solution featuring:
 * ✅ Dynamic canonical URLs (no duplicates)
 * ✅ Optimized meta tags for Google Discover
 * ✅ Complete Open Graph & Twitter Cards
 * ✅ Rich structured data (JSON-LD)
 * ✅ Core Web Vitals optimization
 * ✅ Multilingual hreflang support
 * ✅ SSR compatibility with React Helmet
 * ✅ Google Search Console validation ready
 * 
 * Usage:
 * <SEOHead 
 *   title="Page Title"
 *   description="Page description"
 *   canonical="/blog/post-slug"
 *   type="article"
 *   post={blogPostData}
 * />
 */
export default function SEOHead({
  // Basic meta data
  title,
  description,
  image = SITE_CONFIG.defaultImage,
  keywords = [],
  
  // URL and canonical settings
  canonical,
  url,
  type = 'website',
  
  // Structured data
  structuredData,
  post, // Blog post data for automatic schema generation
  
  // Advanced options
  noIndex = false,
  noFollow = false,
  robots,
  
  // Social sharing
  twitterCard = 'summary_large_image',
  
  // Schema options
  breadcrumbs,
  faqs,
  product,
  video,
  howTo,
  
  // Custom meta tags
  customMeta = [],
  
  // Core Web Vitals
  preloadResources = true,
  criticalCSS = false
}) {
  const [location] = useLocation();
  
  // Generate canonical URL with strict normalization
  let canonicalUrl;
  
  if (canonical) {
    // If canonical is provided, normalize it
    canonicalUrl = canonical.startsWith('http') 
      ? normalizeCanonicalUrl(canonical) 
      : generateCanonicalUrl(canonical);
  } else if (post?.slug) {
    // For blog posts, always use the blog canonical pattern
    canonicalUrl = generateBlogCanonicalUrl(post.slug);
  } else {
    // For other pages, generate from current location
    const currentPath = location || '';
    canonicalUrl = generateCanonicalUrl(currentPath);
  }
  
  // Validate canonical URL to ensure compliance
  const canonicalValidation = validateCanonicalUrl(canonicalUrl);
  if (!canonicalValidation.isValid) {
    console.warn('Canonical URL validation issues:', canonicalValidation.issues);
    canonicalUrl = canonicalValidation.normalizedUrl || SITE_CONFIG.domain;
  }
  
  // Optimize meta data
  const pageTitle = generatePageTitle(title || post?.title || post?.seo?.title, !title?.includes('|'));
  const metaDescription = optimizeMetaDescription(
    description || post?.excerpt || post?.seo?.description || post?.content
  );
  
  // Generate Open Graph data with canonical URL consistency
  const ogData = generateOpenGraphData({
    title: pageTitle,
    description: metaDescription,
    image: image || post?.image,
    url: canonicalUrl, // Always use the validated canonical URL
    type: type === 'article' ? 'article' : 'website'
  });
  
  // Generate hreflang data
  const hreflangData = generateHreflangData(canonicalUrl);
  
  // Generate structured data
  let finalStructuredData = structuredData;
  
  if (!finalStructuredData) {
    if (post) {
      // Generate blog post structured data
      finalStructuredData = generateBlogStructuredData(post, canonicalUrl, {
        isNews: type === 'article',
        breadcrumbs,
        product,
        video,
        howTo,
        faqs
      });
    } else if (type === 'website') {
      // Generate website structured data
      finalStructuredData = combineSchemas(
        createWebsiteSchema({ url: canonicalUrl }),
        createOrganizationSchema()
      );
    }
  }
  
  // Robots meta tag
  const robotsContent = robots || (
    noIndex || noFollow 
      ? `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`
      : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
  );
  
  // Generate keywords string
  const keywordsString = Array.isArray(keywords) 
    ? keywords.join(', ')
    : (post?.seo?.keywords?.join(', ') || '');
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Locale */}
      <html lang={SITE_CONFIG.language} />
      <meta name="language" content={SITE_CONFIG.language} />
      
      {/* Hreflang Tags */}
      {hreflangData.map((hreflang, index) => (
        <link 
          key={index}
          rel={hreflang.rel}
          hrefLang={hreflang.hreflang}
          href={hreflang.href}
        />
      ))}
      
      {/* Open Graph Tags */}
      {Object.entries(ogData).map(([property, content]) => {
        if (property.startsWith('og:')) {
          return <meta key={property} property={property} content={content} />;
        } else if (property.startsWith('twitter:')) {
          return <meta key={property} name={property} content={content} />;
        }
        return null;
      })}
      
      {/* Article specific tags */}
      {type === 'article' && post && (
        <>
          <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />
          {post.updatedAt && (
            <meta property="article:modified_time" content={new Date(post.updatedAt).toISOString()} />
          )}
          <meta property="article:author" content={post.author || SITE_CONFIG.author} />
          {post.category && <meta property="article:section" content={post.category} />}
          {post.seo?.keywords?.map(keyword => (
            <meta key={keyword} property="article:tag" content={keyword} />
          ))}
        </>
      )}
      
      {/* Google Discover Optimization */}
      <meta name="news_keywords" content={keywordsString} />
      <meta name="syndication-source" content={canonicalUrl} />
      <meta name="original-source" content={canonicalUrl} />
      
      {/* Mobile and Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="theme-color" content="#000000" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Core Web Vitals Optimization */}
      {preloadResources && coreWebVitals.preloadCriticalResources().map((resource, index) => (
        <link 
          key={index}
          rel={resource.rel}
          href={resource.href}
          crossOrigin={resource.crossOrigin}
        />
      ))}
      
      {/* Critical CSS */}
      {criticalCSS && (
        <style type="text/css">
          {coreWebVitals.getCriticalCSS()}
        </style>
      )}
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Structured Data (JSON-LD) */}
      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData, null, 0)}
        </script>
      )}
    </Helmet>
  );
}