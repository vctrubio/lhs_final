"use client";
import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { getBathrooms, getBedrooms } from "@/utils/utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Bed,
    Bath,
    MapPin,
    Share2,
    Wind,
    Flame,
    Building2,
    Home,
    User,
    Package,
    Car,
    Phone,
    Ruler,
    DraftingCompass,
    Sun,
} from "lucide-react";

function AmenitiesSection({ amenities, reformado }) {
    // Handle reformado status separately
    const reformadoStatus = {
        icon: Home,
        label: reformado ? 'Reformado' : 'Para reformar',
    };

    // Only process amenities if they exist
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

    console.log('amenities, ', amenities)
    console.log('availableAmenities, ', availableAmenities)

    return (
        <div className="border-t pt-2">
            <h3 className="font-serif text-xl text-white mb-2">
                Características
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {/* Show reformado status first */}
                <div className="flex items-center gap-2">
                    <reformadoStatus.icon className={`w-5 h-5 ${reformado ? 'text-[#B8860B]' : 'text-gray-400'}`} />
                    <span className="text-white">{reformadoStatus.label}</span>
                </div>

                {/* Show other amenities only if they exist */}
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

export default function PropiedadPage({ property }) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    console.log('popo, ', property)
    // Settings for main slider
    const mainSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2,
    };

    // Settings for thumbnail slider
    const thumbSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: nav1,
        centerMode: true,
        focusOnSelect: true,
        arrows: true,
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Image Gallery Section */}
            <div className="mb-12">
                {/* Main Image Slider */}
                <div className="relative rounded-t-lg">
                    <Slider
                        {...mainSettings}
                        ref={(slider1) => setNav1(slider1)}
                        className="aspect-[16/9]"
                    >
                        {property.photos_url.map((image, index) => (
                            <div key={index} className="relative aspect-[16/9]">
                                <Image
                                    src={image}
                                    alt={`${property.title} - View ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Thumbnail Slider */}
                <div className="rounded-b-lg p-4">
                    <Slider
                        {...thumbSettings}
                        ref={(slider2) => setNav2(slider2)}
                        className="thumbnail-slider"
                    >
                        {property.photos_url.map((image, index) => (
                            <div
                                key={index}
                                className="px-1"
                            >
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Property Details */}
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column */}
                <div className="lg:col-span-2">

                    <h1 className="font-serif text-4xl md:text-5xl text-[#14213D] mb-4 px-4">
                        {property.title}
                    </h1>

                    <div className="flex items-center text-gray-600 mb-8 px-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{property.barrioRef.name}</span>
                    </div>

                    {/* Property Stats */}
                    {/* //todo - balcones */}
                    <div className="grid grid-cols-4 gap-8 mb-12 px-4">
                        <div className="flex items-center">
                            <Bed className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Dormitorios En Suite</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.dormitoriosSuite}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Bed className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Dormitorios</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.dormitorios}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Bath className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Baños</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.banos}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Bath className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Aseos</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.aseo}</p>
                            </div>
                        </div>


                        <div className="flex items-center">
                            <Bath className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Terrazas</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.patio}</p>
                            </div>
                        </div>

                        {property.charRef.balcones > 0 && (
                            <div className="flex items-center">
                                <Sun className="w-6 h-6 text-[#B8860B] mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Balcones</p>
                                    <p className="text-lg font-semibold text-[#14213D]">{property.charRef.balcones}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center">
                            <Ruler className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">M²</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.metrosCuadradros}</p>
                            </div>
                        </div>

                        {/* <div className="flex items-center">
                            <a href={property.plano_url} target="_blank" rel="noreferrer">
                                <DraftingCompass className="w-6 h-6 text-[#B8860B] mr-3" />
                            </a>
                            <div>
                                <p className="text-sm text-gray-500">Click Para Descargar Plano</p>
                            </div>
                        </div> */}

                    </div>

                    {/* Description */}
                    <div className="text-gray-600 leading-relaxed mb-12 px-2">
                        {property.description}
                    </div>

                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-[#14213D] rounded-xl shadow-xl p-6">
                        {/* Price Section */}
                        <div className="mb-2">
                            <span className="text-lg text-white">Precio</span>
                            <div className="text-4xl font-serif text-white mt-2" style={{ letterSpacing: '1px' }}>
                                €{property.precio.toLocaleString('de-DE')}
                            </div>

                            <div className="space-y-2 pt-3">
                                {property.precioIbi > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">+ IBI</span>
                                        <span className="text-gray-600 font-medium">€{property.precioIbi.toLocaleString('de-DE')}/año</span>
                                    </div>
                                )}
                                {property.precioComunidad > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">+ Gastos de Comunidad</span>
                                        <span className="text-gray-600 font-medium">€{property.precioComunidad.toLocaleString('de-DE')}/mes</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Amenities Section */}
                        <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />

                        {/* Action Buttons */}
                        <div className="mt-8 space-y-3">
                            <button className="w-full bg-[#14213D] text-white py-4 rounded-lg hover:bg-[#1a2b4d] transition-colors flex items-center justify-center gap-2 hover:bg-opacity-80">
                                <Phone className="w-5 h-5" />
                                <span>Contactar</span>
                            </button>
                            <button className="w-full bg-[#14213D] text-white py-4 rounded-lg hover:bg-[#1a2b4d] transition-colors flex items-center justify-center gap-2 hover:bg-opacity-80">
                                <Share2 className="w-5 h-5" />
                                <span>Compatir</span>
                            </button>
                            <button className="w-full bg-[#B8860B] text-white py-4 rounded-lg hover:bg-[#9a7209] transition-colors">
                                Descargar Plano
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

