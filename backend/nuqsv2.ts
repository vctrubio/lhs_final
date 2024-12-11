'use client'

import { useState, useEffect } from 'react';
import { formatPrice } from '@/utils/utils';
import { useQueryState } from 'nuqs'
import { PropertyParams } from './parsing';


export function INuqs(propertyParams: PropertyParams) {
    const [priceValue, setPriceValue] = useState([0, 0]);
    const [precioMinimo, setPrecioMinimo] = useQueryState('precioMin', { defaultValue: '' });
    const [precioMaximo, setPrecioMaximo] = useQueryState('precioMax', { defaultValue: '' });

    const [bathroomValue, setBathroomValue] = useState([0, 0]);
    const [banosMinimo, setBanosMinimo] = useQueryState('banosMin', { defaultValue: '' });
    const [banosMaximo, setBanosMaximo] = useQueryState('banosMax', { defaultValue: '' });

    const [bedroomValue, setBedroomValue] = useState([0, 0]);
    const [dormitoriosMinimo, setDormitoriosMinimo] = useQueryState('dormitoriosMin', { defaultValue: '' });
    const [dormitoriosMaximo, setDormitoriosMaximo] = useQueryState('dormitoriosMax', { defaultValue: '' });

    const [metersSquareValue, setMetersSquareValue] = useState([0, 0]);
    const [metrosCuadradosMinimo, setMetrosCuadradosMinimo] = useQueryState('metrosMin', { defaultValue: '' });
    const [metrosCuadradosMaximo, setMetrosCuadradosMaximo] = useQueryState('metrosMax', { defaultValue: '' });

    useEffect(() => {
        setPriceValue([propertyParams.prices.min, propertyParams.prices.max]);
        setBathroomValue([propertyParams.bathrooms.min, propertyParams.bathrooms.max]);
        setBedroomValue([propertyParams.bedrooms.min, propertyParams.bedrooms.max]);
        setMetersSquareValue([propertyParams.metersSquare.min, propertyParams.metersSquare.max]);
    }, []);

    return {
        sliders: {
            price: {
                values: priceValue,
            valueSet: setPriceValue,
            valueQueryMin: setPrecioMinimo,
            valueQueryMax: setPrecioMaximo,
            paramMin: propertyParams.prices.min,
            paramMax: propertyParams.prices.max,
                title: propertyParams.prices.title,
                },

            bathroom: {
            values: bathroomValue,
            valueSet: setBathroomValue,
            valueQueryMin: setBanosMinimo,
            valueQueryMax: setBanosMaximo,
            paramMin: propertyParams.bathrooms.min,
            paramMax: propertyParams.bathrooms.max,
            title: propertyParams.bathrooms.title,
        },

        bedroom: {
            values: bedroomValue,
            valueSet: setBedroomValue,
            valueQueryMin: setDormitoriosMinimo,
            valueQueryMax: setDormitoriosMaximo,
            paramMin: propertyParams.bedrooms.min,
            paramMax: propertyParams.bedrooms.max,
            title: propertyParams.bedrooms.title,
        },

        metersSquare: {
            values: metersSquareValue,
            valueSet: setMetersSquareValue,
            valueQueryMin: setMetrosCuadradosMinimo,
            valueQueryMax: setMetrosCuadradosMaximo,
            paramMin: propertyParams.metersSquare.min,
            paramMax: propertyParams.metersSquare.max,
            title: propertyParams.metersSquare.title,
            },
        }
    }
}