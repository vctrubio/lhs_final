import type { Metadata } from 'next';
import { fetchPropertyByID } from '#/backend/CRM/fetch';
import { cache } from 'react';

export type Props = {
    params: Promise<{ url: string }>;
};

export const fetchProperty = cache(async (url: string) => {
    return {
        url,
        property: await fetchPropertyByID(url)
    };
});

export async function getPropertyData({ url }: { url: string }) {
    const propertyData = await fetchProperty(url);
    return propertyData.property;
}

export function generatePropertyMetadata(property: any, slug: string, pdf: boolean = false): Metadata {
    if (!property) {
        return {
            title: 'LHS Concept',
            description: 'Encontramos propiedades exclusivas en Madrid.',
            icons: {
                icon: '/icon.png'
            },
            openGraph: {
                title: 'LHS Concept',
                description: 'Con más de 20 años de experiencia en el mercado inmobiliario de lujo, nuestra reputación está garantizada por la satisfacción de nuestros clientes.\nNos especializamos en ayudar a nuestros clientes a comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid. Con una experiencia inigualable en el mercado y una pasión por ofrecer un servicio excepcional, estamos dedicados a hacer que su experiencia inmobiliaria sea fluida y gratificante.',
                url: `https://www.lhsconcept.com/`,
                images: [
                    {
                        url: '/LHS_logo.jpeg',
                        width: 800,
                        height: 600,
                        alt: 'LHS Concept Madrid',
                    }
                ],
                type: 'website',
            },
        };
    }

    const propertyTitle = pdf ? `${property.title} | Ficha | LHS Concept` : `${property.title} | LHS Concept`;
    const propertyDescription = `€${property.precio.toLocaleString('es-ES')} 📍${property.barrioRef.name}`;

    return {
        title: propertyTitle,
        description: propertyDescription,
        icons: {
            icon: '/icon.png'
        },
        openGraph: {
            title: propertyTitle,
            description: propertyDescription,
            url: `https://www.lhsconcept.com/${slug}${pdf ? '/pdf' : ''}`,
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
            canonical: `https://www.lhsconcept.com/${slug}${pdf ? '/pdf' : ''}`,
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
