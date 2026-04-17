'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="gallery-container">
      <div className="gallery-main">
        <img src={images[activeIndex]} alt="Main Product View" />
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
