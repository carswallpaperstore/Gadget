import { Link } from "wouter";
import { Clock } from "lucide-react";
import SocialShare from "./SocialShare";
import { formatTimeAgo } from "../lib/utils";

export default function BlogCard({ post, featured = false, priority = false }) {
  const handleCardClick = (e) => {
    // Don't navigate if clicking on social share buttons
    if (e.target.closest('.social-share')) {
      e.preventDefault();
      return;
    }
    // Navigate to the post page
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover-lift will-change-transform cursor-pointer transition-all duration-200 hover:shadow-md border border-border"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={post.image}
          alt={post.title}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-48 object-cover aspect-video"
        />
        {(post.featured || featured) && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-end mb-3">
          <div className="flex items-center text-xs text-muted-foreground english-text">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(post.publishedAt)}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 hindi-text hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 hindi-text line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="social-share" onClick={(e) => e.stopPropagation()}>
            <SocialShare 
              url={`/blog/${post.slug}`}
              title={post.title}
            />
          </div>
          <div className="text-primary text-sm font-medium english-text">
            Read More →
          </div>
        </div>
      </div>
    </article>
  );
}