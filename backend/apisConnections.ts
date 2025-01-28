import { Asset, createClient, Entry } from 'contentful';
import { Property, Barrio, Photo } from './types';
import { getPropertiesParams } from './parsing';
import { PropertyParams } from './parsing';

// Client: Contentful
const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});

export function ImageToUrl(entry: any): Photo {
    // console.log('can u see img:', entry.fields.file)
    //    url: '//images.ctfassets.net/0nbi0p8gb167/1oLN77LuXeBKgE0KBLOWvT/9fcfb8abe6d1bbd21956d3f0e5cf59d7/PHOTO-2024-07-31-12-16-41__2_.jpg',
    // details: { size: 274835, image: { width: 1204, height: 1600 } },


    function startsWithHttp(url: string): string{
        return url.startsWith('http') ? url : `https:${url}`;
    }

    const url = startsWithHttp(entry.fields.file.url);
    const width = entry.fields.file.details.image.width;
    const height = entry.fields.file.details.image.height;

    return {
        url,
        width,
        height,
    }
}

export function extractImageUrls(entries: any[]): Photo[] {
    return entries.map(entry => ImageToUrl(entry));
}

// Fetching //
let count = 0;
export async function fetchEntriesContentful(): Promise<{ properties: Property[], filteredBarrios: Barrio[], propertyParams: PropertyParams }> {
    count++;
    console.log('calling fetchEntriesContentful: ', count)

    const entries = await client.getEntries();

    const barrios: Barrio[] = [];
    const properties: Property[] = [];

    entries.items.map((entry: Entry<any>) => {
        if (entry.sys.contentType.sys.id === 'barrio') {
            barrios.push(parseBarrioFromContentful({ entry }))
        }
        if (entry.sys.contentType.sys.id === 'propiedad') {
            if (entry.fields.buyOrRent) //buy is true -- only parsing buy properties for now
                properties.push(parsePropertyFromContentful({ entry }))
        }

    });

    const propertyParams = getPropertiesParams(properties)

    const uniqueBarriosInProperties = [...new Set(properties.map(property => property.barrioRef.name))];
    const filteredBarrios = barrios.filter(barrio => uniqueBarriosInProperties.includes(barrio.name));

    return { properties, filteredBarrios, propertyParams }
}

export async function fetchPropertyByID(url: string): Promise<Property | null> {
    console.log('calling fetchbyID, url: ', url)

    try {
        const entries = await client.getEntries();

        const filteredEntry = entries.items.find((entry: Entry<any>) => {
            return entry.sys.contentType.sys.id === 'propiedad' && entry.fields.url === url;
        });

        if (!filteredEntry) {
            console.log(`No property found for URL: ${url}`);
            return null;
        }

        return parsePropertyFromContentful({ entry: filteredEntry });
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        return null;
    }
}


// Parsing //
function parsePropertyFromContentful({ entry }: { entry: any }): Property {
    function getRoomPhotoUrl(entries: any[]): Photo[] {
        const urls = entries.map(entry => {
            const photos = entry.fields.photos
            const it = photos ? extractImageUrls(photos) : []
            return it
        }
        )
        return urls.flat()
    }

    const updatedAt = entry.sys.updatedAt
    // console.log('ENTRY FIELDS: ', entry.fields.photos)
    const { barrioRef, amentetiesRef, characteristics, habitacionesPaginas, ibi, maintenanceCostMonthly, photos, plano, title, description, buyOrRent, reformado, precio, url, quote } = entry.fields;
    const coverUrl = photos ? extractImageUrls(photos)[0] : null;
    const planoUrl = plano ? ImageToUrl(plano) : null;

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
        plano_url: planoUrl ?? null,
        cover_url: coverUrl ? [coverUrl] : [],
        barrioRef: barrioRef?.fields ?? null,
        amentitiesRef: amentetiesRef?.fields ?? null,
        charRef: characteristics?.fields ?? null,
        roomsRef: entry.fields.habitacionesPaginas?.map((h: Entry<any>) => ({
            title: h.fields.title,
            description: h.fields.description,
            photos: (h.fields.photos as Asset<any>[])?.map(photo => ImageToUrl(photo)) ?? []
        })) ?? null,

        photos_url: [
            ...(photos ? extractImageUrls(photos) : []),
            ...(habitacionesPaginas ? getRoomPhotoUrl(habitacionesPaginas) : []),
        ],

        updatedAt: updatedAt,
    } as Property;
}


// function parseBarrioFromContentful({ entry }: { entry: Entry<Barrio> }): Barrio {
function parseBarrioFromContentful({ entry }: { entry: any }): Barrio {
    const { name, rating, description, location, longDescription } = entry.fields;

    return {
        name: name,
        rating: rating,
        description: description,
        longDescription: longDescription,
        location: location
    } as Barrio;
}
