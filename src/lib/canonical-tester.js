/**
 * CANONICAL URL TESTING UTILITY
 * ==============================
 * 
 * Comprehensive testing for canonical URL implementation
 * Prevents Google's "Page is not indexed: Duplicate, Google chose different canonical than user" error
 */

import { 
  generateCanonicalUrl,
  generateBlogCanonicalUrl,
  normalizeCanonicalUrl,
  normalizeUrlPath,
  validateCanonicalUrl,
  SITE_CONFIG
} from './seo-utils.js';
import { generateSitemapXML, validateSitemapUrls } from './sitemap-generator.js';
import { getAllPosts } from '../data/blogPosts.js';
import { logSEOReport } from './content-validator.js';

/**
 * Test canonical URL generation consistency
 */
export function testCanonicalURLGeneration() {
  const tests = [];
  
  console.log('🧪 Testing Canonical URL Generation...');
  
  // Test home page
  const homeCanonical = generateCanonicalUrl('');
  tests.push({
    test: 'Home page canonical',
    input: '',
    expected: SITE_CONFIG.domain,
    actual: homeCanonical,
    passed: homeCanonical === SITE_CONFIG.domain
  });
  
  // Test static pages
  const staticPages = ['about', 'contact', 'privacy', 'terms'];
  staticPages.forEach(page => {
    const canonical = generateCanonicalUrl(page);
    const expected = `${SITE_CONFIG.domain}/${page}`;
    tests.push({
      test: `Static page: ${page}`,
      input: page,
      expected,
      actual: canonical,
      passed: canonical === expected
    });
  });
  
  // Test blog posts
  const sampleSlugs = ['test-post', 'another-post-slug', 'post-with-123-numbers'];
  sampleSlugs.forEach(slug => {
    const canonical = generateBlogCanonicalUrl(slug);
    const expected = `${SITE_CONFIG.domain}/blog/${slug}`;
    tests.push({
      test: `Blog post: ${slug}`,
      input: slug,
      expected,
      actual: canonical,
      passed: canonical === expected
    });
  });
  
  // Test edge cases
  const edgeCases = [
    { input: '/about/', expected: `${SITE_CONFIG.domain}/about` },
    { input: 'About', expected: `${SITE_CONFIG.domain}/about` },
    { input: '//multiple//slashes//', expected: `${SITE_CONFIG.domain}/multiple/slashes` },
    { input: 'with?query=params', expected: `${SITE_CONFIG.domain}/with-query-params` },
    { input: 'with spaces', expected: `${SITE_CONFIG.domain}/with-spaces` },
  ];\
  
  edgeCases.forEach(testCase => {
    const canonical = generateCanonicalUrl(testCase.input);
    tests.push({
      test: `Edge case: "${testCase.input}"`,
      input: testCase.input,
      expected: testCase.expected,
      actual: canonical,
      passed: canonical === testCase.expected
    });
  });
  
  const passedTests = tests.filter(t => t.passed).length;
  
  console.log(`✅ Canonical URL Generation: ${passedTests}/${tests.length} tests passed`);
  
  // Log failures
  tests.filter(t => !t.passed).forEach(test => {
    console.log(`❌ ${test.test}: Expected "${test.expected}", got "${test.actual}"`);
  });
  
  return {
    totalTests: tests.length,
    passedTests,
    failedTests: tests.length - passedTests,
    tests,
    allPassed: passedTests === tests.length
  };
}

/**
 * Test URL normalization consistency
 */
export function testURLNormalization() {
  const tests = [];
  
  console.log('🧪 Testing URL Normalization...');
  
  const normalizationTests = [
    { input: '', expected: '' },
    { input: '/', expected: '' },
    { input: 'about', expected: 'about' },
    { input: '/about/', expected: 'about' },
    { input: 'About', expected: 'about' },
    { input: 'BLOG/POST', expected: 'blog/post' },
    { input: 'path//with//multiple//slashes', expected: 'path/with/multiple/slashes' },
    { input: 'path?query=param', expected: 'path' },
    { input: 'path#fragment', expected: 'path' },
    { input: 'path with spaces', expected: 'path-with-spaces' },
    { input: 'path---with---dashes', expected: 'path-with-dashes' },
    { input: '---leading-trailing---', expected: 'leading-trailing' },
  ];
  
  normalizationTests.forEach(testCase => {
    const normalized = normalizeUrlPath(testCase.input);
    tests.push({
      test: `Normalize: "${testCase.input}"`,
      input: testCase.input,
      expected: testCase.expected,
      actual: normalized,
      passed: normalized === testCase.expected
    });
  });
  
  const passedTests = tests.filter(t => t.passed).length;
  
  console.log(`✅ URL Normalization: ${passedTests}/${tests.length} tests passed`);
  
  // Log failures
  tests.filter(t => !t.passed).forEach(test => {
    console.log(`❌ ${test.test}: Expected "${test.expected}", got "${test.actual}"`);
  });
  
  return {
    totalTests: tests.length,
    passedTests,
    failedTests: tests.length - passedTests,
    tests,
    allPassed: passedTests === tests.length
  };
}

