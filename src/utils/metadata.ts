import type { Metadata } from 'next';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { cache } from 'react';

export type PageParams = { slug: string };

export type Props = {
    params: Promise<PageParams>;
};

export const fetchProperty = cache(async (slug: string) => {
    return {
        slug,
        property: await fetchPropertyByID(slug)
    };
});

export async function getPropertyData(params: { slug: string }) {
    const propertyData = await fetchProperty(params.slug);
    return propertyData.property;
}

export function generatePropertyMetadata(property: any, slug: string): Metadata {
    if (!property) {
        return {
            title: 'LHS Concept',
            description: 'Propiedades de lujo en Madrid.'
        };
    }

    const propertyTitle = `${property.title} | LHS Concept`;
    const propertyDescription = `€${property.precio.toLocaleString('es-ES')} 📍${property.barrioRef.name}`;

    return {
        title: propertyTitle,
        description: propertyDescription,
        openGraph: {
            title: propertyTitle,
            description: propertyDescription,
            url: `https://www.lhsconcept.com/${slug}`,
            images: property.photos_cover_url ? [
                {
                    url: property.photos_cover_url[0].url,
                    width: property.photos_cover_url[0].width,
                    height: property.photos_cover_url[0].height,
                    alt: property.title,
                }
            ] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@lhsconcept',
            creator: '@lhsconcept',
            title: propertyTitle,
            description: propertyDescription,
            images: property.photos_cover_url ? [property.photos_cover_url[0].url] : [],
        },
        alternates: {
            canonical: `https://www.lhsconcept.com/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}
