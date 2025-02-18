"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PropertyBroucher } from "./PropertyPageBrochure";
import { PropertyDescription } from "./PropertyDescription";
import { MapPin } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import { IconPlano } from "@/utils/svgs";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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



const CarouselComponent = React.memo(function CarouselComponent({ property, currentIndex, setCurrentIndex, openLightbox, autoPlayEnabled }) {
    const thumbnailsRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!thumbnailsRef.current) return;

        const thumbnailWidth = 84;
        const gap = 6;
        const centerOffset = Math.floor(6 / 2);
        const scrollPosition = Math.max(
            0, (currentIndex - centerOffset) * (thumbnailWidth + gap)
        );

        thumbnailsRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
    }, [currentIndex]);

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
        transitionTime: 300,
        animationHandler: "slide",
    };

    return (
        <div className="relative w-full my-2">
            <Carousel
                {...carouselConfig}
                selectedItem={currentIndex}
                onChange={setCurrentIndex}
            >
                {property.photos_url.map((image, index) => (
                    <div key={index} className="relative h-[300px] sm:h-[500px] flex items-center justify-center cursor-zoom-in" onClick={() => openLightbox(index)}>
                        <Image src={image.url} fill alt={`${property.title} ${index + 1}`} className="object-contain" priority={index === 0} loading={index === 0 ? "eager" : "lazy"} />
                    </div>
                ))}
            </Carousel>

            <div ref={containerRef} className="relative px-2 sm:px-4 py-2 mx-auto">
                <div ref={thumbnailsRef} className="flex gap-1 sm:gap-2 overflow-x-hidden scroll-smooth mx-auto py-2 px-1 border"
                    style={{ width: '50%' }}
                >
                    {property.photos_url.map((image, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 relative rounded overflow-hidden transition-all duration-300 transform hover:scale-105 ${currentIndex === index ? "ring-2 ring-[#B8860B] ring-offset-1 sm:ring-offset-2 shadow-md" : "opacity-70 hover:opacity-100"}`}>
                            <Image src={image.url} fill alt={`${property.title} sm-${index + 1}`} className="object-cover" loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

//NOTE: when open toggleUrl, the index goes to 0 without respecting what it once was...
export default function PropiedadPage({ property }) {
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
            setCurrentIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
        }
    };

    return (
        <div className="mx-auto p-2 sm:px-6 lg:px-8 border-4">
            <div className="flex flex-col items-center w-full gap-1 text-center border border-background">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-greener mt-1">{property.title}</h1>
                <h2 className="flex pr-4 sm:pr-8 items-center text-lg sm:text-xl">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div>{property.barrioRef.name}</div>
                </h2>
            </div>

            <CarouselComponent
                property={property}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                openLightbox={openLightbox}
                autoPlayEnabled={autoPlayEnabled} // Pass autoPlay control
            />

            <div className="flex flex-col xl:flex-row justify-center gap-4 sm:gap-8">
                <div>
                    <PropertyDescription property={property} />
                    {property.plano_url?.url && (
                        <button
                            onClick={togglePlano}
                            className="flex items-center gap-2 border-greenish border-2 rounded-2xl mx-auto p-4 w-28 cursor-pointer hover:bg-greenish hover:border-background"
                        >
                            <IconPlano />
                            <span>Plano</span>
                        </button>
                    )}
                </div>
                <PropertyBroucher property={property} />
            </div>

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
