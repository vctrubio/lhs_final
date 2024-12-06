"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Euro } from 'lucide-react';
import type { Property } from '#/backend/types';

interface Props {
    properties: Property[];
}

export default function PropertyRecommendations({ properties }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto text-center"
            >
                <h2 className="text-4xl font-serif text-[#14213D] mb-4">
                    Propiedades Destacadas
                </h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Descubra nuestra selección de propiedades exclusivas en las zonas más prestigiosas de Madrid
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.slice(0, 3).map((property, index) => (
                        <motion.div
                            key={property.url}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            <Link href={`/propiedades/${property.url}`}>
                                <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={property.photos_url[0]}
                                            alt={property.title}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-500" />
                                    </div>
                                    
                                    <motion.div 
                                        className="p-6"
                                        whileHover={{ y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <h3 className="text-xl font-serif text-[#14213D] mb-2">
                                            {property.title}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>{property.barrioRef.name}</span>
                                            </div>
                                            <div className="flex items-center text-[#B8860B] font-semibold">
                                                <Euro className="w-4 h-4 mr-1" />
                                                <span>{property.precio.toLocaleString('es-ES')}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>{property.charRef.metrosCuadradros} m²</span>
                                            <span>{property.charRef.dormitorios} dormitorios</span>
                                            <span>{property.charRef.banos} baños</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <Link 
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-[#B8860B] text-[#B8860B] rounded-lg hover:bg-[#B8860B] hover:text-white transition-colors"
                    >
                        Ver todas las propiedades
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
} 