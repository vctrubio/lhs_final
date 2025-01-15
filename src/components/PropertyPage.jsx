"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
    Bed, Bath, MapPin, Share2, Wind, Flame, Building2,
    Home, User, Package, Car, Phone, Ruler, BedDouble,
    Sun, Toilet, Fence, Download,
} from "lucide-react";
import ShareModal from './ShareModal';
import { PropertyBroucher } from './PropertyPageBrochure';


//depreciated
function PropertyStats({ property }) {
    const stats = [
        {
            icon: BedDouble,
            label: "Dormitorios En Suite",
            value: property.charRef.dormitoriosSuite,
            singularLabel: "Dormitorio En Suite"
        },
        {
            icon: Bed,
            label: "Dormitorios",
            value: property.charRef.dormitorios,
            singularLabel: "Dormitorio"
        },
        {
            icon: Bath,
            label: "Baños",
            value: property.charRef.banos,
            singularLabel: "Baño"
        },
        {
            icon: Toilet,
            label: "Aseos",
            value: property.charRef.aseo,
            singularLabel: "Aseo"
        },
        {
            icon: Sun,
            label: "Balcones",
            value: property.charRef.balcones,
            singularLabel: "Balcón"
        },
        {
            icon: Fence,
            label: "Terrazas",
            value: property.charRef.patio,
            singularLabel: "Terraza",
            isTerraza: true
        },
        {
            icon: Ruler,
            label: "M²",
            value: property.charRef.metrosCuadradros,
            singularLabel: "M²"
        }
    ];

    return (
        <div className="flex flex-wrap justify-between mb-12 px-4">
            {stats.filter(stat => stat.value > 0).map(({ icon: Icon, label, value, singularLabel, isTerraza }) => (
                <div key={label} className="grid grid-rows-2 min-w-[100px] text-left pt-2 pl-1">
                    <p className="mb-1">
                        {value === 1 ? singularLabel : label}
                    </p>
                    <div className="flex justify-start gap-2 items-center">
                        <Icon className="w-6 h-6 text-[#B8860B]" />
                        {(!isTerraza || value > 1) && (
                            <span className="text-lg font-semibold text-[#14213D]">
                                {value}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function PropertyDetails({ property }) {
    return (
        <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl text-[#14213D] mb-2 px-4 inline-block">
                {property.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-4 px-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.barrioRef.name}</span>
            </div>

            {/* <PropertyStats property={property} /> */}

            <div className="text-gray-600 text-xl leading-relaxed mb-12 px-2">
                {property.description}
            </div>
        </div>
    );
}

function CarouselComponent({ property }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailsRef = useRef(null);
    const containerRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [showPlaceholders, setShowPlaceholders] = useState({});
    const [allThumbnailsLoaded, setAllThumbnailsLoaded] = useState(false);
    const [isInitialMount, setIsInitialMount] = useState(true);

    // Add effect to handle initial mount
    useEffect(() => {
        // Wait a tiny bit before showing anything to prevent the glitch
        const timer = setTimeout(() => {
            setIsInitialMount(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (index) => {
        setImagesLoaded(prev => {
            const newState = {
                ...prev,
                [index]: true
            };

            if (Object.keys(newState).length === property.photos_url.length) {
                setTimeout(() => {
                    setAllThumbnailsLoaded(true);
                }, 500);
            }

            return newState;
        });

        setTimeout(() => {
            setShowPlaceholders(prev => ({
                ...prev,
                [index]: false
            }));
        }, 2000);
    };

    // Initialize placeholders
    useEffect(() => {
        const initialPlaceholders = {};
        property.photos_url.forEach((_, index) => {
            initialPlaceholders[index] = true;
        });
        setShowPlaceholders(initialPlaceholders);
    }, [property.photos_url]);

    const MainCarousel = useMemo(() => (
        <div className="relative w-full h-[600px] group">
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                useKeyboardArrows={true}
                showIndicators={false}
                selectedItem={currentIndex}
                onChange={setCurrentIndex}
                swipeable={true}
                emulateTouch={true}
                swipeScrollTolerance={5}
                preventMovementUntilSwipeScrollTolerance={true}
                autoPlay={true}
                interval={6000}
                stopOnHover={true}
                transitionTime={500}
                animationHandler="fade"
                renderArrowPrev={(clickHandler, hasPrev) => (
                    <button
                        onClick={clickHandler}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-r-lg opacity-0 group-hover:opacity-100 hover:pl-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                    <button
                        onClick={clickHandler}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-l-lg opacity-0 group-hover:opacity-100 hover:pr-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                )}
            >
                {property.photos_url.map((image, index) => (
                    <div key={index} className="relative h-[600px] flex items-center justify-center">
                        {/* Placeholder image */}
                        {showPlaceholders[index] && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/logo-main.jpeg"
                                    fill
                                    alt="Loading placeholder"
                                    className="object-contain"
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRMhISE1IzAnNSM1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                            </div>
                        )}
                        {/* Main image */}
                        <Image
                            src={image}
                            fill
                            alt={`Property Image ${index + 1}`}
                            className={`object-contain transition-opacity duration-1000 ${!showPlaceholders[index] ? 'opacity-100' : 'opacity-0'
                                }`}
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            onLoad={() => handleImageLoad(index)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRMhISE1IzAnNSM1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    ), [property.photos_url, currentIndex, showPlaceholders]);

    // Update ThumbnailCarousel
    const ThumbnailCarousel = useMemo(() => {
        if (!allThumbnailsLoaded) return null;

        return (
            <div ref={containerRef} className="relative px-8 py-2">
                <div
                    ref={thumbnailsRef}
                    className="flex gap-2 overflow-x-hidden scroll-smooth mx-auto py-2 px-1"
                    style={{
                        maxWidth: `${(visibleCount * 80) + ((visibleCount - 1) * 8)}px`,
                    }}
                >
                    {property.photos_url.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-shrink-0 w-20 h-14 relative rounded overflow-hidden transition-all duration-300 transform hover:scale-105
                                ${currentIndex === index
                                    ? 'ring-2 ring-[#B8860B] ring-offset-2 ring-offset-white shadow-lg'
                                    : 'opacity-70 hover:opacity-100 hover:shadow-md'}`}
                        >
                            <Image
                                src={image}
                                fill
                                alt={`Propiedad ${index + 1}`}
                                placeholder="blur"
                                blurDataURL={image}
                                className="object-cover transition-transform duration-300 hover:scale-110"
                                sizes="80px"
                                draggable={false}
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    }, [property.photos_url, visibleCount, currentIndex, allThumbnailsLoaded]);

    // Effect for handling thumbnail scrolling
    useEffect(() => {
        if (!thumbnailsRef.current) return;

        const thumbnailWidth = 84;
        const gap = 8;
        const centerOffset = Math.floor(visibleCount / 2);
        const scrollPosition = Math.max(0,
            (currentIndex - centerOffset) * (thumbnailWidth + gap)
        );

        thumbnailsRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }, [currentIndex, visibleCount]);

    // Effect for calculating visible thumbnails
    useEffect(() => {
        const calculateVisibleCount = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const thumbnailWidth = 84;
            const gap = 8;
            const padding = 64;

            const availableWidth = containerWidth - padding;
            const possibleCount = Math.floor(availableWidth / (thumbnailWidth + gap));

            const newCount = Math.min(
                Math.max(4, possibleCount),
                Math.min(12, property.photos_url.length)
            );

            setVisibleCount(newCount);
        };

        const observer = new ResizeObserver(calculateVisibleCount);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        calculateVisibleCount();

        return () => observer.disconnect();
    }, [property.photos_url.length]);

    return (
        <div className="relative w-full mb-8">
            {/* Placeholder div to reserve space */}
            <div
                className="w-full h-[600px]"
                style={{
                    display: isInitialMount ? 'block' : 'none'
                }}
            />

            {/* Main content */}
            {!isInitialMount && (
                <>
                    {MainCarousel}
                    <div className={`transition-opacity duration-500 ${allThumbnailsLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        {ThumbnailCarousel}
                    </div>
                </>
            )}
        </div>
    );
}


export default function PropiedadPage({ property }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 my-8 sm:px-6 lg:px-8 min-h-[1000px]">
            <CarouselComponent property={property} />

            <div className="flex flex-col xl:flex-row justify-center gap-8 items-start">
                <PropertyDetails property={property} />
                <PropertyBroucher
                    property={property}
                    setIsShareModalOpen={setIsShareModalOpen}
                />
            </div>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title={property.title}
                url={`https://www.lhsconcept.com/propiedades/${property.url}`}
            />
        </div>
    );
}

