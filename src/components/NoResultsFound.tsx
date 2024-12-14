import React from "react";
import { Property } from "#/backend/types";
import { CardProperty } from '@/components/PropertyCard';
import { StarIcon, AdjustmentsHorizontalIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Bed, Bath, Ruler } from "lucide-react";

interface NoResultsFoundProps {
    nuqsParams: any;
    entries: Property[];
}

export const NoResultsFound = ({ nuqsParams }: NoResultsFoundProps) => {
    const { title, prices, bathrooms, bedrooms, m2, barrios } = nuqsParams;

    return (
        <div className="flex justify-center flex-col m-auto p-8 text-center max-w-4xl">
            <div className="mb-8">
                <HomeIcon className="h-16 w-16 mx-auto mb-4 text-gold-500 animate-pulse" />
                <h3 className="text-2xl font-playfair mb-2">No encontramos propiedades</h3>

            </div>

            <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <StarIcon className="h-5 w-5 text-gold-600" />
                    <p className="text-lg font-medium">Parámetros de búsqueda actuales:</p>
                </div>
                <ul className="space-y-2 text-left">
                    {title && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Titulo:</span> {title}
                        </li>
                    )}
                    {barrios && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Barrios:</span> {barrios}
                        </li>
                    )}
                    {(prices.min || prices.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Precio:</span>
                            {prices.min || '0'}M - {prices.max || '∞'}M
                        </li>
                    )}
                    {(bathrooms.min || bathrooms.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Bath className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Baños:</span>
                            {bathrooms.min || '0'} - {bathrooms.max || '∞'}
                        </li>
                    )}
                    {(bedrooms.min || bedrooms.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Bed className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Dormitorios:</span>
                            {bedrooms.min || '0'} - {bedrooms.max || '∞'}
                        </li>
                    )}
                    {(m2.min || m2.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Ruler className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Metros²:</span>
                            {m2.min || '0'} - {m2.max || '∞'}
                        </li>
                    )}
                </ul>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4 text-gold-800">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <p className="text-sm italic">
                    Ajusta los filtros para encontrar más opciones
                </p>
            </div>


        </div>
    );
}; 