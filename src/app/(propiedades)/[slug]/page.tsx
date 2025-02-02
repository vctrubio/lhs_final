import type { Metadata } from 'next';
import { fetchPropertyByID } from '#/backend/apisConnections';
import PropertyPage from '@/components/PropertyPage';
import { cache } from 'react';
import NotFound from '@/app/not-found';

type PageParams = {
    slug: string;
}

type Props = {
    params: Promise<PageParams>;
}

const fetchProperty = cache(async (slug: string) => {
    return {
        slug,
        property: await fetchPropertyByID(slug)
    };
});

async function getPropertyData(params: PageParams) {
    const propertyData = await fetchProperty(params.slug);
    return propertyData.property;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return {
            title: 'LHS Concept',
            description: 'Propiedades de lujo en Madrid.'
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
            url: `https://www.lhsconcept.com/${resolvedParams.slug}`,
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
            images: property.photos_url ? [property.photos_cover_url[0].url] : [],
        },
        alternates: {
            canonical: `https://www.lhsconcept.com/${resolvedParams.slug}`,
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
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    return (
        <>
            <PropertyPage property={property} />
        </>
    )
}
