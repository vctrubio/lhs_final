'use client'
import React, { useEffect, useState } from "react";
import { PropertyCard } from '@/components/cards/PropertyCard';
import { Property } from "#/backend/types";
import { formatPrice, getBathrooms, getBedrooms, getMetersSquare } from "@/utils/utils";
import { NuqsManager } from "#/backend/nuqs";

const CardPropertySearchFilter = ({ entries }: { entries: Property[] }) => {
    const [filterProperties, setFilterProperties] = useState<Property[]>([]);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);
    const [cssStateHover, setCssStateHover] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const nuqs = NuqsManager();

    useEffect(() => {
        setIsLoading(true);
        let updatedProperties = [...entries];

        if (nuqs.hasParams) {
            if (nuqs.params.title) {
                updatedProperties = updatedProperties.filter(property =>
                    property.title.toLowerCase().includes(nuqs.params.title!.toLowerCase()) ||
                    property.barrioRef.name.toLowerCase().includes(nuqs.params.title!.toLowerCase())
                );
            }

            if (nuqs.params.prices.min || nuqs.params.prices.max) {
                updatedProperties = updatedProperties.filter(property => {
                    const propertyPrice = formatPrice(property.precio);
                    const minPrice = nuqs.params.prices.min ? parseFloat(nuqs.params.prices.min) : 0;
                    const maxPrice = nuqs.params.prices.max ? parseFloat(nuqs.params.prices.max) : Infinity;

                    return propertyPrice >= minPrice && propertyPrice <= maxPrice;
                });
            }

            if (nuqs.params.bathrooms.min || nuqs.params.bathrooms.max) {
                updatedProperties = updatedProperties.filter(property => {
                    const bathrooms = getBathrooms(property);
                    const minBaths = nuqs.params.bathrooms.min ? parseInt(nuqs.params.bathrooms.min) : 0;
                    const maxBaths = nuqs.params.bathrooms.max ? parseInt(nuqs.params.bathrooms.max) : Infinity;
                    return bathrooms >= minBaths && bathrooms <= maxBaths;
                });
            }

            if (nuqs.params.bedrooms.min || nuqs.params.bedrooms.max) {
                updatedProperties = updatedProperties.filter(property => {
                    const bedrooms = getBedrooms(property);
                    const minBeds = nuqs.params.bedrooms.min ? parseInt(nuqs.params.bedrooms.min) : 0;
                    const maxBeds = nuqs.params.bedrooms.max ? parseInt(nuqs.params.bedrooms.max) : Infinity;
                    return bedrooms >= minBeds && bedrooms <= maxBeds;
                });
            }

            if (nuqs.params.m2.min || nuqs.params.m2.max) {
                updatedProperties = updatedProperties.filter(property => {
                    const meters = getMetersSquare(property);
                    const minMeters = nuqs.params.m2.min ? parseInt(nuqs.params.m2.min) : 0;
                    const maxMeters = nuqs.params.m2.max ? parseInt(nuqs.params.m2.max) : Infinity;
                    return meters >= minMeters && meters <= maxMeters;
                });
            }

            if (nuqs.params.barrios) {
                const selectedBarrios = nuqs.params.barrios.split(',');
                updatedProperties = updatedProperties.filter(property =>
                    selectedBarrios.includes(property.barrioRef.name)
                );
            }

            setCssStateHover(true);
        }
        else {
            setCssStateHover(false);
        }

        setFilterProperties(updatedProperties);
        setUniqueBoy(updatedProperties.length <= 1);
        setIsLoading(false);

    }, [entries, nuqs.stateChanged, nuqs.hasParams, nuqs.params.title, nuqs.params.prices.min, nuqs.params.prices.max, nuqs.params.bathrooms.min, nuqs.params.bathrooms.max, nuqs.params.bedrooms.min, nuqs.params.bedrooms.max, nuqs.params.m2.min, nuqs.params.m2.max, nuqs.params.barrios]);

    return (
         <div className="flex flex-wrap">
             {isLoading ? (
                <div></div>
            ) : (
                <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                    {filterProperties.length === 0 && isLoading? (
                        <>nada amigo...</>
                    ) : (
                        filterProperties.map((entry: Property) => (
                            <PropertyCard property={entry} key={entry.title} cssStateHover={cssStateHover} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CardPropertySearchFilter;