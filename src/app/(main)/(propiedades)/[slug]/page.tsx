import type { Metadata } from 'next';
import PropertyPage from '@/components/PropertyPage';
import NotFound from '@/app/(main)/not-found';
import { getPropertyData, generatePropertyMetadata, Props } from '@/utils/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug);
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    return (
        <PropertyPage property={property} />
    )
}
