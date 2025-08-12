/**
 * UTILITY FUNCTIONS
 * ================
 * Common helper functions for the blog
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// CSS class merging utility
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date for display
export function formatDate(date) {
  return new Date(date).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

// Format time ago
export function formatTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInHours = (now - past) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    return `${Math.floor(diffInHours / 24)} days ago`;
  }
}

// Truncate text to specified length
export function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}