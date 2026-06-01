'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { withStaticAssetVersion } from '@/lib/assetVersion';

interface UniversalGalleryProps {
  images: string[];
  fit?: 'cover' | 'contain';
  alt?: string;
  aspectRatio?: string;
}

export default function UniversalGallery({ images, fit = 'cover', alt = 'N-TET image', aspectRatio = '4 / 3' }: UniversalGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  // Ensure we have at least one valid image
  const displayImages = images.length > 0 ? images : ['/logo1-small.webp'];

  return (
    <div className="gallery-container">
      {/* 1. Main Display Area */}
      <div className="gallery-main" style={{ position: 'relative', aspectRatio }}>
        <Image 
            src={withStaticAssetVersion(displayImages[activeIndex] || '/logo1-small.webp')} 
            alt={alt} 
            fill
            priority
            style={{ objectFit: fit }}
            sizes="(max-width: 1200px) 100vw, 50vw"
        />
        
        {/* Navigation Buttons (Matched with Screen Sample) */}
        {displayImages.length > 1 && (
          <>
            <button 
              type="button"
              aria-label="Previous image"
              onClick={handlePrev} 
              className="gallery-nav-btn prev"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '118px',
                background: 'linear-gradient(180deg, rgba(9, 22, 42, 0.72), rgba(49, 91, 164, 0.62))',
                border: '1px solid rgba(255,255,255,0.28)',
                borderLeft: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 0,
                boxShadow: '8px 0 24px rgba(0,0,0,0.18)',
                color: '#fff'
              }}
            >
              <span className="gallery-nav-accent" aria-hidden="true" />
              <ChevronLeft size={28} strokeWidth={2.8} />
            </button>
            <button 
              type="button"
              aria-label="Next image"
              onClick={handleNext} 
              className="gallery-nav-btn next"
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '118px',
                background: 'linear-gradient(180deg, rgba(9, 22, 42, 0.72), rgba(49, 91, 164, 0.62))',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRight: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 0,
                boxShadow: '-8px 0 24px rgba(0,0,0,0.18)',
                color: '#fff'
              }}
            >
              <span className="gallery-nav-accent" aria-hidden="true" />
              <ChevronRight size={28} strokeWidth={2.8} />
            </button>
          </>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="gallery-thumbs">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className={`thumb-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              style={{ position: 'relative' }}
            >
              <Image
                src={withStaticAssetVersion(img || '/logo1-small.webp')}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Internal styles to guarantee consistency even if CSS changes */}
      <style jsx>{`
        .gallery-container { display: flex; flex-direction: column; gap: 20px; }
        .gallery-main { 
            position: relative; 
            aspect-ratio: 4/3; 
            background: #fff; 
            overflow: hidden; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border: 1px solid #eee;
        }
        .gallery-thumbs { display: flex; gap: 15px; }
        .thumb-item {
            width: 120px;
            height: 90px;
            border: 2px solid #eee;
            cursor: pointer;
            transition: all 0.2s;
            background: #fff;
        }
        .thumb-item.active {
            border-color: #ff9800 !important;
        }
        .thumb-item img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-nav-btn {
            isolation: isolate;
        }
        .gallery-nav-btn::after {
            content: '';
            position: absolute;
            inset: 10px;
            border-top: 1px solid rgba(255,255,255,0.36);
            border-bottom: 1px solid rgba(255,255,255,0.18);
            pointer-events: none;
        }
        .gallery-nav-accent {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #315ba4;
            box-shadow: 0 0 18px rgba(49, 91, 164, 0.8);
        }
        .gallery-nav-btn.prev .gallery-nav-accent { left: 0; }
        .gallery-nav-btn.next .gallery-nav-accent { right: 0; }
        .gallery-nav-btn :global(svg) {
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35));
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-nav-btn:hover {
            background: linear-gradient(180deg, rgba(49, 91, 164, 0.92), rgba(20, 43, 84, 0.88)) !important;
        }
        .gallery-nav-btn.prev:hover :global(svg) { transform: translateX(-3px); }
        .gallery-nav-btn.next:hover :global(svg) { transform: translateX(3px); }
        .gallery-nav-btn:focus-visible {
            outline: 2px solid #ff9800;
            outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}

