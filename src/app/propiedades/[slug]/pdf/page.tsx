'use client'
import { fetchPropertyByID, fetchEntriesContentful } from '#/backend/apisConnections';
import PropertyPage from '@/components/PropertyPage';
import PropertyRecommendations from '@/components/PropertyRecommendations';
import { cache } from 'react';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';


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
    return fetchProperty(params.slug);
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const { property } = await getPropertyData(resolvedParams);

    return <PropertyBroucher property={property} setIsShareModalOpen={false} />;
}