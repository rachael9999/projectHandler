"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-button prev">‹</button>
      <div className="carousel-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          >
            <Image src={image.src} alt={image.alt} width={500} height={300} />
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="carousel-button next">›</button>
    </div>
  );
};

export default Carousel;