
import { Property } from "#/backend/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { IconPrice } from "@/utils/svgs";
import { Bed, Bath, Ruler } from 'lucide-react';


export default function SideCardProperty({ property }: { property: Property }) {

    return (
        <Link href={`/propiedades/${property.url}`} className="flex">
            <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-full flex gap-3 p-3 border border-mac rounded-lg cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
                <div className="relative w-[100px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden group">
                    <Image
                        src={property.cover_url[0]}
                        alt={property.title}
                        fill
                        placeholder="blur"
                        blurDataURL={property.cover_url[0]}
                        className="object-cover"
                    />

                </div>

                <div className="flex flex-col justify-between flex-1">
                    <div className="flex flex-col flex-grow group relative">
                        <h3 className="font-serif text-xl text-black cursor-pointer">
                            {property.title}
                        </h3>
                    </div>

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
        </Link>

    );
} 