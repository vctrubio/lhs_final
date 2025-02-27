"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
// ... other imports remain the same

export function CarouselComponent({ property, currentIndex, setCurrentIndex, openLightbox, autoPlayEnabled }) {
  const [touchPosition, setTouchPosition] = useState(null);
  const [visibleThumbnails, setVisibleThumbnails] = useState(4);
  const containerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchPosition) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;
    
    if (Math.abs(diff) > 5) {
      if (diff > 5) handleNext();
      if (diff < -5) handlePrev();
    }
    setTouchPosition(null);
  };

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? property.photos_url.length - 1 : prev - 1));
  };

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === property.photos_url.length - 1 ? 0 : prev + 1));
  }, [property.photos_url.length, setCurrentIndex]);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlayEnabled || property.photos_url.length <= 1) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [autoPlayEnabled, handleNext, property.photos_url.length]);

  // Thumbnail scroll effect
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    
    const activeThumbnail = thumbnailsRef.current.children[currentIndex];
    if (!activeThumbnail) return;

    const container = thumbnailsRef.current;
    const { offsetLeft: thumbOffset, offsetWidth: thumbWidth } = activeThumbnail;
    const { offsetWidth: containerWidth, scrollLeft } = container;
    
    const scrollPosition = thumbOffset - (containerWidth - thumbWidth) / 2;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, [currentIndex]);

  // Responsive thumbnail calculation
  useEffect(() => {
    const updateVisibleThumbnails = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const thumbWidth = window.innerWidth < 640 ? 68 : 84;
      const newCount = Math.floor(containerWidth / (thumbWidth + 8));
      setVisibleThumbnails(Math.min(newCount, property.photos_url.length));
    };

    updateVisibleThumbnails();
    window.addEventListener("resize", updateVisibleThumbnails);
    return () => window.removeEventListener("resize", updateVisibleThumbnails);
  }, [property.photos_url.length]);

  return (
    <div className="relative w-full my-2">
      {/* Main Carousel */}
      <div 
        className="relative h-[300px] sm:h-[500px] overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {property.photos_url.map((image, index) => (
            <div 
              key={index}
              className="w-full h-full flex-shrink-0 relative cursor-zoom-in"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.url}
                fill
                alt={`${property.title} ${index + 1}`}
                className="object-contain"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {property.photos_url.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 transition-all rounded-lg"
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 transition-all rounded-lg"
            >
              <ArrowIcon direction="next" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div ref={containerRef} className="px-2 sm:px-4 py-2 max-w-7xl mx-auto">
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {property.photos_url.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 relative rounded overflow-hidden transition-all ${
                currentIndex === index 
                  ? "ring-2 ring-[#B8860B] ring-offset-2 shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                fill
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper component for arrows
function ArrowIcon({ direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "prev" 
          ? "M15.75 19.5 8.25 12l7.5-7.5" 
          : "M8.25 4.5l7.5 7.5-7.5 7.5"}
      />
    </svg>
  );
}