'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from 'framer-motion';
import { IconPrice } from "@/utils/svgs";
import { Bed, Bath, Ruler } from 'lucide-react';
import { Property } from "../../backend/types";

export default function SideCardProperty({ property }: { property: Property }) {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex gap-3 p-3 bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
        >
            {/* Image */}
            <div className="relative w-[100px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                    src={property.cover_url[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
                {/* Title container with hover effect */}
                <div className="flex flex-col flex-grow group relative"
                    onClick={() => router.push(`/propiedades/${property.url}`)}>
                    <h3 className="font-serif text-lg text-black cursor-pointer transition-opacity duration-300 group-hover:opacity-0">
                        {property.title}
                    </h3>
                    {/* Hover Price Overlay - Hidden on Mobile */}
                    <div className="absolute hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -mt-3 top-0 right-0 bottom-0 left-0 bg-black/80 rounded-xl">
                        <div className="flex items-center gap-2 text-white">
                            <IconPrice width={32} height={32} stroke="#fff" />
                            <span className="font-serif text-2xl">{(property.precio / 1000000).toFixed(2)}M</span>
                        </div>
                    </div>
                    {/* Mobile Price - Only visible on mobile */}
                    <div className="flex md:hidden items-center gap-1 mt-1">
                        <IconPrice width={20} height={20} />
                        <span className="font-semibold text-[var(--color-green-dark)]">
                            {(property.precio / 1000000).toFixed(2)}M
                        </span>
                    </div>
                </div>

                {/* Features */}
                <div className="flex gap-3 text-[var(--color-green-dark)]/70 text-md">
                    <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {property.charRef.dormitorios}
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        {property.charRef.banos}
                    </span>
                    <span className="flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {property.charRef.metrosCuadradros}m²
                    </span>
                </div>
            </div>
        </motion.div>
    );
} 