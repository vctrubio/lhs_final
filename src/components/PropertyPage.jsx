"use client";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IconPrice } from "@/utils/svgs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Bed, Bath, MapPin, Share2, Wind, Flame, Building2,
    Home, User, Package, Car, Phone, Ruler, BedDouble,
    Sun, Toilet, Fence,
} from "lucide-react";
import ShareModal from './ShareModal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function AmenitiesSection({ amenities, reformado }) {
    const reformadoStatus = {
        icon: Home,
        label: reformado ? 'Reformado' : 'Para reformar',
    };

    const availableAmenities = amenities ? [
        { icon: Home, label: 'Amueblado', value: amenities.furnished },
        { icon: Wind, label: 'AC', value: amenities.ac },
        { icon: Flame, label: 'Calefacción', value: amenities.heating },
        { icon: Building2, label: 'Terraza', value: amenities.rooftop },
        { icon: User, label: 'Portero', value: amenities.portero },
        { icon: Package, label: 'Trastero', value: amenities.trastero },
        { icon: Building2, label: 'Ascensor', value: amenities.elevator },
        { icon: Car, label: 'Parking', value: amenities.parking },
    ].filter(amenity => amenity.value) : [];

    return (
        <div className="border-t pt-2">
            <h3 className="font-serif text-xl text-white mb-2">
                Características
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <reformadoStatus.icon className={`w-5 h-5 ${reformado ? 'text-[#B8860B]' : 'text-gray-400'}`} />
                    <span className="text-white">{reformadoStatus.label}</span>
                </div>

                {availableAmenities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-[#B8860B]" />
                        <span className="text-white">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

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
                <div key={label} className="grid grid-rows-2 min-w-[100px] text-left">
                    <p className="text-sm text-gray-500 mb-1">
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

function PropertySidebar({ property, setIsShareModalOpen }) {
    return (
        <div className="lg:col-span-1" style={{ minWidth: '400px', maxWidth: '600px' }}>
            <div className="sticky top-8 bg-[#14213D] rounded-xl shadow-xl p-6">
                <div className="mb-2">
                    <span className="text-xl text-white">Precio</span>
                    <div className="text-4xl font-serif text-white flex" style={{ letterSpacing: '1px' }}>
                        <IconPrice stroke="white" />{property.precio.toLocaleString('es-ES')}
                    </div>

                    <div className="space-y-2 pt-3">
                        {property.precioIbi > 0 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">+ IBI</span>
                                <span className="text-gray-600 font-medium">€{property.precioIbi.toLocaleString('es-ES')}/año</span>
                            </div>
                        )}
                        {property.precioComunidad > 0 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">+ Gastos de Comunidad</span>
                                <span className="text-gray-600 font-medium">€{property.precioComunidad.toLocaleString('es-ES')}/mes</span>
                            </div>
                        )}
                    </div>
                </div>

                <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />

                <div className="mt-8 space-y-3">
                    <button
                        onClick={() => {
                            const propertyUrl = `https://www.lhsconcept.com/propiedades/${property.url}`;
                            const message = `Hola, estoy interesado en esta propiedad: ${property.title}\n${propertyUrl}`;
                            const whatsappUrl = `https://wa.me/34616746971?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                        }}
                        className="w-full bg-[#14213D] text-white py-4 rounded-lg hover:bg-[#1a2b4d] transition-colors flex items-center justify-center gap-2 hover:bg-opacity-80 border"
                    >
                        <Phone className="w-5 h-5" />
                        <span>Contactar</span>
                    </button>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="w-full bg-[#14213D] text-white py-4 rounded-lg hover:bg-[#1a2b4d] transition-colors flex items-center justify-center gap-2 hover:bg-opacity-80 border"
                    >
                        <Share2 className="w-5 h-5" />
                        <span>Compartir</span>
                    </button>
                    <button
                        className="w-full bg-[#B8860B] text-white py-4 rounded-lg hover:bg-[#9a7209] transition-colors"
                        onClick={() => window.open(property.plano_url, '_blank')}
                    >
                        Descargar Plano
                    </button>
                </div>
            </div>
        </div>
    );
}

function PropertyDetails({ property }) {
    return (
        <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl text-[#14213D] mb-4 px-4">
                {property.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-8 px-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.barrioRef.name}</span>
            </div>

            <PropertyStats property={property} />

            <div className="text-gray-600 leading-relaxed mb-12 px-2">
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

    // Calculate visible thumbnails
    useEffect(() => {
        const calculateVisibleCount = () => {
            if (!containerRef.current) return;

            requestAnimationFrame(() => {
                const containerWidth = containerRef.current.offsetWidth;
                const thumbnailWidth = 84; // thumbnail (80px) + margin (4px)
                const gap = 8; // gap-2
                const padding = 64; // px-8 (32px each side)

                const availableWidth = containerWidth - padding;
                const possibleCount = Math.floor(availableWidth / (thumbnailWidth + gap));

                // Keep between 3 and 12 thumbnails
                const newCount = Math.min(
                    Math.max(3, possibleCount),
                    Math.min(12, property.photos_url.length)
                );

                if (newCount !== visibleCount) {
                    setVisibleCount(newCount);
                }
            });
        };

        calculateVisibleCount();

        // Setup ResizeObserver for container size changes
        const observer = new ResizeObserver(() => {
            calculateVisibleCount();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Add window resize listener
        window.addEventListener('resize', calculateVisibleCount);
        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', calculateVisibleCount);
        };
    }, [property.photos_url.length, visibleCount]);

    // Handle thumbnail scrolling
    useEffect(() => {
        if (!thumbnailsRef.current) return;

        const thumbnailWidth = 84; // width + margin
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

    const MainCarousel = () => (
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
                autoPlaySpeed={6000}
                onHoverPause={true}
                renderArrowPrev={(clickHandler, hasPrev) => (
                    <button
                        onClick={clickHandler}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-200 rounded-r-lg opacity-0 group-hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                    <button
                        onClick={clickHandler}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-all duration-200 rounded-l-lg opacity-0 group-hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                )}
            >
                {property.photos_url.map((image, index) => (
                    <div key={index} className="relative h-[600px] flex items-center justify-center">
                        <Image
                            src={image}
                            fill
                            alt={`Property Image ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );

    const ThumbnailCarousel = () => (
        <div ref={containerRef} className="relative px-8 py-2">
            <div
                ref={thumbnailsRef}
                className="flex gap-2 overflow-x-hidden scroll-smooth mx-auto py-2"
                style={{
                    maxWidth: `${(visibleCount * 80) + ((visibleCount - 1) * 8)}px`,
                    transition: 'max-width 0.3s ease-in-out'
                }}
            >
                {property.photos_url.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 w-20 h-14 relative rounded overflow-hidden transition-all outline-none focus:outline-none
                            ${currentIndex === index
                                ? 'ring-2 ring-[#B8860B]'
                                : 'opacity-70 hover:opacity-100'}`}
                    >
                        <Image
                            src={image}
                            fill
                            alt={`Thumbnail ${index + 1}`}
                            className="object-cover"
                            sizes="80px"
                            draggable={false}
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="relative w-full mb-8">
            <MainCarousel />
            <ThumbnailCarousel />
        </div>
    );
}


export default function PropiedadPage({ property }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CarouselComponent property={property} />

            <div className="flex flex-col xl:flex-row justify-around">
                <PropertyDetails property={property} />
                <PropertySidebar
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

