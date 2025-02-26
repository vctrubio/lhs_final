import { Barrio, Photo, Property } from '../types';
import { Asset, Entry } from "contentful";

export function ImageToUrl(entry: any): Photo {

    function startsWithHttp(url: string): string {
        return url.startsWith("http") ? url : `https:${url}`;
    }

    const url = startsWithHttp(entry.fields.file.url);
    const width = entry.fields.file.details.image.width;
    const height = entry.fields.file.details.image.height;

    return {
        url,
        width,
        height,
    };
}

export function extractImageUrls(entries: any[]): Photo[] {
    if (!entries) return [];
    return entries.map((entry) => ImageToUrl(entry));
}
export function parsePropertyFromContentful({ entry }: { entry: any }): Property {
    function getRoomPhotoUrl(entries: any[]): Photo[] {
        const urls = entries.map((entry) => {
            const photos = entry.fields.photos;
            const it = photos ? extractImageUrls(photos) : [];
            return it;
        });
        return urls.flat();
    }

    const updatedAt = entry.sys.updatedAt;
    const {
        barrioRef,
        amentetiesRef,
        characteristics,
        habitacionesPaginas,
        ibi,
        maintenanceCostMonthly,
        photos,
        photosCover,
        plano,
        title,
        description,
        buyOrRent,
        reformado,
        precio,
        url,
        quote,
    } = entry.fields;

    const planoUrl = plano ? ImageToUrl(plano) : null;
    const photos_cover_url = photosCover && extractImageUrls(photosCover);
    const photos_main_url = photos ? extractImageUrls(photos) : null;

    return {
        title: title,
        url: url,
        description: description,
        buyOrRent: buyOrRent,
        reformado: reformado,
        quote: quote,
        precio: precio,
        precioIbi: ibi ?? 0,
        precioComunidad: maintenanceCostMonthly ?? 0,

        cover_url: photos_cover_url[0],
        photos_cover_url: photos_cover_url,
        photos_main_url: photos_main_url,
        plano_url: planoUrl ?? null,

        barrioRef: barrioRef?.fields ?? null,
        amentitiesRef: amentetiesRef?.fields ?? null,
        charRef: characteristics?.fields ?? null,
        roomsRef:
            entry.fields.habitacionesPaginas?.map((h: Entry<any>) => ({
                title: h.fields.title,
                description: h.fields.description,
                photos:
                    (h.fields.photos as Asset<any>[])?.map((photo) =>
                        ImageToUrl(photo),
                    ) ?? [],
            })) ?? null,

        photos_url: [
            ...photos_cover_url,
            ...(photos_main_url ? photos_main_url : []),
            ...(habitacionesPaginas ? getRoomPhotoUrl(habitacionesPaginas) : []),
        ],

        updatedAt: updatedAt,
    } as Property;
}

export function parseBarrioFromContentful({ entry }: { entry: any }): Barrio {
    const { name, rating, description, location, longDescription } = entry.fields;

    return {
        name: name,
        rating: rating,
        description: description,
        longDescription: longDescription,
        location: location,
    } as Barrio;
}
