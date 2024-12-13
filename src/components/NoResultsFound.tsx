import React from "react";
import { Property } from "#/backend/types";
import { CardProperty } from '@/components/PropertyCard';
import { StarIcon, AdjustmentsHorizontalIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Bed, Bath, Ruler } from "lucide-react";

interface NoResultsFoundProps {
    nuqsParams: any;
    entries: Property[];
    cssStateHover: boolean;
}

export const NoResultsFound = ({ nuqsParams, entries, cssStateHover }: NoResultsFoundProps) => {
    return (
        <div className="flex justify-center flex-col m-auto p-8 text-center max-w-4xl">
            <div className="mb-8">
                <HomeIcon className="h-16 w-16 mx-auto mb-4 text-gold-500 animate-pulse" />
                <h3 className="text-2xl font-playfair mb-2">No encontramos propiedades</h3>
                <p className="text-gray-500 font-light">que coincidan con tus criterios de búsqueda</p>
            </div>
            
            <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <StarIcon className="h-5 w-5 text-gold-600" />
                    <p className="text-lg font-medium">Parámetros de búsqueda actuales:</p>
                </div>
                <ul className="space-y-2 text-left">
                    {nuqsParams.title && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">T��tulo:</span> {nuqsParams.title}
                        </li>
                    )}
                    {(nuqsParams.prices.min || nuqsParams.prices.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Precio:</span> 
                            {nuqsParams.prices.min || '0'} - {nuqsParams.prices.max || '∞'}
                        </li>
                    )}
                    {(nuqsParams.bathrooms.min || nuqsParams.bathrooms.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Bath className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Baños:</span> 
                            {nuqsParams.bathrooms.min || '0'} - {nuqsParams.bathrooms.max || '∞'}
                        </li>
                    )}
                    {(nuqsParams.bedrooms.min || nuqsParams.bedrooms.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Bed className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Dormitorios:</span> 
                            {nuqsParams.bedrooms.min || '0'} - {nuqsParams.bedrooms.max || '∞'}
                        </li>
                    )}
                    {(nuqsParams.m2.min || nuqsParams.m2.max) && (
                        <li className="flex items-center gap-2 text-gray-700">
                            <Ruler className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">Metros²:</span> 
                            {nuqsParams.m2.min || '0'} - {nuqsParams.m2.max || '∞'}
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

            {entries.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-xl font-playfair mb-6">Propiedades destacadas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {entries.slice(0, 3).map((entry: Property) => (
                            <CardProperty 
                                property={entry} 
                                key={entry.title} 
                                cssStateHover={cssStateHover}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 