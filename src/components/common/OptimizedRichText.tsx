'use client';

import React from 'react';

interface OptimizedRichTextProps {
  html: string;
  className?: string;
}

/**
 * A component that renders rich text HTML but intercepts all <img> tags
 * to route them through Next.js's Image Optimization API.
 * This ensures even body images are converted to WebP and resized.
 */
export default function OptimizedRichText({ html, className }: OptimizedRichTextProps) {
  if (!html) return null;

  // Regex to find <img> tags and extract their src
  // We rewrite the src to use Next.js internal image optimization endpoint
  const optimizedHtml = html.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)\/?>/g, (match, before, src, after) => {
    // Skip if it's already optimized or an external data URL
    if (src.startsWith('/_next/image') || src.startsWith('data:')) {
      return match;
    }

    // Construct the Next.js image optimization URL
    // w=1080 is a reasonable default for high-quality body images
    // q=75 is the default Next.js quality
    const optimizedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`;
    
    // Return the new img tag with lazy loading and responsive styles
    return `<img${before}src="${optimizedSrc}"${after} loading="lazy" style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />`;
  });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: optimizedHtml }} 
    />
  );
}
