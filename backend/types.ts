import React from "react";
import { JSX } from "react";
export interface Photo {
    url: string;
    width: number;
    height: number;
}
export interface Property {
    title: string;
    url: string;
    quote: string;
    description: string;
    buyOrRent: boolean;
    reformado: boolean;

    precio: number;
    precioIbi: number;
    precioComunidad: number;

    photos_url: Photo[];
    photos_cover_url: Photo[]; //max is 3, is it [3] then?
    photos_main_url: Photo[] | null; //for rendering on pdfPageView
    plano_url: Photo;

    barrioRef: Barrio;
    amentitiesRef: Amentities;
    charRef: PropiedadCharacteristics;
    roomsRef: PropiedadHabitacion[];
    updatedAt: string;
}

export interface Barrio {
    name: string;
    rating: number;
    description: string;
    location: string;
    longDescription: string;
}

export interface Amentities {
    AC: boolean;
    Heating: boolean;
    Rooftop: boolean;
    Furnished: boolean;
    Portero: boolean;
    Trastero: boolean;
    Elevator: boolean;
    Parking: boolean;
}

export interface PropiedadCharacteristics {
    tipoDePropiedad: string;
    dormitoriosSuite: number;
    dormitorios: number;
    banos: number;
    aseo: number;
    patio: number; //aka terraza
    balcones: number;
    metrosCuadradros: number;
}

export interface PropiedadHabitacion {
    title: string;
    propiedadDe: string;
    description: string;
    photos: Photo[];
}

export interface PropertyParamsProps {
    title: string,
    min: number,
    max: number,
    icon: JSX.Element
}

export interface PropertyParams {
    prices: PropertyParamsProps,
    bathrooms: PropertyParamsProps,
    bedrooms: PropertyParamsProps,
    metersSquare: PropertyParamsProps
}
