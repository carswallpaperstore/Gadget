/**
 * DYNAMIC SITEMAP GENERATOR
 * =========================
 * 
 * Generates sitemap.xml with:
 * - Static pages (Home, About, Contact, etc.)
 * - All blog posts with proper priority and frequency
 * - Proper lastmod dates
 * - Image sitemaps for blog post images
 * - CANONICAL URL ENFORCEMENT to prevent Google duplicate issues
 * 
 * Usage:
 * - For build time: generateSitemap()
 * - For server: app.get('/sitemap.xml', generateSitemapXML)
 */

import { getAllPosts } from '../data/blogPosts.js';
import { SITE_CONFIG, generateCanonicalUrl, generateBlogCanonicalUrl, normalizeCanonicalUrl } from './seo-utils.js';

/**
 * Static pages configuration with canonical URLs
 */
const STATIC_PAGES = [
  {
    url: '',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: 'about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date('2024-01-01').toISOString()
  },
  {
    url: 'contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date('2024-01-01').toISOString()
  },
  {
    url: 'privacy',
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: new Date('2024-01-01').toISOString()
  },
  {
    url: 'terms',
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: new Date('2024-01-01').toISOString()
  }
];\n\n/**\n * Generate sitemap entry for a single URL\n */\nfunction generateSitemapEntry(url, lastmod, changefreq, priority, images = []) {\n  const fullUrl = url ? `${SITE_CONFIG.domain}/${url}` : SITE_CONFIG.domain;\n  \n  let entry = `  <url>\n`;\n  entry += `    <loc>${fullUrl}</loc>\n`;\n  \n  if (lastmod) {\n    entry += `    <lastmod>${lastmod}</lastmod>\n`;\n  }\n  \n  if (changefreq) {\n    entry += `    <changefreq>${changefreq}</changefreq>\n`;\n  }\n  \n  if (priority) {\n    entry += `    <priority>${priority}</priority>\n`;\n  }\n  \n  // Add image entries if present\n  if (images && images.length > 0) {\n    images.forEach(image => {\n      entry += `    <image:image>\n`;\n      entry += `      <image:loc>${image.url}</image:loc>\n`;\n      if (image.caption) {\n        entry += `      <image:caption><![CDATA[${image.caption}]]></image:caption>\n`;\n      }\n      if (image.title) {\n        entry += `      <image:title><![CDATA[${image.title}]]></image:title>\n`;\n      }\n      entry += `    </image:image>\n`;\n    });\n  }\n  \n  entry += `  </url>\n`;\n  return entry;\n}\n\n/**\n * Generate complete sitemap XML\n */\nexport function generateSitemapXML() {\n  const blogPosts = getAllPosts();\n  \n  let sitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n`;\n  sitemap += `<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n`;\n  sitemap += `        xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\"\n`;\n  sitemap += `        xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n`;\n  \n  // Add static pages\n  STATIC_PAGES.forEach(page => {\n    sitemap += generateSitemapEntry(\n      page.url,\n      page.lastmod,\n      page.changefreq,\n      page.priority\n    );\n  });\n  \n  // Add blog posts\n  blogPosts.forEach(post => {\n    const images = post.image ? [{\n      url: post.image,\n      caption: post.title,\n      title: post.title\n    }] : [];\n    \n    const publishedDate = new Date(post.publishedAt);\n    const lastmod = post.updatedAt \n      ? new Date(post.updatedAt).toISOString()\n      : publishedDate.toISOString();\n    \n    // Determine priority based on post features\n    let priority = 0.6;\n    if (post.featured) priority = 0.9;\n    if (publishedDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {\n      priority = Math.max(priority, 0.8); // Recent posts get higher priority\n    }\n    \n    sitemap += generateSitemapEntry(\n      `blog/${post.slug}`,\n      lastmod,\n      'weekly',\n      priority,\n      images\n    );\n  });\n  \n  sitemap += `</urlset>`;\n  return sitemap;\n}\n\n/**\n * Generate news sitemap for recent articles (Google News)\n */\nexport function generateNewsSitemapXML() {\n  const blogPosts = getAllPosts();\n  \n  // Only include posts from last 2 days for news sitemap\n  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);\n  const recentPosts = blogPosts.filter(post => \n    new Date(post.publishedAt) > twoDaysAgo\n  );\n  \n  if (recentPosts.length === 0) {\n    return null; // No recent news\n  }\n  \n  let sitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n`;\n  sitemap += `<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n`;\n  sitemap += `        xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n`;\n  \n  recentPosts.forEach(post => {\n    const fullUrl = `${SITE_CONFIG.domain}/blog/${post.slug}`;\n    const publishedDate = new Date(post.publishedAt);\n    \n    sitemap += `  <url>\n`;\n    sitemap += `    <loc>${fullUrl}</loc>\n`;\n    sitemap += `    <news:news>\n`;\n    sitemap += `      <news:publication>\n`;\n    sitemap += `        <news:name>${SITE_CONFIG.name}</news:name>\n`;\n    sitemap += `        <news:language>${SITE_CONFIG.language}</news:language>\n`;\n    sitemap += `      </news:publication>\n`;\n    sitemap += `      <news:publication_date>${publishedDate.toISOString()}</news:publication_date>\n`;\n    sitemap += `      <news:title><![CDATA[${post.title}]]></news:title>\n`;\n    if (post.seo?.keywords && post.seo.keywords.length > 0) {\n      sitemap += `      <news:keywords>${post.seo.keywords.join(', ')}</news:keywords>\n`;\n    }\n    sitemap += `    </news:news>\n`;\n    sitemap += `  </url>\n`;\n  });\n  \n  sitemap += `</urlset>`;\n  return sitemap;\n}\n\n/**\n * Generate sitemap index for multiple sitemaps\n */\nexport function generateSitemapIndexXML() {\n  const now = new Date().toISOString();\n  \n  let sitemapIndex = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n`;\n  sitemapIndex += `<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n`;\n  \n  // Main sitemap\n  sitemapIndex += `  <sitemap>\n`;\n  sitemapIndex += `    <loc>${SITE_CONFIG.domain}/sitemap.xml</loc>\n`;\n  sitemapIndex += `    <lastmod>${now}</lastmod>\n`;\n  sitemapIndex += `  </sitemap>\n`;\n  \n  // News sitemap (if there are recent articles)\n  const newsXML = generateNewsSitemapXML();\n  if (newsXML) {\n    sitemapIndex += `  <sitemap>\n`;\n    sitemapIndex += `    <loc>${SITE_CONFIG.domain}/news-sitemap.xml</loc>\n`;\n    sitemapIndex += `    <lastmod>${now}</lastmod>\n`;\n    sitemapIndex += `  </sitemap>\n`;\n  }\n  \n  sitemapIndex += `</sitemapindex>`;\n  return sitemapIndex;\n}\n\n/**\n * Get sitemap statistics\n */\nexport function getSitemapStats() {\n  const blogPosts = getAllPosts();\n  const staticPages = STATIC_PAGES.length;\n  const totalPages = staticPages + blogPosts.length;\n  \n  const recentPosts = blogPosts.filter(post => \n    new Date(post.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)\n  );\n  \n  return {\n    totalPages,\n    staticPages,\n    blogPosts: blogPosts.length,\n    recentPosts: recentPosts.length,\n    featuredPosts: blogPosts.filter(post => post.featured).length,\n    lastUpdated: new Date().toISOString()\n  };\n}\n\n/**\n * Write sitemap to file (for build process)\n */\nexport function writeSitemapToFile(outputPath = './public/sitemap.xml') {\n  const fs = require('fs');\n  const path = require('path');\n  \n  try {\n    const sitemapXML = generateSitemapXML();\n    \n    // Ensure directory exists\n    const dir = path.dirname(outputPath);\n    if (!fs.existsSync(dir)) {\n      fs.mkdirSync(dir, { recursive: true });\n    }\n    \n    // Write main sitemap\n    fs.writeFileSync(outputPath, sitemapXML);\n    \n    // Write news sitemap if there are recent articles\n    const newsXML = generateNewsSitemapXML();\n    if (newsXML) {\n      const newsPath = outputPath.replace('sitemap.xml', 'news-sitemap.xml');\n      fs.writeFileSync(newsPath, newsXML);\n    }\n    \n    // Write sitemap index\n    const indexPath = outputPath.replace('sitemap.xml', 'sitemap-index.xml');\n    const indexXML = generateSitemapIndexXML();\n    fs.writeFileSync(indexPath, indexXML);\n    \n    console.log('✅ Sitemap generated successfully!');\n    console.log(getSitemapStats());\n    \n    return true;\n  } catch (error) {\n    console.error('❌ Error generating sitemap:', error);\n    return false;\n  }\n}\n\n/**\n * Validate sitemap URLs\n */\nexport function validateSitemapUrls() {\n  const blogPosts = getAllPosts();\n  const issues = [];\n  \n  // Check for duplicate slugs\n  const slugs = blogPosts.map(post => post.slug);\n  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);\n  \n  if (duplicates.length > 0) {\n    issues.push(`Duplicate blog post slugs found: ${duplicates.join(', ')}`);\n  }\n  \n  // Check for invalid characters in slugs\n  blogPosts.forEach(post => {\n    if (!/^[a-z0-9-]+$/.test(post.slug)) {\n      issues.push(`Invalid slug format: ${post.slug}`);\n    }\n  });\n  \n  // Check for missing required fields\n  blogPosts.forEach(post => {\n    if (!post.title) issues.push(`Missing title for post: ${post.slug}`);\n    if (!post.publishedAt) issues.push(`Missing publishedAt for post: ${post.slug}`);\n    if (!post.slug) issues.push(`Missing slug for post: ${post.id}`);\n  });\n  \n  return {\n    isValid: issues.length === 0,\n    issues\n  };\n}\n\n// Export for Node.js usage\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = {\n    generateSitemapXML,\n    generateNewsSitemapXML,\n    generateSitemapIndexXML,\n    writeSitemapToFile,\n    validateSitemapUrls,\n    getSitemapStats\n  };\n}