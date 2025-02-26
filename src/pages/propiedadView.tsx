"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Custom components
import { PropertyBroucher } from "@/components/PropertyPageBrochure";
import { PropertyDescription } from "@/components/PropertyDescription";
import { IconPlano } from "@/utils/svgs";
import { Property } from "#/backend/types";

// -------------------- SWIPER CAROUSEL --------------------
function PropertySwiper({ images }: { images: { url: string; width?: number; height?: number }[] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto mb-4">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                effect="fade"
                loop
                className="w-full h-[300px] sm:h-[450px]"
            >
                {images.map((photo, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-[300px] sm:h-[450px]">
                            <Image
                                src={photo.url}
                                alt={`Property Photo ${idx + 1}`}
                                fill
                                sizes="100vw"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

// -------------------- TITLE --------------------
const PropertyTitle = ({ property }: { property: Property }) => {
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

// -------------------- INFO SECTION --------------------
const PropertyInfo = ({ property, togglePlano }: { property: Property; togglePlano: () => void }) => {
    return (
        <div className="flex flex-col xl:flex-row justify-center gap-2 sm:gap-8">
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

// -------------------- MAIN PAGE --------------------
const PropertyPage = ({ property }: { property: Property }) => {
    if (!property || !property.photos_url) return <>No photos found</>;

    const togglePlano = () => {
        if (property.plano_url?.url) {
            // Handle plano opening (if you want to use lightbox later)
            console.log("Open Plano", property.plano_url.url);
        }
    };

    return (
        <div className="mx-auto p-2 sm:px-6 lg:px-8 max-w-7xl mb-8">
            {/* Swiper Carousel */}
            <PropertySwiper images={property.photos_url} />

            {/* Title */}
            <PropertyTitle property={property} />

            {/* Description + Brochure + Plano */}
            <PropertyInfo property={property} togglePlano={togglePlano} />
        </div>
    );
};

export default PropertyPage;