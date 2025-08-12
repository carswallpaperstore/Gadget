import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export default function SocialShare({ url, title }) {
  const fullUrl = `${window.location.origin}${url}`;
  
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  // Use native Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: fullUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to WhatsApp as it's most popular in India
      handleShare('whatsapp');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNativeShare}
        className="text-xs text-muted-foreground hover:text-primary transition-colors p-1"
      >
        <Share2 className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('whatsapp')}
        className="text-xs text-muted-foreground hover:text-green-600 transition-colors p-1"
        title="Share on WhatsApp"
      >
        <i className="fab fa-whatsapp text-sm"></i>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="text-xs text-muted-foreground hover:text-blue-500 transition-colors p-1"
        title="Share on Twitter"
      >
        <i className="fab fa-twitter text-sm"></i>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="text-xs text-muted-foreground hover:text-blue-600 transition-colors p-1"
        title="Share on Facebook"
      >
        <i className="fab fa-facebook text-sm"></i>
      </Button>
    </div>
  );
}