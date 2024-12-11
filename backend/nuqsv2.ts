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


    useEffect(() => {
        //price
        if (priceValue[0] > propertyParams.prices.min) {
            setPrecioMinimo(priceValue[0].toString());
        } else if (priceValue[0] === propertyParams.prices.min && precioMinimo) {
            setPrecioMinimo(null);
        }
        else if (priceValue[1] < propertyParams.prices.max) {
            setPrecioMaximo(priceValue[1].toString());
        } else if (priceValue[1] === propertyParams.prices.max && precioMaximo) {
            setPrecioMaximo(null);
        }

        //bathroom
        if (bathroomValue[0] > propertyParams.bathrooms.min) {
            setBanosMinimo(bathroomValue[0].toString());
        } else if (bathroomValue[0] === propertyParams.bathrooms.min && banosMinimo) {
            setBanosMinimo(null);
        }
        else if (bathroomValue[1] < propertyParams.bathrooms.max) {
            setBanosMaximo(bathroomValue[1].toString());
        } else if (bathroomValue[1] === propertyParams.bathrooms.max && banosMaximo) {
            setBanosMaximo(null);
        }

        //bedroom
        if (bedroomValue[0] > propertyParams.bedrooms.min) {
            setDormitoriosMinimo(bedroomValue[0].toString());
        } else if (bedroomValue[0] === propertyParams.bedrooms.min && dormitoriosMinimo) {
            setDormitoriosMinimo(null);
        }
        else if (bedroomValue[1] < propertyParams.bedrooms.max) {
            setDormitoriosMaximo(bedroomValue[1].toString());
        } else if (bedroomValue[1] === propertyParams.bedrooms.max && dormitoriosMaximo) {
            setDormitoriosMaximo(null);
        }

        //metersSquare
        if (metersSquareValue[0] > propertyParams.metersSquare.min) {
            setMetrosCuadradosMinimo(metersSquareValue[0].toString());
        } else if (metersSquareValue[0] === propertyParams.metersSquare.min && metrosCuadradosMinimo) {
            setMetrosCuadradosMinimo(null);
        }
        else if (metersSquareValue[1] < propertyParams.metersSquare.max) {
            setMetrosCuadradosMaximo(metersSquareValue[1].toString());
        } else if (metersSquareValue[1] === propertyParams.metersSquare.max && metrosCuadradosMaximo) {
            setMetrosCuadradosMaximo(null);
        }

    }, [priceValue, bathroomValue, metersSquareValue]);

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