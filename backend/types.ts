// PRIMARY //
export interface Property {
    title: string;
    url: string;
    description: string;
    buyOrRent: boolean;
    reformado: boolean;
    precio: number;
    precioIbi: number;
    precioComunidad: number;
    plano_url: string;
    cover_url: string[];
    photos_url: string[];

    barrioRef: Barrio;
    amentitiesRef: Amentities;
    charRef: PropiedadCharacteristics;
    roomsRef: PropiedadHabitacion[];
    updatedAt: string;
    canva_id: string | null;
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
    dormitorios: number;
    banos: number;
    aseo: number;
    patio: number;
    balcones: number;
    metrosCuadrados: number; //changed from metrosCuadradros :ojo
}

export interface PropiedadHabitacion {
    title: string;
    propiedadDe: string;
    description: string;
    photos: string[];
}

// NOT USED //
export interface BannerListings {
    title: string;
    photo: string;
    url: string;
}