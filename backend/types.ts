export interface Photo {
    url: string;
    width: number;
    height: number;
}

// PRIMARY //
export interface Property {
    title: string;
    url: string;
    description: string;
    buyOrRent: boolean;
    reformado: boolean;

    quote: string;

    precio: number;
    precioIbi: number;
    precioComunidad: number;

    plano_url: Photo;
    cover_url: Photo[];
    photos_url: Photo[];

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
