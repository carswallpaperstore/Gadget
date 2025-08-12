/**
 * LAZY LOADING HOOK
 * ================
 * Optimizes image loading with Intersection Observer
 */

import { useState, useEffect, useRef } from 'react';

export function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  return {
    imgRef,
    isVisible,
    hasLoaded,
    handleLoad
  };
}