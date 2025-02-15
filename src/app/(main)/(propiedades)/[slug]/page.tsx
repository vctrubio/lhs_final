import React from 'react';
import type { Metadata } from 'next';
import PropertyPage from '@/components/PropertyPage';
import NotFound from '@/app/(main)/not-found';
import { getPropertyData, generatePropertyMetadata, Props } from '@/utils/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params; // Ensure params is awaited if it's a promise
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug); // Use resolvedParams.slug directly
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params; // Ensure params is awaited if it's a promise
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    return (
        <PropertyPage property={property} />
    );
}

