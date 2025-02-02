import { fetchPropertyByID } from '#/backend/apisConnections';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';
import { cache } from 'react';
import { Metadata } from 'next';

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

    const propertyTitle = `${property.title} | Ficha | LHS Concept`;
    const propertyDescription = `€${property.precio.toLocaleString('es-ES')} 📍${property.barrioRef.name}`
    
    return {
        title: propertyTitle,
        description: propertyDescription,
        openGraph: {
            title: propertyTitle,
            description: propertyDescription,
            url: `https://www.lhsconcept.com/${resolvedParams.slug}/pdf`,
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
            canonical: `https://www.lhsconcept.com/${resolvedParams.slug}/pdf`,
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

type PageParams = { slug: string }
export default async function PdfView({ params }: { params: Promise<PageParams>; }) {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <div>--page not found exec--</div>;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}
