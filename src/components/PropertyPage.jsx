"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PropertyBroucher } from "./PropertyPageBrochure";
import { PropertyDescription } from "./PropertyDescription";
import { MapPin } from "lucide-react";

// ------------------------------------
// Memoized Carousel
// ------------------------------------
const CarouselComponent = React.memo(function CarouselComponent({ property }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailsRef = useRef(null);
    const containerRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(6);

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
        transitionTime: 300,
        animationHandler: "slide",
    };

    const MainCarousel = (
        <div className="relative w-full md:w-[750px] sm:w-[420px] h-[300px] sm:h-[500px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <Carousel
                    {...carouselConfig}
                    selectedItem={currentIndex}
                    onChange={setCurrentIndex}
                    renderArrowPrev={(clickHandler) => (
                        <button
                            onClick={clickHandler}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-r-lg sm:opacity-0 sm:group-hover:opacity-100 opacity-100 hover:pl-3 sm:hover:pl-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    )}
                    renderArrowNext={(clickHandler) => (
                        <button
                            onClick={clickHandler}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-l-lg sm:opacity-0 sm:group-hover:opacity-100 opacity-100 hover:pr-3 sm:hover:pr-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    )}
                >
                    {property.photos_url.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-[300px] sm:h-[500px] flex items-center justify-center"
                        >
                            <Image
                                src={image.url}
                                fill
                                alt={`${property.title} ${index + 1}`}
                                className="object-contain"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                sizes="(max-width: 640px) 100vw, (max-width: 1536px) 80vw, 1400px"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );

    const ThumbnailCarousel = (
        <div ref={containerRef} className="relative px-2 sm:px-4 py-2 max-w-7xl mx-auto">
            <div
                ref={thumbnailsRef}
                className="flex gap-1 sm:gap-2 overflow-x-hidden scroll-smooth mx-auto py-2 px-1"
                style={{
                    maxWidth: `${visibleCount * (window.innerWidth < 640 ? 68 : 84) + 
                            (visibleCount - 1) * (window.innerWidth < 640 ? 4 : 8)}px`,
                }}
            >
                {property.photos_url.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 relative rounded overflow-hidden transition-all duration-300 transform hover:scale-105
                            ${currentIndex === index
                                ? "ring-2 ring-[#B8860B] ring-offset-1 sm:ring-offset-2 shadow-md"
                                : "opacity-70 hover:opacity-100"
                            }`}
                    >
                        <Image
                            src={image.url}
                            fill
                            alt={`${property.title} sm-${index + 1}`}
                            sizes="(max-width: 640px) 64px, 80px"
                            className="object-cover"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    useEffect(() => {
        if (!thumbnailsRef.current) return;

        const isMobile = window.innerWidth < 640;
        const thumbnailWidth = isMobile ? 68 : 84;
        const gap = isMobile ? 4 : 8;
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

    useEffect(() => {
        const calculateVisibleCount = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const isMobile = window.innerWidth < 640;
            const thumbnailWidth = isMobile ? 68 : 84;
            const gap = isMobile ? 4 : 8;
            const padding = isMobile ? 16 : 32;

            const availableWidth = containerWidth - padding;
            const possibleCount = Math.floor(availableWidth / (thumbnailWidth + gap));
            const newCount = Math.min(
                Math.max(isMobile ? 3 : 4, possibleCount),
                Math.min(12, property.photos_url.length)
            );

            setVisibleCount(newCount);
        };

        const observer = new ResizeObserver(calculateVisibleCount);
        if (containerRef.current) observer.observe(containerRef.current);
        calculateVisibleCount();

        return () => observer.disconnect();
    }, [property.photos_url.length]);

    return (
        <div className="relative w-full my-2">
            {MainCarousel}
            {ThumbnailCarousel}
        </div>
    );
});

// ------------------------------------
// Main Page || HANDLE ALT IMAGE for PLACEHOLDER
// ------------------------------------
export default function PropiedadPage({ property }) {
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:px-6 lg:px-8 min-h-[1000px]">

            <div className="flex flex-col items-center w-full gap-1 text-center border border-background">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-greener mt-1">
                    {property.title}
                </h1>
                <h2 className="flex pr-4 sm:pr-8 items-center text-lg sm:text-xl">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="">{property.barrioRef.name}</div>
                </h2>
            </div>

            <CarouselComponent property={property} />

            <div className="flex flex-col xl:flex-row justify-center gap-4 sm:gap-8">
                <PropertyDescription property={property} />
                <PropertyBroucher property={property} />
            </div>

        </div>
    );
}
