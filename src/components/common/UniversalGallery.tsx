'use client';

import React, { useState } from 'react';

interface UniversalGalleryProps {
  images: string[];
}

export default function UniversalGallery({ images }: UniversalGalleryProps) {
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
  const displayImages = images.length > 0 ? images : ['/images/placeholder.jpg'];

  return (
    <div className="gallery-container">
      {/* 1. Main Display Area */}
      <div className="gallery-main">
        <img 
            src={displayImages[activeIndex]} 
            alt="Main display" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Navigation Buttons (Matched with Screen Sample) */}
        {displayImages.length > 1 && (
          <>
            <button 
              onClick={handlePrev} 
              className="gallery-nav-btn prev"
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '110px',
                background: 'rgba(235, 244, 255, 0.92)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={handleNext} 
              className="gallery-nav-btn next"
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '110px',
                background: 'rgba(235, 244, 255, 0.92)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* 2. Thumbnails Rail (Always show) */}
      <div className="gallery-thumbs">
        {displayImages.map((img, index) => (
          <div
            key={index}
            className={`thumb-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

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
        .gallery-nav-btn:hover { background: #315ba4 !important; }
        .gallery-nav-btn:hover stroke { stroke: #fff !important; }
      `}</style>
    </div>
  );
}
