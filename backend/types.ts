export enum PhotoGridLayout {
    PORTRAIT,
    LANDSCAPE,
}

export interface Photo {
    url: string;
    width: number;
    height: number;
    grid: PhotoGridLayout;
}

// PRIMARY //
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

// SECONDARY //
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

// NOT USED //
export interface BannerListings {
    title: string;
    photo: string;
    url: string;
}
