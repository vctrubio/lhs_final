import React from 'react';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';
import { getPropertyData, generatePropertyMetadata, Props } from '@/utils/metadata';
import { Metadata } from 'next';
import NotFound from '@/app/(main)/not-found';

// 1) Make sure generateMetadata expects a normal params object
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug, true);
}

// 2) Same for the page component: No Promise, no `await params`.
export default async function PdfView({ params }: Props) {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}

