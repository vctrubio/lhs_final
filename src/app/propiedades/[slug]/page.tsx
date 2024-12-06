import type { Metadata } from 'next';
import { fetchPropertyByID } from '#/backend/apisConnections';
import PropertyPage from '@/components/PropertyPage';
import { cache } from 'react';

type Props = {
    params: Promise<{ slug: string }> | { slug: string }
}

// Create a single cached fetch function
const fetchProperty = cache(async (slug: string) => {
    return {
        slug,
        property: await fetchPropertyByID(slug)
    };
});

// Helper function to resolve params
async function getPropertyData(params: Props['params']) {
    const resolvedParams = await Promise.resolve(params);
    return fetchProperty(resolvedParams.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { property, slug } = await getPropertyData(params);

    return {
        title: property ? `${property.title} | LHS` : 'LHS Concept',
        description: property?.description &&
            `€ ${property.precio.toLocaleString('es-ES')}, 📍 ${property.barrioRef.name}`,
        openGraph: {
            title: property?.title && `${property.title} | LHS`,
            description: property?.description &&
                `€ ${property.precio.toLocaleString('es-ES')}, 📍 ${property.barrioRef.name}`,
            url: `https://www.lhsconcept.com/propiedades/${slug}`,
            images: property?.photos_url ? [
                {
                    url: property.photos_url[0],
                    width: 1200,
                    height: 630,
                    alt: property.title,
                }
            ] : []
        }
    };
}

export default async function Page({ params }: Props) {
    const { property } = await getPropertyData(params);

    if (!property) {
        return <div>Property not found -- return Page redirect</div>;
    }

    return <PropertyPage property={property} />;
}