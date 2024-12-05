"use client";
//discaerd later
import { useState } from "react";
import { getBathrooms } from "@/utils/utils";
import {
    Bed,
    Bath,
    MapPin,
    // Heart,
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
} from "lucide-react";

function AmenitiesSection({ amenities, reformado }) {
    // Handle reformado status separately
    const reformadoStatus = {
        icon: Home,
        label: reformado ? 'Reformado' : 'Para reformar',
    };

    // Only process amenities if they exist
    const availableAmenities = amenities ? [
        { icon: Wind, label: 'AC', value: amenities.AC },
        { icon: Flame, label: 'Calefacción', value: amenities.Heating },
        { icon: Building2, label: 'Terraza', value: amenities.Rooftop },
        { icon: Home, label: 'Amueblado', value: amenities.Furnished },
        { icon: User, label: 'Portero', value: amenities.Portero },
        { icon: Package, label: 'Trastero', value: amenities.Trastero },
        { icon: Building2, label: 'Ascensor', value: amenities.Elevator },
        { icon: Car, label: 'Parking', value: amenities.Parking },
    ].filter(amenity => amenity.value) : [];

    return (
        <div className="border-t pt-2">
            <h3 className="font-serif text-xl text-[#14213D] mb-2">
                Características
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {/* Show reformado status first */}
                <div className="flex items-center gap-2">
                    <reformadoStatus.icon className={`w-5 h-5 ${reformado ? 'text-[#B8860B]' : 'text-gray-400'}`} />
                    <span className="text-gray-600">{reformadoStatus.label}</span>
                </div>

                {/* Show other amenities only if they exist */}
                {availableAmenities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-[#B8860B]" />
                        <span className="text-gray-600">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function PropiedadPage({ property }) {
    console.log('property check from Page', property);

    const [activeImage, setActiveImage] = useState(0);
    const images = property.photos_url.slice(0, 4);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Image Gallery Section */}
            <div className="mb-12">
                {/* Main Image */}
                <div className="relative rounded-t-lg">
                    <div className="aspect-[16/9] relative">
                        <img
                            src={images[activeImage]}
                            alt={property.title}
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </div>

                </div>

                {/* Thumbnails */}
                <div className="rounded-b-lg p-4">
                    <div className="grid grid-cols-4 gap-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer overflow-hidden rounded-lg aspect-video ${activeImage === index
                                    ? "ring-2 ring-[#B8860B] ring-offset-2"
                                    : "opacity-70 hover:opacity-100"
                                    }`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={image}
                                    alt={`Property view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
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
                    <div className="grid grid-cols-3 gap-8 mb-12 px-4">
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
                                <p className="text-lg font-semibold text-[#14213D]">{getBathrooms(property)}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Ruler className="w-6 h-6 text-[#B8860B] mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">M²</p>
                                <p className="text-lg font-semibold text-[#14213D]">{property.charRef.metrosCuadradros}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}

                    <div className="text-gray-600 leading-relaxed mb-12 px-2">
                        {property.description}
                    </div>

                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-white rounded-xl shadow-xl p-6">
                        {/* Price Section */}
                        <div className="mb-2">
                            <span className="text-lg text-gray-500">Precio</span>
                            <div className="text-4xl font-serif text-[#14213D] mt-2" style={{ letterSpacing: '1px' }}>
                                €{property.precio.toLocaleString('de-DE')}
                            </div>

                            {property.precioIbi > 0 || property.precioComunidad > 0 && (
                                <div className="space-y-2 border-t border-gray-100 pt-3">
                                    {property.precioIbi > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">+ IBI</span>
                                            <span className="text-gray-600 font-medium">€{property.precioIbi.toLocaleString('de-DE')}/year</span>
                                        </div>
                                    )}
                                    {property.precioComunidad > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">+ Comunidad</span>
                                            <span className="text-gray-600 font-medium">€{property.precioComunidad.toLocaleString('de-DE')}/month</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Amenities Section */}
                        <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />

                        {/* Action Buttons */}
                        <div className="mt-8 space-y-3">
                            <button className="w-full bg-[#14213D] text-white py-4 rounded-lg hover:bg-[#1a2b4d] transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5" />
                                <span>Contactar</span>
                            </button>
                            <button className="w-full border-2 border-[#14213D] text-[#14213D] py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                <span>Compatir</span>
                            </button>
                            <button className="w-full bg-[#B8860B] text-white py-4 rounded-lg hover:bg-[#9a7209] transition-colors">
                                Me gusta! (busacr similares)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