/**
 * Test canonical URL validation
 */
export function testCanonicalValidation() {
  const tests = [];
  
  console.log('🧪 Testing Canonical URL Validation...');
  
  const validationTests = [
    { url: SITE_CONFIG.domain, shouldBeValid: true, description: 'Root domain' },
    { url: `${SITE_CONFIG.domain}/about`, shouldBeValid: true, description: 'Static page' },
    { url: `${SITE_CONFIG.domain}/blog/test-post`, shouldBeValid: true, description: 'Blog post' },
    { url: `${SITE_CONFIG.domain}/about/`, shouldBeValid: false, description: 'Trailing slash' },
    { url: `${SITE_CONFIG.domain}/About`, shouldBeValid: false, description: 'Uppercase' },
    { url: `${SITE_CONFIG.domain}/blog/test?query=param`, shouldBeValid: false, description: 'Query parameters' },
    { url: 'http://techguruindia.co.in/about', shouldBeValid: false, description: 'HTTP instead of HTTPS' },
    { url: 'https://example.com/about', shouldBeValid: false, description: 'Wrong domain' },
    { url: '', shouldBeValid: false, description: 'Empty URL' },
  ];
  
  validationTests.forEach(testCase => {
    const validation = validateCanonicalUrl(testCase.url);
    const passed = validation.isValid === testCase.shouldBeValid;
    
    tests.push({
      test: testCase.description,
      input: testCase.url,
      expected: testCase.shouldBeValid ? 'valid' : 'invalid',
      actual: validation.isValid ? 'valid' : 'invalid',
      passed,
      issues: validation.issues
    });
  });
  
  const passedTests = tests.filter(t => t.passed).length;
  
  console.log(`✅ Canonical URL Validation: ${passedTests}/${tests.length} tests passed`);
  
  // Log failures
  tests.filter(t => !t.passed).forEach(test => {
    console.log(`❌ ${test.test}: Expected ${test.expected}, got ${test.actual}`);
    if (test.issues && test.issues.length > 0) {
      test.issues.forEach(issue => console.log(`   • ${issue}`));
    }
  });
  
  return {
    totalTests: tests.length,
    passedTests,
    failedTests: tests.length - passedTests,
    tests,
    allPassed: passedTests === tests.length
  };
}

/**
 * Test blog post data for canonical URL compliance
 */
export function testBlogPostCanonicals() {
  const allPosts = getAllPosts();
  const tests = [];
  
  console.log('🧪 Testing Blog Post Canonical URLs...');
  
  allPosts.forEach(post => {
    if (!post.slug) {
      tests.push({
        test: `Post ${post.id} has slug`,
        postId: post.id,
        passed: false,
        issue: 'Missing slug'
      });
      return;
    }
    
    // Test slug format
    const slugValid = /^[a-z0-9-]+$/.test(post.slug);
    tests.push({
      test: `Post ${post.id} slug format`,
      postId: post.id,
      slug: post.slug,
      passed: slugValid,
      issue: slugValid ? null : 'Invalid slug format'
    });
    
    // Test canonical URL generation
    const canonical = generateBlogCanonicalUrl(post.slug);
    const expectedCanonical = `${SITE_CONFIG.domain}/blog/${post.slug}`;
    tests.push({
      test: `Post ${post.id} canonical URL`,
      postId: post.id,
      slug: post.slug,
      expected: expectedCanonical,
      actual: canonical,
      passed: canonical === expectedCanonical,
      issue: canonical === expectedCanonical ? null : 'Canonical URL mismatch'
    });
    
    // Test canonical validation
    const validation = validateCanonicalUrl(canonical);
    tests.push({
      test: `Post ${post.id} canonical validation`,
      postId: post.id,
      slug: post.slug,
      passed: validation.isValid,
      issue: validation.isValid ? null : validation.issues.join(', ')
    });
  });
  
  const passedTests = tests.filter(t => t.passed).length;
  
  console.log(`✅ Blog Post Canonicals: ${passedTests}/${tests.length} tests passed`);
  
  // Log failures
  tests.filter(t => !t.passed).forEach(test => {
    console.log(`❌ ${test.test}: ${test.issue}`);
  });
  
  return {
    totalTests: tests.length,
    passedTests,
    failedTests: tests.length - passedTests,
    tests,
    allPassed: passedTests === tests.length
  };
}

