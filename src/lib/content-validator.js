/**
 * CONTENT VALIDATION UTILITY
 * ===========================
 * 
 * Validates blog posts and pages for:
 * - Unique titles and descriptions
 * - SEO compliance
 * - Canonical URL consistency
 * - Prevents Google's "Duplicate canonical" errors
 */

import { 
  validateSEOData, 
  validateContentUniqueness, 
  generateContentHash, 
  normalizeUrlPath 
} from './seo-utils.js';
import { getAllPosts } from '../data/blogPosts.js';

/**
 * Validate a single blog post for uniqueness and SEO compliance
 */
export function validateBlogPost(post, allPosts = []) {
  const issues = [];
  const warnings = [];
  
  // Basic field validation
  if (!post.id) issues.push("Post missing required 'id' field");
  if (!post.slug) issues.push("Post missing required 'slug' field");
  if (!post.title) issues.push("Post missing required 'title' field");
  if (!post.content) issues.push("Post missing required 'content' field");
  if (!post.publishedAt) issues.push("Post missing required 'publishedAt' field");
  
  // Slug format validation
  if (post.slug && !/^[a-z0-9-]+$/.test(post.slug)) {
    issues.push(`Invalid slug format: "${post.slug}". Use only lowercase letters, numbers, and hyphens.`);
  }
  
  // Title validation
  if (post.title) {
    if (post.title.length < 10) warnings.push("Title should be at least 10 characters for better SEO");
    if (post.title.length > 60) warnings.push("Title should be under 60 characters for Google search results");
  }
  
  // Content validation
  if (post.content && post.content.length < 100) {
    warnings.push("Content should be at least 100 characters for better SEO value");
  }
  
  // Excerpt validation
  if (post.excerpt) {
    if (post.excerpt.length > 160) {
      warnings.push("Excerpt should be under 160 characters for meta description");
    }
  } else {
    warnings.push("Missing excerpt - consider adding one for better SEO");
  }
  
  // SEO field validation
  if (post.seo) {
    if (post.seo.title && post.seo.title.length > 60) {
      warnings.push("SEO title should be under 60 characters");
    }
    if (post.seo.description && post.seo.description.length > 160) {
      warnings.push("SEO description should be under 160 characters");
    }
    if (!post.seo.keywords || post.seo.keywords.length === 0) {
      warnings.push("Missing SEO keywords - add relevant keywords for better discoverability");
    }
  } else {
    warnings.push("Missing SEO configuration - consider adding SEO title, description, and keywords");
  }
  
  // Image validation
  if (!post.image) {
    warnings.push("Missing featured image - images improve engagement and social sharing");
  } else if (!post.image.startsWith('http')) {
    issues.push("Image URL should be absolute (start with http/https)");
  }
  
  // Author validation
  if (!post.author) {
    warnings.push("Missing author field - consider adding for better attribution");
  }
  
  // Content uniqueness validation
  if (allPosts.length > 0) {
    const uniquenessResult = validateContentUniqueness(post, allPosts);
    if (!uniquenessResult.isUnique) {
      issues.push(...uniquenessResult.issues);
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    warnings,
    postId: post.id,
    postSlug: post.slug
  };
}

/**
 * Validate all blog posts for consistency and uniqueness
 */
export function validateAllBlogPosts() {
  const allPosts = getAllPosts();
  const results = [];
  const globalIssues = [];
  const slugMap = new Map();
  const titleMap = new Map();
  const contentHashes = new Map();
  
  // First pass: collect data and check for global duplicates
  allPosts.forEach(post => {
    // Check for duplicate slugs
    if (post.slug) {
      const normalizedSlug = normalizeUrlPath(post.slug);
      if (slugMap.has(normalizedSlug)) {
        globalIssues.push(`Duplicate slug "${normalizedSlug}" found in posts: ${slugMap.get(normalizedSlug).id} and ${post.id}`);
      } else {
        slugMap.set(normalizedSlug, post);
      }
    }
    
    // Check for duplicate titles
    if (post.title) {
      const normalizedTitle = post.title.toLowerCase().trim();
      if (titleMap.has(normalizedTitle)) {
        globalIssues.push(`Duplicate title found in posts: ${titleMap.get(normalizedTitle).id} and ${post.id}`);
      } else {
        titleMap.set(normalizedTitle, post);
      }
    }
    
    // Check for similar content
    if (post.title && post.excerpt) {
      const contentHash = generateContentHash(post.title, post.excerpt);
      if (contentHashes.has(contentHash)) {
        globalIssues.push(`Very similar content found in posts: ${contentHashes.get(contentHash).id} and ${post.id}`);
      } else {
        contentHashes.set(contentHash, post);
      }
    }
  });
  
  // Second pass: validate individual posts
  allPosts.forEach(post => {
    const validation = validateBlogPost(post, allPosts);
    results.push(validation);
  });
  
  // Summary
  const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0) + globalIssues.length;
  const totalWarnings = results.reduce((sum, result) => sum + result.warnings.length, 0);
  const validPosts = results.filter(result => result.isValid).length;
  
  return {
    isValid: totalIssues === 0,
    totalPosts: allPosts.length,
    validPosts,
    invalidPosts: allPosts.length - validPosts,
    totalIssues,
    totalWarnings,
    globalIssues,
    postResults: results,
    summary: {
      duplicateSlugs: slugMap.size < allPosts.length,
      duplicateTitles: titleMap.size < allPosts.length,
      similarContent: contentHashes.size < allPosts.length
    }
  };
}

