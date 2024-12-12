'use client'
import React, { useEffect, useState } from "react";
import { CardProperty } from '@/components/PropertyCard';
import { Property } from "#/backend/types";
import { formatPrice, getBathrooms, getBedrooms, getMetersSquare } from "@/utils/utils";
import { useQueryState, } from 'nuqs'

function NuqsManager() {
    const [queryTitle] = useQueryState('title');
    const [queryPriceMin] = useQueryState('precioMin');
    const [queryPriceMax] = useQueryState('precioMax');
    const [queryBathroomMin] = useQueryState('banosMin');
    const [queryBathroomMax] = useQueryState('banosMax');
    const [queryBedroomMin] = useQueryState('dormitoriosMin');
    const [queryBedroomMax] = useQueryState('dormitoriosMax');
    const [queryMetersSquareMin] = useQueryState('metrosMin');
    const [queryMetersSquareMax] = useQueryState('metrosMax');


    return {
        hasParams: [queryTitle, queryPriceMin, queryPriceMax, queryBathroomMin, queryBathroomMax, queryBedroomMin, queryBedroomMax, queryMetersSquareMin, queryMetersSquareMax].some(param => param !== null && param !== ''),

        //use effect- but not really working
        paramsStateChanged: [queryTitle, queryPriceMin, queryPriceMax, queryBathroomMin, queryBathroomMax, queryBedroomMin, queryBedroomMax, queryMetersSquareMin, queryMetersSquareMax].some((param, index, array) => {
            if (index === 0) return param !== array[index];
            return param !== null && param !== '';
        }),
        
        params: {
            title: queryTitle,
            prices: {
                min: queryPriceMin,
                max: queryPriceMax
            },
            bathrooms: {
                min: queryBathroomMin,
                max: queryBathroomMax
            },
            bedrooms: {
                min: queryBedroomMin,
                max: queryBedroomMax
            },
            m2: {
                min: queryMetersSquareMin,
                max: queryMetersSquareMax
            }
        }
    }
}



//for server side {params, searchParams} as props
export const CardPropertySearchFilter = ({ entries }: { entries: Property[] }) => {
    const [filterProperties, setFilterProperties] = useState<Property[]>(entries);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);
    const [cssStateHover, setCssStateHover] = useState(false);

    const nuqs = NuqsManager();

    useEffect(() => {
        let updatedProperties = [...entries];

        if (nuqs.hasParams) {
            if (nuqs.params.title) {
                console.log('testing:log-- title-- ', nuqs.params.title);
                updatedProperties = updatedProperties.filter(property => {
                    return property.title.toLowerCase().includes(nuqs.params.title!.toLowerCase())
                });
            }
            if (nuqs.params.prices.min) {
                console.log('testing:log-- prices.min-- ', nuqs.params.prices.min);
                updatedProperties = updatedProperties.filter(property => {
                    const propertyPrice = formatPrice(property.precio);
                    console.log('Property Price Min:', propertyPrice, 'of title: ' + property.title + ' vs Min Price:', parseFloat(nuqs.params.prices.min!));
                    return propertyPrice >= parseFloat(nuqs.params.prices.min!);
                });
            }
            if (nuqs.params.prices.max) {
                console.log('testing:log-- prices.max-- ', nuqs.params.prices.max);
                updatedProperties = updatedProperties.filter(property => {
                    const propertyPrice = formatPrice(property.precio);
                    console.log('Property Price:', propertyPrice, 'vs Max Price:', parseFloat(nuqs.params.prices.max!));
                    return propertyPrice <= parseFloat(nuqs.params.prices.max!);
                });
            }

            if (nuqs.params.bathrooms.min) {
                console.log('testing:log-- bathrooms.min-- ', nuqs.params.bathrooms.min);
                updatedProperties = updatedProperties.filter(property => {
                    return getBathrooms(property) >= parseInt(nuqs.params.bathrooms.min!)
                });
            }
            if (nuqs.params.bathrooms.max) {
                console.log('testing:log-- bathrooms.max-- ', nuqs.params.bathrooms.max);
                updatedProperties = updatedProperties.filter(property => {
                    return getBathrooms(property) <= parseInt(nuqs.params.bathrooms.max!)
                });
            }

            if (nuqs.params.bedrooms.min) {
                console.log('testing:log-- bedrooms.min-- ', nuqs.params.bedrooms.min);
                updatedProperties = updatedProperties.filter(property => {
                    return getBedrooms(property) >= parseInt(nuqs.params.bedrooms.min!)
                });
            }
            if (nuqs.params.bedrooms.max) {
                console.log('testing:log-- bedrooms.max-- ', nuqs.params.bedrooms.max);
                updatedProperties = updatedProperties.filter(property => {
                    return getBedrooms(property) <= parseInt(nuqs.params.bedrooms.max!)
                });
            }

            if (nuqs.params.m2.min) {
                console.log('testing:log-- m2.min-- ', nuqs.params.m2.min);
                updatedProperties = updatedProperties.filter(property => {
                    return getMetersSquare(property) >= parseInt(nuqs.params.m2.min!)
                });
            }
            if (nuqs.params.m2.max) {
                console.log('testing:log-- m2.max-- ', nuqs.params.m2.max);
                updatedProperties = updatedProperties.filter(property => {
                    return getMetersSquare(property) <= parseInt(nuqs.params.m2.max!)
                });
            }
        }

        // setFilterProperties(updatedProperties);


        if (filterProperties.length <= 1) {
            setUniqueBoy(true);
        }
        else {
            setUniqueBoy(false);
        }

        console.log('testing---runthrough---')
        updatedProperties.forEach(property => {
            console.log('Property Title:', property.title, 'Price:', property.precio);
        });


    }, [nuqs.params]); //bug:: atm double rendering

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