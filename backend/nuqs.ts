'use client'

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs'
import { PropertyParams } from './nuqs_functions';

export function NuqsManager() {
    const [queryTitle] = useQueryState('title');
    const [queryPriceMin] = useQueryState('precioMin');
    const [queryPriceMax] = useQueryState('precioMax');
    const [queryBathroomMin] = useQueryState('banosMin');
    const [queryBathroomMax] = useQueryState('banosMax');
    const [queryBedroomMin] = useQueryState('dormitoriosMin');
    const [queryBedroomMax] = useQueryState('dormitoriosMax');
    const [queryMetersSquareMin] = useQueryState('metrosMin');
    const [queryMetersSquareMax] = useQueryState('metrosMax');
    const [queryBarrios] = useQueryState('barrios');
    const [querySort] = useQueryState('sort');

    const [stateChanged, setStateChanged] = useState(false);

    useEffect(() => {
        setStateChanged(prev => !prev);
    }, [queryTitle, queryPriceMin, queryPriceMax, queryBathroomMin,
        queryBathroomMax, queryBedroomMin, queryBedroomMax,
        queryMetersSquareMin, queryMetersSquareMax, queryBarrios, querySort]);

    return {
        hasParams: [queryTitle, queryPriceMin, queryPriceMax, queryBathroomMin,
            queryBathroomMax, queryBedroomMin, queryBedroomMax,
            queryMetersSquareMin, queryMetersSquareMax, queryBarrios, querySort]
            .some(param => param !== null && param !== ''),
        stateChanged,
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
            },
            barrios: queryBarrios,
            sort: querySort
        }
    }
}

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

    const [queryTitle, setQueryTitle] = useQueryState('title', { defaultValue: '' });
    const [barrios, setBarrios] = useQueryState('barrios');

    const [sortOption, setSortOption] = useQueryState('sort', { defaultValue: '' });
    const sortProperties = (properties, sortOption: string) => {
        switch (sortOption) {
            case 'priceAsc':
                return properties.sort((a, b) => a.precio - b.precio);
            case 'priceDesc':
                return properties.sort((a, b) => b.precio - a.precio);
            case 'bedroomAsc': // Updated to match FilterPair keys
                return properties.sort((a, b) => a.charRef.dormitorios - b.charRef.dormitorios);
            case 'bedroomDesc': // Updated to match FilterPair keys
                return properties.sort((a, b) => b.charRef.dormitorios - a.charRef.dormitorios);
            case 'bathroomAsc': // Updated to match FilterPair keys
                return properties.sort((a, b) => a.charRef.banos - b.charRef.banos);
            case 'bathroomDesc': // Updated to match FilterPair keys
                return properties.sort((a, b) => b.charRef.banos - a.charRef.banos);
            case 'metersSquareAsc':
                return properties.sort((a, b) => a.charRef.metrosCuadradros - b.charRef.metrosCuadradros);
            case 'metersSquareDesc':
                return properties.sort((a, b) => b.charRef.metrosCuadradros - a.charRef.metrosCuadradros);
            default:
                return properties; // Default sorting logic
        }
    };

    useEffect(() => {
        setPriceValue([propertyParams.prices.min, propertyParams.prices.max]);
        setBathroomValue([propertyParams.bathrooms.min, propertyParams.bathrooms.max]);
        setBedroomValue([propertyParams.bedrooms.min, propertyParams.bedrooms.max]);
        setMetersSquareValue([propertyParams.metersSquare.min, propertyParams.metersSquare.max]);
    }, [propertyParams]); // Add propertyParams as a dependency



    useEffect(() => {
        //price
        if (priceValue[0] > propertyParams.prices.min) {
            setPrecioMinimo(priceValue[0].toString());
        }
        if (priceValue[0] === propertyParams.prices.min && precioMinimo) {
            setPrecioMinimo(null);
        }
        if (priceValue[1] < propertyParams.prices.max) {
            setPrecioMaximo(priceValue[1].toString());
        }
        if (priceValue[1] === propertyParams.prices.max && precioMaximo) {
            setPrecioMaximo(null);
        }

        //bathroom
        if (bathroomValue[0] > propertyParams.bathrooms.min) {
            setBanosMinimo(bathroomValue[0].toString());
        }
        if (bathroomValue[0] === propertyParams.bathrooms.min && banosMinimo) {
            setBanosMinimo(null);
        }

        if (bathroomValue[1] < propertyParams.bathrooms.max) {
            setBanosMaximo(bathroomValue[1].toString());
        }
        if (bathroomValue[1] === propertyParams.bathrooms.max && banosMaximo) {
            setBanosMaximo(null);
        }

        //bedroom
        if (bedroomValue[0] > propertyParams.bedrooms.min) {
            setDormitoriosMinimo(bedroomValue[0].toString());
        }
        if (bedroomValue[0] === propertyParams.bedrooms.min && dormitoriosMinimo) {
            setDormitoriosMinimo(null);
        }

        if (bedroomValue[1] < propertyParams.bedrooms.max) {
            setDormitoriosMaximo(bedroomValue[1].toString());
        }
        if (bedroomValue[1] === propertyParams.bedrooms.max && dormitoriosMaximo) {
            setDormitoriosMaximo(null);
        }

        //metersSquare
        if (metersSquareValue[0] > propertyParams.metersSquare.min) {
            setMetrosCuadradosMinimo(metersSquareValue[0].toString());
        }
        if (metersSquareValue[0] === propertyParams.metersSquare.min && metrosCuadradosMinimo) {
            setMetrosCuadradosMinimo(null);
        }

        if (metersSquareValue[1] < propertyParams.metersSquare.max) {
            setMetrosCuadradosMaximo(metersSquareValue[1].toString());
        }
        if (metersSquareValue[1] === propertyParams.metersSquare.max && metrosCuadradosMaximo) {
            setMetrosCuadradosMaximo(null);
        }

    }, [priceValue, bathroomValue, bedroomValue, metersSquareValue, propertyParams]); // Add propertyParams as a dependency

    const handleReset = () => {
        setPrecioMinimo(null);
        setPrecioMaximo(null);
        setBanosMinimo(null);
        setBanosMaximo(null);
        setDormitoriosMinimo(null);
        setDormitoriosMaximo(null);
        setMetrosCuadradosMinimo(null);
        setMetrosCuadradosMaximo(null);
        setBarrios(null);
        setQueryTitle('');
        setSortOption(null);
        setPriceValue([propertyParams.prices.min, propertyParams.prices.max]);
        setBathroomValue([propertyParams.bathrooms.min, propertyParams.bathrooms.max]);
        setBedroomValue([propertyParams.bedrooms.min, propertyParams.bedrooms.max]);
        setMetersSquareValue([propertyParams.metersSquare.min, propertyParams.metersSquare.max]);
    }

    const hasQueryParams = [
        precioMinimo, precioMaximo,
        banosMinimo, banosMaximo,
        dormitoriosMinimo, dormitoriosMaximo,
        metrosCuadradosMinimo, metrosCuadradosMaximo,
        barrios,
        queryTitle && queryTitle !== '' // Check if sortOption is not empty
        // sortOption && sortOption !== '' // Check if sortOption is not empty
    ].some(param => param !== null && param !== '');

    return {
        handleReset,
        hasQueryParams,
        query: {
            value: queryTitle,
            setValue: setQueryTitle
        },

        sliders: {
            price: {
                values: priceValue,
                valueSet: setPriceValue,
                valueQueryMin: setPrecioMinimo,
                valueQueryMax: setPrecioMaximo,
                params: propertyParams.prices
            },
            bedroom: {
                values: bedroomValue,
                valueSet: setBedroomValue,
                valueQueryMin: setDormitoriosMinimo,
                valueQueryMax: setDormitoriosMaximo,
                params: propertyParams.bedrooms
            },
            bathroom: {
                values: bathroomValue,
                valueSet: setBathroomValue,
                valueQueryMin: setBanosMinimo,
                valueQueryMax: setBanosMaximo,
                params: propertyParams.bathrooms
            },
            metersSquare: {
                values: metersSquareValue,
                valueSet: setMetersSquareValue,
                valueQueryMin: setMetrosCuadradosMinimo,
                valueQueryMax: setMetrosCuadradosMaximo,
                params: propertyParams.metersSquare
            }
        },
        barrios: {
            value: barrios,
            setValue: setBarrios
        },
        sort: {
            value: sortOption,
            setValue: setSortOption
        }
    }
}