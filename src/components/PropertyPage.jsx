"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PropertyBroucher } from "./PropertyPageBrochure";
import ShareModal from "./ShareModal";

// ------------------------------------
// Memoized Carousel
// ------------------------------------
const CarouselComponent = React.memo(function CarouselComponent({ property }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef(null);
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Single config object for the static props
  const carouselConfig = {
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
    useKeyboardArrows: true,
    showIndicators: false,
    swipeable: true,
    emulateTouch: true,
    swipeScrollTolerance: 5,
    preventMovementUntilSwipeScrollTolerance: true,
    autoPlay: true,
    interval: 6000,
    stopOnHover: true,
    transitionTime: 500,
    animationHandler: "fade",
  };

  // Main Carousel
  const MainCarousel = (
    <div className="relative w-full h-[600px] group">
      <Carousel
        {...carouselConfig}
        selectedItem={currentIndex}
        onChange={setCurrentIndex}
        renderArrowPrev={(clickHandler) => (
          <button
            onClick={clickHandler}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-r-lg opacity-0 group-hover:opacity-100 hover:pl-4"
          >
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        renderArrowNext={(clickHandler) => (
          <button
            onClick={clickHandler}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-l-lg opacity-0 group-hover:opacity-100 hover:pr-4"
          >
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      >
        {property.photos_url.map((image, index) => (
          <div
            key={index}
            className="relative h-[600px] flex items-center justify-center"
          >
            <Image
              src={image}
              fill
              alt={`Property Image ${index + 1}`}
              className="object-contain"
              priority={index === 0} // eagerly load the first image
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 80vw,
                     1200px"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );

  // Thumbnail Carousel
  const ThumbnailCarousel = (
    <div ref={containerRef} className="relative px-8 py-2">
      <div
        ref={thumbnailsRef}
        className="flex gap-2 overflow-x-hidden scroll-smooth mx-auto py-2 px-1"
        style={{
          maxWidth: `${visibleCount * 80 + (visibleCount - 1) * 8}px`,
        }}
      >
        {property.photos_url.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-14 relative rounded overflow-hidden transition-all duration-300 transform hover:scale-105
              ${
                currentIndex === index
                  ? "ring-2 ring-[#B8860B] ring-offset-2 ring-offset-white shadow-lg"
                  : "opacity-70 hover:opacity-100 hover:shadow-md"
              }`}
          >
            <Image
              src={image}
              fill
              alt={`Thumbnail ${index + 1}`}
              sizes="80px"
              className="object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );

  // Auto-scroll thumbnails
  useEffect(() => {
    if (!thumbnailsRef.current) return;

    const thumbnailWidth = 84; // 80 + (some margin)
    const gap = 8;
    const centerOffset = Math.floor(visibleCount / 2);
    const scrollPosition = Math.max(
      0,
      (currentIndex - centerOffset) * (thumbnailWidth + gap)
    );

    thumbnailsRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, visibleCount]);

  // Calculate visible thumbnails
  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const thumbnailWidth = 84; // 80 + ~4 margin
      const gap = 8;
      const padding = 64; // px-8 => 8 * 8=64 total horizontal

      const availableWidth = containerWidth - padding;
      const possibleCount = Math.floor(availableWidth / (thumbnailWidth + gap));
      const newCount = Math.min(
        Math.max(4, possibleCount),
        Math.min(12, property.photos_url.length)
      );

      setVisibleCount(newCount);
    };

    const observer = new ResizeObserver(calculateVisibleCount);
    if (containerRef.current) observer.observe(containerRef.current);

    // Initial run
    calculateVisibleCount();

    return () => observer.disconnect();
  }, [property.photos_url.length]);

  return (
    <div className="relative w-full my-8">
      {MainCarousel}
      {ThumbnailCarousel}
    </div>
  );
});

// ------------------------------------
// Main Page
// ------------------------------------
export default function PropiedadPage({ property }) {
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[1000px]">
      <h1 className="text-5xl text-[#14213D] text-center text-greener">
        {property.title}
      </h1>

      <CarouselComponent property={property} />

      <div className="flex flex-col xl:flex-row justify-center gap-8 items-start">
        <div className="text-gray-600 text-xl leading-relaxed p-4 my-auto text-center">
          {property.description}
        </div>

        <PropertyBroucher property={property} />
      </div>

      {/* <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={property.title}
        url={`https://www.lhsconcept.com/propiedades/${property.url}`}
      /> */}
    </div>
  );
}
