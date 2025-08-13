import { Link } from "wouter";
import { Clock } from "lucide-react";
import SocialShare from "./SocialShare";

import { useLazyLoad } from "../hooks/use-lazy-load";
import { formatTimeAgo } from "../lib/utils";


export default function BlogCard({ post }) {
  const { imgRef, isVisible, hasLoaded, handleLoad } = useLazyLoad();

  const handleCardClick = (e) => {
    // Don't navigate if clicking on social share buttons
    if (e.target.closest('.social-share')) {
      e.preventDefault();
      return;
    }
    // Navigate to the post page
  window.location.href = `/blog/${post.id}`;
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover-lift will-change-transform cursor-pointer transition-all duration-200 hover:shadow-md"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          ref={imgRef}
          src={post.image}
          alt={post.title}
          className={`w-full h-48 object-cover lazy-image ${hasLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          onLoad={handleLoad}
        />
        {post.featured && (
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
        <h3 className="text-lg font-bold mb-2 hindi-text hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 hindi-text line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="social-share" onClick={(e) => e.stopPropagation()}>
            <SocialShare 
              url={`/blog/${post.id}`}
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