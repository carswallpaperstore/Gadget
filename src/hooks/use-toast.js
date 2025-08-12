/**
 * TOAST HOOK
 * ==========
 * Simple toast notifications for user feedback
 */

import React, { useState, useCallback } from 'react';

const toastQueue = [];
let listeners = [];

const addToastListener = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

const toast = ({ title, description, variant = 'default' }) => {
  const id = Date.now();
  const newToast = { id, title, description, variant };
  
  toastQueue.push(newToast);
  listeners.forEach(listener => listener(newToast));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    listeners.forEach(listener => listener({ ...newToast, action: 'remove' }));
  }, 5000);
};

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toastData) => {
    if (toastData.action === 'remove') {
      setToasts(prev => prev.filter(t => t.id !== toastData.id));
    } else {
      setToasts(prev => [...prev, toastData]);
    }
  }, []);

  React.useEffect(() => {
    const unsubscribe = addToastListener(addToast);
    return unsubscribe;
  }, [addToast]);

  return {
    toast,
    toasts,
    dismiss: (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }
  };
}