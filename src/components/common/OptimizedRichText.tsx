'use client';

import React from 'react';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { sanitizePublicRichText } from '@/lib/publicCopy';

interface OptimizedRichTextProps {
  html: string;
  className?: string;
}

/**
 * Renders rich text HTML and normalizes body image attributes.
 * next.config.js uses images.unoptimized, so rich text images must keep their
 * public asset URLs instead of being rewritten to /_next/image.
 */
export default function OptimizedRichText({ html, className }: OptimizedRichTextProps) {
  if (!html) return null;

  const optimizedHtml = sanitizePublicRichText(html)
    .replace(/(<figcaption[^>]*>\s*)(?:Figure|Fig\.?|Рисунок|图)\s*\d+\s*[:：.\-–]?\s*/gi, '$1')
    .replace(/(<p[^>]*class=["'][^"']*figure-caption[^"']*["'][^>]*>\s*)(?:Figure|Fig\.?|Рисунок|图)\s*\d+\s*[:：.\-–]?\s*/gi, '$1')
    .replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)\/?>/g, (match, before, src, after) => {
      if (src.startsWith('data:')) {
        return match;
      }

      return `<img${before}src="${withStaticAssetVersion(src)}"${after} loading="lazy" style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />`;
    });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: optimizedHtml }}
    />
  );
}
