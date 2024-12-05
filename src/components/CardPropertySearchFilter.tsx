'use client'
import React, { useEffect, useState } from "react";
import { CardProperty } from '@/components/PropertyCard';
import { Property } from "#/backend/types";
import { getBathrooms } from "@/utils/utils";
import { useSharedQueryState } from "#/backend/nuqs";

//for server side {params, searchParams} as props
export const CardPropertySearchFilter = ({ entries }: { entries: Property[] }) => {
    const [filterProperties, setFilterProperties] = useState<Property[]>(entries);

    const {
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradrosMaximo,
        metrosCuadradrosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar,
        sortOption, // Get sortOption from shared state
    } = useSharedQueryState();

    const [cssStateHover, setCssStateHover] = useState(false);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);

    useEffect(() => {
        const isAnyFilterActive = [
            title,
            banosMaximo,
            banosMinimo,
            dormitoriosMaximo,
            dormitoriosMinimo,
            metrosCuadradrosMaximo,
            metrosCuadradrosMinimo,
            precioMaximo,
            precioMinimo,
            includeBarrios,
            flagReformado,
            flagSinReformar
        ].some(filter => {
            if (typeof filter === 'boolean') {
                return filter;
            }
            return filter !== undefined && filter !== '';
        });

        setCssStateHover(isAnyFilterActive);
    }, [
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradrosMaximo,
        metrosCuadradrosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar
    ]);

    useEffect(() => {
        let updateProperty = [...entries];

        if (title) {
            updateProperty = updateProperty.filter(house =>
                house.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (banosMinimo) {
            updateProperty = updateProperty.filter(property => getBathrooms(property) >= parseInt(banosMinimo));
        }

        if (banosMaximo) {
            updateProperty = updateProperty.filter(property => getBathrooms(property) <= parseInt(banosMaximo));
        }

        if (dormitoriosMinimo) {
            updateProperty = updateProperty.filter(property => property.charRef.dormitorios >= parseInt(dormitoriosMinimo));
        }

        if (dormitoriosMaximo) {
            updateProperty = updateProperty.filter(property => property.charRef.dormitorios <= parseInt(dormitoriosMaximo));
        }

        if (metrosCuadradrosMinimo) {
            updateProperty = updateProperty.filter(property => property.charRef.metrosCuadradros >= parseInt(metrosCuadradrosMinimo));
        }

        if (metrosCuadradrosMaximo) {
            updateProperty = updateProperty.filter(property => property.charRef.metrosCuadradros <= parseInt(metrosCuadradrosMaximo));
        }

        if (precioMinimo) {
            updateProperty = updateProperty.filter(property => property.precio >= parseFloat(precioMinimo) * 1000000);
        }

        if (precioMaximo) {
            updateProperty = updateProperty.filter(property => property.precio <= parseFloat(precioMaximo) * 1000000);
        }

        if (includeBarrios && includeBarrios.length > 0) {
            updateProperty = updateProperty.filter(property => includeBarrios.includes(property.barrioRef?.name));
        }

        if (flagReformado) {
            updateProperty = updateProperty.filter(property => property.reformado);
        }

        if (flagSinReformar) {
            updateProperty = updateProperty.filter(property => !property.reformado);
        }

        // Apply sorting based on sortOption
        const sortedProperties = [...updateProperty].sort((a, b) => {
            switch (sortOption) {
                case 'precioAsc':
                    return a.precio - b.precio;
                case 'precioDesc':
                    return b.precio - a.precio;
                case 'dormitoriosAsc':
                    if (a.charRef.dormitorios === b.charRef.dormitorios) {
                        return getBathrooms(a) - getBathrooms(b);
                    }
                    return a.charRef.dormitorios - b.charRef.dormitorios;
                case 'dormitoriosDesc':
                    if (a.charRef.dormitorios === b.charRef.dormitorios) {
                        return getBathrooms(b) - getBathrooms(a);
                    }
                    return b.charRef.dormitorios - a.charRef.dormitorios;
                case 'banosAsc':
                    if (getBathrooms(a) === getBathrooms(b)) {
                        return a.charRef.dormitorios - b.charRef.dormitorios;
                    }
                    return getBathrooms(a) - getBathrooms(b);
                case 'banosDesc':
                    if (getBathrooms(a) === getBathrooms(b)) {
                        return b.charRef.dormitorios - a.charRef.dormitorios;
                    }
                    return getBathrooms(b) - getBathrooms(a);
                case 'metrosAsc':
                    return a.charRef.metrosCuadradros - b.charRef.metrosCuadradros;
                case 'metrosDesc':
                    return b.charRef.metrosCuadradros - a.charRef.metrosCuadradros;
                case 'barrioAsc':
                    return (a.barrioRef?.name || '').localeCompare(b.barrioRef?.name || '');
                case 'barrioDesc':
                    return (b.barrioRef?.name || '').localeCompare(a.barrioRef?.name || '');
                default:
                    return 0; // No sorting
            }
        });

        setFilterProperties(sortedProperties);
        setUniqueBoy(sortedProperties.length === 1);
    }, [
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradrosMaximo,
        metrosCuadradrosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar,
        sortOption, // Add sortOption to dependencies
        entries
    ]);

    return (
        <>
            <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                {filterProperties.length === 0 ? (
                    <div className="flex justify-center flex-col m-auto">
                        <p className="text-center">No encontramos lo que buscas</p>
                    </div>
                ) : (
                    filterProperties.map((entry: Property) => (
                        <CardProperty property={entry} key={entry.title} cssStateHover={cssStateHover} />
                    ))
                )}
            </div>
        </>
    );
};