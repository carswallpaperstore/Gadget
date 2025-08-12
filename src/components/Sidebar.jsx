import React from "react";
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Bell, TrendingUp } from 'lucide-react';
import { getFeaturedPosts } from '../data/blogPosts';
import { Link } from 'wouter';
import { useNotification } from '../hooks/use-notification';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';

export default function Sidebar() {
  const [email, setEmail] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFeaturedPosts(getFeaturedPosts().slice(0, 3));
  }, []);

  const handleEmailSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      await apiRequest('/api/subscribe-email', {
        method: 'POST',
        body: { email },
      });

      toast({
        title: 'सफलतापूर्वक सब्स्क्राइब हो गए!',
        description: 'आपको email पर latest updates मिलेंगे।',
      });

      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'कुछ समस्या हुई है। बाद में कोशिश करें।',
        variant: 'destructive',
      });
    }
    setIsSubscribing(false);
  };


  return (
    <div className="space-y-6">
      {/* Subscribe Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex items-center mb-3">
          <Mail className="w-5 h-5 mr-2 text-primary" />
          <h3 className="font-semibold hindi-text">न्यूज़लेटर सब्स्क्राइब करें</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4 hindi-text">
          Latest tech updates और reviews सबसे पहले पाएं।
        </p>
        
        <form onSubmit={handleEmailSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="आपका email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm"
          />
          <Button 
            type="submit" 
            className="w-full text-sm"
            disabled={isSubscribing}
          >
            {isSubscribing ? 'Subscribe कर रहे हैं...' : 'Subscribe करें'}
          </Button>
        </form>
      </div>

      {/* Push Notifications */}

      {/* Featured Posts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          <h3 className="font-semibold hindi-text">Popular Posts</h3>
        </div>
        
        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <div className="flex space-x-3 group cursor-pointer">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium hindi-text group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 english-text">
                    {new Date(post.publishedAt).toLocaleDateString('hi-IN')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
        <h3 className="font-semibold mb-3 hindi-text">TechGuru India के बारे में</h3>
        <p className="text-sm text-muted-foreground hindi-text leading-relaxed">
          हम भारत की सबसे तेज़ और भरोसेमंद tech news website हैं। 
          Latest gadgets, smartphones, laptops और technology trends की 
          सटीक जानकारी हिंदी में पाएं।
        </p>
      </div>
    </div>
  );
}