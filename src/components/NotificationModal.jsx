import React from "react";
import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { useNotification } from '../hooks/use-notification';

export default function NotificationModal() {
  const [isVisible, setIsVisible] = useState(false);
  const { isSubscribed, subscribe } = useNotification();

  useEffect(() => {
    // Show modal after 3 seconds if not subscribed
    const timer = setTimeout(() => {
      if (!isSubscribed && Notification.permission !== 'granted') {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSubscribed]);

  const handleSubscribe = async () => {
    try {
      await subscribe();
      setIsVisible(false);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Don't show again for this session
    sessionStorage.setItem('notificationModalClosed', 'true');
  };

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('notificationModalClosed') || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2 hindi-text">
            Latest Tech Updates पाना चाहते हैं?
          </h3>
          
          <p className="text-muted-foreground text-sm mb-6 hindi-text">
            Breaking tech news और latest gadget reviews की instant notifications enable करें। 
            कोई spam नहीं, सिर्फ important updates।
          </p>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              बाद में
            </Button>
            <Button 
              onClick={handleSubscribe}
              className="flex-1"
            >
              Enable करें
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}