/**
 * Check for potential SEO issues across the site
 */
export function validateSiteStructure() {
  const allPosts = getAllPosts();
  const issues = [];
  const warnings = [];
  
  // Check for adequate content volume
  if (allPosts.length < 5) {
    warnings.push("Consider having at least 5 blog posts for better site authority");
  }
  
  // Check for recent content
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentPosts = allPosts.filter(post => new Date(post.publishedAt) > thirtyDaysAgo);
  
  if (recentPosts.length === 0) {
    warnings.push("No posts published in the last 30 days - consider publishing fresh content regularly");
  }
  
  // Check for featured posts
  const featuredPosts = allPosts.filter(post => post.featured);
  if (featuredPosts.length === 0) {
    warnings.push("No featured posts found - consider marking important posts as featured");
  } else if (featuredPosts.length > 5) {
    warnings.push("Too many featured posts - consider limiting to 3-5 for better focus");
  }
  
  // Check category distribution
  const categories = new Set(allPosts.map(post => post.category).filter(Boolean));
  if (categories.size < 2) {
    warnings.push("Consider organizing posts into multiple categories for better site structure");
  }
  
  // Check for author diversity
  const authors = new Set(allPosts.map(post => post.author).filter(Boolean));
  if (authors.size === 1 && allPosts.length > 10) {
    warnings.push("Consider having multiple authors for larger blogs to add diversity");
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    warnings,
    stats: {
      totalPosts: allPosts.length,
      recentPosts: recentPosts.length,
      featuredPosts: featuredPosts.length,
      categories: categories.size,
      authors: authors.size
    }
  };
}

/**
 * Generate a comprehensive SEO report
 */
export function generateSEOReport() {
  const blogValidation = validateAllBlogPosts();
  const siteValidation = validateSiteStructure();
  
  const report = {
    timestamp: new Date().toISOString(),
    overallHealth: blogValidation.isValid && siteValidation.isValid ? 'GOOD' : 
                   blogValidation.totalIssues === 0 ? 'WARNING' : 'CRITICAL',
    
    summary: {
      totalPosts: blogValidation.totalPosts,
      validPosts: blogValidation.validPosts,
      totalIssues: blogValidation.totalIssues + siteValidation.issues.length,
      totalWarnings: blogValidation.totalWarnings + siteValidation.warnings.length
    },
    
    contentValidation: blogValidation,
    siteValidation: siteValidation,
    
    recommendations: []
  };
  
  // Generate recommendations
  if (blogValidation.totalIssues > 0) {
    report.recommendations.push("Fix content issues immediately to prevent SEO problems");
  }
  
  if (blogValidation.summary.duplicateSlugs) {
    report.recommendations.push("CRITICAL: Fix duplicate slugs to prevent canonical URL conflicts");
  }
  
  if (blogValidation.summary.duplicateTitles) {
    report.recommendations.push("Fix duplicate titles to improve search ranking");
  }
  
  if (siteValidation.stats.recentPosts === 0) {
    report.recommendations.push("Publish fresh content regularly to maintain SEO momentum");
  }
  
  if (blogValidation.totalWarnings > blogValidation.totalPosts * 2) {
    report.recommendations.push("Address SEO warnings to improve overall site quality");
  }
  
  return report;
}

/**
 * Export validation results to console (for debugging)
 */
export function logSEOReport() {
  const report = generateSEOReport();
  
  console.log('\n🔍 SEO VALIDATION REPORT');
  console.log('========================');
  console.log(`Overall Health: ${report.overallHealth}`);
  console.log(`Total Posts: ${report.summary.totalPosts}`);
  console.log(`Valid Posts: ${report.summary.validPosts}`);
  console.log(`Issues: ${report.summary.totalIssues}`);
  console.log(`Warnings: ${report.summary.totalWarnings}`);
  
  if (report.contentValidation.globalIssues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES:');
    report.contentValidation.globalIssues.forEach(issue => console.log(`  • ${issue}`));
  }
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    report.recommendations.forEach(rec => console.log(`  • ${rec}`));
  }
  
  console.log('\n✅ Validation complete\n');
  
  return report;
}