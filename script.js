// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gadget Hub loaded successfully!');
    
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Lazy Loading for Images
    initLazyLoading();
    
    // Social Sharing
    initSocialSharing();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Performance Monitoring
    monitorPerformance();
});

// Mobile Navigation
function initMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Lazy Loading Implementation
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    // If no lazy images, exit early
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    lazyImages.forEach(img => {
        // Ensure data-src attribute exists
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Social Sharing Functions
function initSocialSharing() {
    // Add event listeners to share buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('share-btn')) {
            e.preventDefault();
            const platform = e.target.classList[1]; // facebook, twitter, etc.
            shareContent(platform);
        }
    });
}

function shareContent(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance Monitoring
function monitorPerformance() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with web-vitals library if included
        console.log('Performance monitoring initialized');
    }
    
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Blog Post Dynamic Content Loading
function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    
    if (postId) {
        const blogPosts = {
            'iphone-15-pro-max-review': {
                title: 'iPhone 15 Pro Max Complete Review: Worth the Upgrade?',
                date: 'December 28, 2024',
                author: 'Tech Reviewer',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
                content: `
                    <h2>Design and Build Quality</h2>
                    <p>The iPhone 15 Pro Max represents Apple's commitment to premium materials and exceptional build quality. The titanium construction not only reduces weight but also provides superior durability compared to previous stainless steel models.</p>
                    
                    <h3>Key Design Changes</h3>
                    <ul>
                        <li>Titanium frame reduces weight by 19 grams</li>
                        <li>Action Button replaces traditional mute switch</li>
                        <li>USB-C port finally arrives on iPhone</li>
                        <li>Refined camera bump design</li>
                    </ul>
                    
                    <h2>Camera Performance</h2>
                    <p>The camera system receives significant upgrades with improved computational photography and enhanced zoom capabilities. The 48MP main sensor delivers exceptional detail in various lighting conditions.</p>
                    
                    <h3>Camera Specifications</h3>
                    <ul>
                        <li>48MP Main camera with f/1.78 aperture</li>
                        <li>12MP Ultra Wide with f/2.2 aperture</li>
                        <li>12MP Telephoto with 5x optical zoom</li>
                        <li>Advanced computational photography features</li>
                    </ul>
                    
                    <h2>Performance and Battery Life</h2>
                    <p>Powered by the A17 Pro chip, the iPhone 15 Pro Max delivers exceptional performance across all tasks. Gaming, video editing, and multitasking feel effortless with the new 3nm architecture.</p>
                    
                    <p>Battery life remains excellent, easily lasting a full day of heavy usage. The improved efficiency of the A17 Pro chip contributes to better power management.</p>
                    
                    <h2>Final Verdict</h2>
                    <p>The iPhone 15 Pro Max is a worthy upgrade for users coming from iPhone 12 Pro Max or older models. The camera improvements, USB-C adoption, and titanium build make it a compelling choice for premium smartphone buyers.</p>
                `
            },
            'best-gaming-laptops-2024': {
                title: 'Best Gaming Laptops 2024: Top 10 Picks Under ₹1 Lakh',
                date: 'December 27, 2024',
                author: 'Gaming Expert',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
                content: `
                    <h2>What to Look for in a Gaming Laptop</h2>
                    <p>When choosing a gaming laptop under ₹1 lakh, several key factors determine the overall gaming experience and value for money.</p>
                    
                    <h3>Essential Specifications</h3>
                    <ul>
                        <li>GPU: RTX 4050/4060 or RX 7600M for 1080p gaming</li>
                        <li>CPU: Intel Core i5-12th gen or AMD Ryzen 5 6000 series</li>
                        <li>RAM: 16GB DDR4/DDR5 for optimal performance</li>
                        <li>Storage: 512GB SSD minimum for fast loading</li>
                        <li>Display: 144Hz refresh rate for smooth gameplay</li>
                    </ul>
                    
                    <h2>Top Gaming Laptop Recommendations</h2>
                    
                    <h3>1. ASUS TUF Gaming F15 (₹75,000)</h3>
                    <p>Features Intel Core i5-12500H, RTX 4050, 16GB RAM, and 512GB SSD. Excellent build quality and thermal management make it ideal for extended gaming sessions.</p>
                    
                    <h3>2. Acer Nitro 5 (₹68,000)</h3>
                    <p>AMD Ryzen 5 6600H with RTX 4050 provides excellent 1080p gaming performance. The 144Hz display ensures smooth visuals in competitive games.</p>
                    
                    <h3>3. HP Pavilion Gaming 15 (₹72,000)</h3>
                    <p>Balanced performance with Intel Core i5-12450H and RTX 4050. Good keyboard and trackpad quality for productivity tasks alongside gaming.</p>
                    
                    <h2>Performance Benchmarks</h2>
                    <p>All recommended laptops can handle popular games at 1080p with high settings:</p>
                    <ul>
                        <li>Valorant: 200+ FPS</li>
                        <li>CS2: 150+ FPS</li>
                        <li>Cyberpunk 2077: 60+ FPS (High settings)</li>
                        <li>Forza Horizon 5: 80+ FPS (High settings)</li>
                    </ul>
                    
                    <h2>Buying Tips</h2>
                    <p>Consider future-proofing by choosing laptops with upgradeability options. Look for models with additional RAM slots and M.2 SSD slots for storage expansion.</p>
                `
            }
        };
        
        const post = blogPosts[postId];
        if (post) {
            updateBlogPostContent(post);
        }
    }
}

function updateBlogPostContent(post) {
    // Update page title
    document.title = post.title + ' - Gadget Hub';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = post.content.substring(0, 160) + '...';
    }
    
    // Update post content if on blog post page
    const postTitle = document.querySelector('.post-title');
    const postDate = document.querySelector('.post-date');
    const postAuthor = document.querySelector('.post-author');
    const featuredImage = document.querySelector('.featured-image');
    const postBody = document.querySelector('.post-body');
    
    if (postTitle) postTitle.textContent = post.title;
    if (postDate) postDate.textContent = post.date;
    if (postAuthor) postAuthor.textContent = 'By ' + post.author;
    if (featuredImage) featuredImage.src = post.image;
    if (postBody) postBody.innerHTML = post.content;
}

// Initialize blog post loading if on blog post page
if (window.location.pathname.includes('blog-post.html')) {
    document.addEventListener('DOMContentLoaded', loadBlogPost);
}

// SEO and Analytics Helper Functions
function updatePageMeta(title, description, image) {
    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = description;
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && image) ogImage.content = image;
}

// Contact Form Handler
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// Initialize contact form if on contact page
if (window.location.pathname.includes('contact.html')) {
    document.addEventListener('DOMContentLoaded', handleContactForm);
}

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}