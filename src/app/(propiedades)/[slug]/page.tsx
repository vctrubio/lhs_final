import type { Metadata } from 'next';
import { fetchPropertyByID } from '#/backend/apisConnections';
import PropertyPage from '@/components/PropertyPage';
import {LHSBond} from '@/components/lhsbond';
import { cache } from 'react';

type PageParams = {
    slug: string;
}

type Props = {
    params: Promise<PageParams>; // Changed from PageParams to Promise<PageParams>
}

const fetchProperty = cache(async (slug: string) => {
    return {
        slug,
        property: await fetchPropertyByID(slug)
    };
});

async function getPropertyData(params: PageParams) {
    return fetchProperty(params.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params; // Await the params
    const { property, slug } = await getPropertyData(resolvedParams);

    if (!property) {
        return {
            title: 'Property Not Found | LHS Concept',
            description: 'The requested property could not be found'
        };
    }

    const propertyTitle = `${property.title} | LHS Concept`;
    const propertyDescription = `€${property.precio.toLocaleString('es-ES')} 📍${property.barrioRef.name}`

    return {
        title: propertyTitle,
        description: propertyDescription,
        openGraph: {
            title: propertyTitle,
            description: propertyDescription,
            url: `https://www.lhsconcept.com/propiedades/${slug}`,
            images: property.photos_url ? [
                {
                    url: property.photos_url[0].url,
                    width: property.photos_url[0].width,
                    height: property.photos_url[0].height,
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
            images: property.photos_url ? [property.photos_url[0].url] : [],
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

export default async function Page({ params }: Props) {
    const resolvedParams = await params; 
    const { property } = await getPropertyData(resolvedParams);

    if (!property) {
        return <></>
    }

    return (
        <>
            <PropertyPage property={property} />
        </>
    )
}
