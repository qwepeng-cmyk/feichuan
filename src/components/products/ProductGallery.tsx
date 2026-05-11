'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-container">
      <div className="gallery-main" style={{ position: 'relative' }}>
        <img src={images[activeIndex]} alt="Main Product View" />
        
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
      </div>

      <div className="gallery-thumbs">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumb-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
