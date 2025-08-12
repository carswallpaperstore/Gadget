/**
 * NOTIFICATION HOOK
 * ================
 * Push notification management
 */

import { useState, useEffect } from 'react';

export function useNotification() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setIsSubscribed(Notification.permission === 'granted');
    }
  }, []);

  const subscribe = async () => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      setIsSubscribed(true);
      
      // Show welcome notification
      new Notification('TechGuru India', {
        body: 'आपको latest tech updates मिलेंगे!',
        icon: '/favicon.ico'
      });
      
      return true;
    }
    
    throw new Error('Notification permission denied');
  };

  return {
    isSubscribed,
    subscribe
  };
}