/**
 * Test sitemap for canonical URL consistency
 */
export function testSitemapCanonicals() {
  console.log('🧪 Testing Sitemap Canonical URLs...');
  
  // Validate sitemap URLs
  const sitemapValidation = validateSitemapUrls();
  
  // Generate sitemap and check for canonical consistency
  const sitemapXML = generateSitemapXML();
  const urlMatches = sitemapXML.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
  
  const tests = [];
  
  // Test each URL in sitemap
  urls.forEach(url => {
    const validation = validateCanonicalUrl(url);
    tests.push({
      test: `Sitemap URL: ${url}`,
      url,
      passed: validation.isValid,
      issues: validation.issues
    });
  });
  
  const passedTests = tests.filter(t => t.passed).length;
  
  console.log(`✅ Sitemap Canonical URLs: ${passedTests}/${tests.length} URLs validated`);
  
  if (!sitemapValidation.isValid) {
    console.log('❌ Sitemap validation issues:');
    sitemapValidation.issues.forEach(issue => console.log(`   • ${issue}`));
  }
  
  // Log failures
  tests.filter(t => !t.passed).forEach(test => {
    console.log(`❌ ${test.test}:`);
    test.issues.forEach(issue => console.log(`   • ${issue}`));
  });
  
  return {
    totalTests: tests.length,
    passedTests,
    failedTests: tests.length - passedTests,
    sitemapValidation,
    tests,
    allPassed: passedTests === tests.length && sitemapValidation.isValid
  };
}

/**
 * Run comprehensive canonical URL tests
 */
export function runCanonicalURLTests() {
  console.log('\n🚀 COMPREHENSIVE CANONICAL URL TESTING');
  console.log('=======================================\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  // Run all test suites
  results.tests.canonicalGeneration = testCanonicalURLGeneration();
  results.tests.urlNormalization = testURLNormalization();
  results.tests.canonicalValidation = testCanonicalValidation();
  results.tests.blogPostCanonicals = testBlogPostCanonicals();
  results.tests.sitemapCanonicals = testSitemapCanonicals();
  
  // Calculate overall results
  const totalTests = Object.values(results.tests).reduce((sum, test) => sum + test.totalTests, 0);
  const totalPassed = Object.values(results.tests).reduce((sum, test) => sum + test.passedTests, 0);
  const totalFailed = totalTests - totalPassed;
  const allPassed = Object.values(results.tests).every(test => test.allPassed);
  
  results.summary = {
    totalTests,
    totalPassed,
    totalFailed,
    allPassed,
    successRate: Math.round((totalPassed / totalTests) * 100)
  };
  
  // Final report
  console.log('\n📊 FINAL RESULTS');
  console.log('================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Success Rate: ${results.summary.successRate}%`);
  console.log(`Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 CONGRATULATIONS! Your site is properly configured to prevent Google canonical URL duplicate errors.');
  } else {
    console.log('\n⚠️  Please fix the failed tests above to ensure proper canonical URL implementation.');
  }
  
  console.log('\n');
  
  return results;
}

/**
 * Run complete SEO validation including content and canonicals
 */
export function runCompleteSEOValidation() {
  console.log('\n🔍 COMPLETE SEO VALIDATION');
  console.log('==========================\n');
  
  // Run content validation
  const contentReport = logSEOReport();
  
  // Run canonical URL tests
  const canonicalResults = runCanonicalURLTests();
  
  // Combined results
  const overallHealth = contentReport.overallHealth === 'GOOD' && canonicalResults.summary.allPassed ? 'EXCELLENT' : 
                       contentReport.overallHealth === 'GOOD' || canonicalResults.summary.allPassed ? 'GOOD' :
                       contentReport.overallHealth === 'WARNING' ? 'WARNING' : 'CRITICAL';
  
  console.log('🏆 OVERALL SEO HEALTH:', overallHealth);
  
  if (overallHealth === 'EXCELLENT') {
    console.log('🎯 Your site is optimized for Google Search and should not experience canonical URL duplicate errors!');
  } else {
    console.log('📝 Review the issues above to improve your site\\'s SEO health.');
  }
  
  return {
    overallHealth,
    contentReport,
    canonicalResults,
    timestamp: new Date().toISOString()
  };
}