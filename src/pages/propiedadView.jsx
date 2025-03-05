"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Ruler, Bath, Bed, MapPin } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IconPlano } from "@/utils/svgs";

import { PropertyBroucher } from "@/components/PropertyBroucher";
import { PropertyDescription } from "@/components/PropertyDescription";

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        onNext();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        onPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, images]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl px-3 py-1 bg-black/40 rounded hover:bg-black/60"
      >
        &times;
      </button>

      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 text-white text-xl px-3 py-1 bg-black/40 rounded hover:bg-black/60"
        >
          &larr;
        </button>
      )}

      <div className="relative w-[80%] h-[80%] flex items-center justify-center">
        <Image
          src={images[currentIndex]?.url || ""}
          alt={`Lightbox ${currentIndex}`}
          fill
          className="object-contain"
          priority
        />
      </div>

      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 text-white text-xl px-3 py-1 bg-black/40 rounded hover:bg-black/60"
        >
          &rarr;
        </button>
      )}
    </div>
  );
}

const CarouselComponent = React.memo(function CarouselComponent({
  property,
  currentIndex,
  setCurrentIndex,
  openLightbox,
  autoPlayEnabled,
}) {
  const [maxWidth, setMaxWidth] = useState("100%");
  const [visibleCount, setVisibleCount] = useState(6);

  const thumbnailsRef = useRef(null);
  const containerRef = useRef(null);

  // Carousel configuration
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
    autoPlay: autoPlayEnabled,
    interval: 6000,
    stopOnHover: true,
    transitionTime: 500,
    animationHandler: "slide",
    onClickItem: openLightbox,
  };

  // Thumbnail scroll logic
  useEffect(() => {
    if (!thumbnailsRef.current) return;

    const isMobile = window.innerWidth < 720;
    const thumbnailWidth = isMobile ? 68 : 84;
    const gap = isMobile ? 4 : 8;
    const centerOffset = Math.floor(visibleCount / 2);

    const scrollPosition = Math.max(
      0,
      (currentIndex - centerOffset) * (thumbnailWidth + gap),
    );

    thumbnailsRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, visibleCount]);

  // Calculate visible thumbnails based on container width
  useEffect(() => {
    if (!containerRef.current) return;

    const calculateVisibleCount = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 720;
      const thumbnailWidth = isMobile ? 68 : 84;
      const gap = isMobile ? 4 : 8;
      const padding = isMobile ? 16 : 32;

      const availableWidth = containerWidth - padding;
      const possibleCount = Math.floor(availableWidth / (thumbnailWidth + gap));

      const newCount = Math.min(
        Math.max(isMobile ? 3 : 4, possibleCount),
        Math.min(12, property.photos_url.length),
      );

      setVisibleCount(newCount);
      setMaxWidth(`${newCount * (thumbnailWidth + gap) - gap}px`);
    };

    const observer = new ResizeObserver(calculateVisibleCount);
    observer.observe(containerRef.current);
    calculateVisibleCount();

    return () => observer.disconnect();
  }, [property.photos_url.length]);

  // Reusable Carousel Arrow Component
  const CarouselArrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute ${direction === "prev" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-lg sm:opacity-0 group-hover:opacity-100 opacity-100 hover:${direction === "prev" ? "pl-3" : "pr-3"} sm:hover:${direction === "prev" ? "pl-4" : "pr-4"}`}
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
          d={
            direction === "prev"
              ? "M15.75 19.5 8.25 12l7.5-7.5"
              : "M8.25 4.5l7.5 7.5-7.5 7.5"
          }
        />
      </svg>
    </button>
  );

  // Reusable Carousel Image Component
  const CarouselImage = ({ image, title, index, onClick }) => (
    <div
      className="relative h-[300px] sm:h-[500px] flex items-center justify-center cursor-zoom-in"
      onClick={onClick}
    >
      <Image
        src={image.url}
        fill
        alt={`${title} ${index + 1}`}
        className="object-contain"
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1536px) 80vw, 1400px"
      />
    </div>
  );

  // Reusable Thumbnail Component
  const Thumbnail = ({ image, title, index, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 relative rounded overflow-hidden transition-all duration-300 transform hover:scale-105 ${isActive ? "ring-2 ring-[#B8860B] ring-offset-1 sm:ring-offset-2 shadow-md" : "opacity-70 hover:opacity-100"}`}
    >
      <Image
        src={image.url}
        alt={`${title} sm-${index + 1}`}
        width={80}
        height={60}
        style={{ objectFit: "cover", height: "100%" }}
        loading="lazy"
      />
    </button>
  );

  // Main Carousel Component
  const MainCarousel = (
    <div className="relative mx-auto px-4 sm:px-6">
      <Carousel
        {...carouselConfig}
        selectedItem={currentIndex}
        onChange={setCurrentIndex}
        renderArrowPrev={(clickHandler) => (
          <CarouselArrow direction="prev" onClick={clickHandler} />
        )}
        renderArrowNext={(clickHandler) => (
          <CarouselArrow direction="next" onClick={clickHandler} />
        )}
      >
        {property.photos_url.map((image, index) => (
          <CarouselImage
            key={index}
            image={image}
            title={property.title}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </Carousel>
    </div>
  );

  // Thumbnail Carousel Component
  const ThumbnailCarousel = (
    <div
      ref={containerRef}
      className="relative px-2 sm:px-4 py-2 max-w-7xl mx-auto"
    >
      <div
        ref={thumbnailsRef}
        className="flex gap-1 sm:gap-2 overflow-x-hidden scroll-smooth mx-auto py-2 px-1"
        style={{ maxWidth }}
      >
        {property.photos_url.map((image, index) => (
          <Thumbnail
            key={index}
            image={image}
            title={property.title}
            index={index}
            isActive={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full my-2">
      {MainCarousel}
      {ThumbnailCarousel}
    </div>
  );
});

const PropertyTitle = ({ property }) => {
  return (
    <div className="flex flex-col items-center w-full gap-1 text-center mb-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-greenDark mt-1">
        {property.title}
      </h1>
      <h2 className="flex pr-4 sm:pr-8 items-center text-lg sm:text-xl">
        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
        <div className="ml-1">{property.barrioRef?.name}</div>
      </h2>
    </div>
  );
};

const PropertyInfo = ({ property, togglePlano }) => {
  return (
    <div className="flex flex-col xl:flex-row justify-center gap-2 sm:gap-8 max-w-6xl mx-auto">
      <div>
        <PropertyDescription property={property} />
        {property.plano_url?.url && (
          <button
            onClick={togglePlano}
            className="flex items-center gap-2 border border-greenish rounded-2xl mx-auto p-4 w-28 cursor-pointer hover:bg-greenish hover:border-background"
          >
            <IconPlano />
            <span>Plano</span>
          </button>
        )}
      </div>
      <PropertyBroucher property={property} />
    </div>
  );
};

export default function PropiedadPage({ property }) {
  // Added fallback to avoid undefined errors during pre-render
  property = property || {};
  property.photos_url = property.photos_url || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState(property.photos_url); // Default: only normal photos
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true); // Controls carousel autoPlay

  const openLightbox = (index) => {
    setLightboxImages(property.photos_url); // Ensure plano is NOT part of normal image navigation
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const togglePlano = () => {
    if (property.plano_url?.url) {
      setLightboxImages([{ url: property.plano_url.url }]); // Only planoUrl in array
      setCurrentIndex(0); // Since it's now the only image, index should be 0
      setLightboxOpen(true);
      setAutoPlayEnabled(false); // Disable autoPlay
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setAutoPlayEnabled(true); // Re-enable autoPlay when Lightbox closes
  };

  const nextImage = () => {
    if (lightboxImages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % lightboxImages.length);
    }
  };
  const prevImage = () => {
    if (lightboxImages.length > 1) {
      setCurrentIndex(
        (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length,
      );
    }
  };

  return (
    <div className="mx-auto px-2 pb-[58px] sm:px-6 lg:px-8 flex flex-col">
      <PropertyTitle property={property} />
      <CarouselComponent
        property={property}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        openLightbox={openLightbox}
        autoPlayEnabled={autoPlayEnabled} // Pass autoPlay control
      />

      <PropertyInfo property={property} togglePlano={togglePlano} />

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages} // Only contains the plano when togglePlano is clicked
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}

